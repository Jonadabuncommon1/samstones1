import { db, getFirebaseMessaging } from './firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getToken, onMessage } from 'firebase/messaging';
import type { User } from 'firebase/auth';
import emailjs from '@emailjs/browser';

export interface VisitorLog {
  id?: string;
  name: string;
  email: string;
  signedInAt: Timestamp | null;
  device: string;
  browser: string;
}

// Detect device type
function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return '📱 Tablet';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return '📱 Mobile';
  return '💻 Desktop';
}

// Detect browser
function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  return 'Browser';
}

// Send email notification helper via EmailJS
async function sendEmailNotification(
  name: string,
  email: string,
  device: string,
  browser: string
): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.log('EmailJS credentials not configured. Skipping email notification.');
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        visitor_name: name,
        visitor_email: email,
        visitor_device: device,
        visitor_browser: browser,
        visitor_time: new Date().toLocaleString(),
        to_email: 'support@samstonesresources.com',
      },
      publicKey
    );
    console.log('Email notification sent successfully via EmailJS.');
  } catch (err) {
    console.error('Failed to send email notification:', err);
  }
}

// Log a visitor sign-in to Firestore
export async function logVisitorSignIn(user: User): Promise<void> {
  const name = user.displayName || user.email?.split('@')[0] || 'Unknown User';
  const email = user.email || 'No email';
  const device = getDeviceType();
  const browser = getBrowser();

  try {
    await addDoc(collection(db, 'visitor_logs'), {
      name,
      email,
      signedInAt: serverTimestamp(),
      device,
      browser,
    });
    
    // Trigger the email alert asynchronously
    sendEmailNotification(name, email, device, browser);
  } catch (err) {
    console.error('Failed to log visitor:', err);
  }
}

// Real-time listener for admin dashboard
export function subscribeToVisitors(
  callback: (visitors: VisitorLog[]) => void
): () => void {
  const q = query(
    collection(db, 'visitor_logs'),
    orderBy('signedInAt', 'desc'),
    limit(20)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const visitors: VisitorLog[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<VisitorLog, 'id'>),
    }));
    callback(visitors);
  });

  return unsubscribe;
}

// Request browser notification permission and get FCM token
export async function requestNotificationPermission(): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied.');
      return null;
    }

    const messaging = await getFirebaseMessaging();
    if (!messaging) return null;

    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      console.warn('VAPID key not set. Push notifications disabled.');
      return null;
    }

    const token = await getToken(messaging, { vapidKey });
    return token;
  } catch (err) {
    console.error('Failed to get FCM token:', err);
    return null;
  }
}

// Listen for foreground push messages and show a toast-style alert
export async function listenForForegroundNotifications(
  onNotification: (title: string, body: string) => void
): Promise<void> {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    const title = payload.notification?.title || 'New Visitor';
    const body = payload.notification?.body || 'Someone just signed in.';
    onNotification(title, body);
  });
}
