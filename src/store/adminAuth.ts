const SESSION_KEY = 'samstones_admin_session';

const DEFAULT_EMAIL = 'admin@samstones.com';
const DEFAULT_PASSWORD = 'Samstones@Admin2026';

export function getAdminCredentials() {
  return {
    email: import.meta.env.VITE_ADMIN_EMAIL || DEFAULT_EMAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD,
  };
}

export function verifyAdminLogin(email: string, password: string): boolean {
  const creds = getAdminCredentials();
  return (
    email.trim().toLowerCase() === creds.email.trim().toLowerCase() &&
    password === creds.password
  );
}

export function isAdminSessionActive(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
}

export function setAdminSession(active: boolean): void {
  if (active) sessionStorage.setItem(SESSION_KEY, 'authenticated');
  else sessionStorage.removeItem(SESSION_KEY);
}
