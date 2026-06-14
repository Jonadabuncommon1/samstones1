import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, googleProvider } from '../../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  updatePassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import toast from 'react-hot-toast';
import { logVisitorSignIn, requestNotificationPermission } from '../../lib/visitorTracking';

export const AuthView = () => {
  const { setCurrentView, goBack } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setIsSignUp(true);
        setIsResetPassword(false);
        setIsUpdatePassword(false);
      } else if (hash === '#reset') {
        setIsResetPassword(true);
        setIsSignUp(false);
        setIsUpdatePassword(false);
      } else if (hash === '#update-password') {
        setIsUpdatePassword(true);
        setIsSignUp(false);
        setIsResetPassword(false);
      } else {
        setIsSignUp(false);
        setIsResetPassword(false);
        setIsUpdatePassword(false);
      }
      setError(null);
      setMessage(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isUpdatePassword) {
        if (!password) throw new Error('Please enter a new password.');
        if (!auth.currentUser) throw new Error('You must be logged in to update your password.');
        await updatePassword(auth.currentUser, password);
        setMessage('Password updated successfully!');
        setIsUpdatePassword(false);
        window.location.hash = 'signin';
      } else if (isResetPassword) {
        if (!email) throw new Error('Please enter your email address.');
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset link sent to your email.');
      } else if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        toast.success('Successfully signed up!');
        await logVisitorSignIn(userCredential.user);
        requestNotificationPermission(); // ask for push permission on first sign-up
        setCurrentView('home');
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await logVisitorSignIn(result.user);
        toast.success('Successfully signed in!');
        setCurrentView('home');
      }
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please click "Sign In" below instead!';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Google sign-in was cancelled. Please try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSignUp && !termsAccepted) {
      setError("Please agree to the Terms of Service and Privacy Policy before continuing.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await logVisitorSignIn(result.user);
      toast.success('Successfully signed in with Google!');
      setCurrentView('home');
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred during Google Sign-In.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Google sign-in was cancelled by the user.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const GoogleBtn = () => (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#222] py-3.5 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center disabled:opacity-70 shadow-sm"
    >
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Continue with Google
    </button>
  );

  const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, showToggle }: any) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-[#109121] focus:border-transparent dark:text-white transition-all outline-none"
        placeholder={placeholder}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 pt-24 transition-colors duration-500 relative overflow-hidden">
      
      {/* Back Button */}
      <button 
        onClick={() => { goBack(); window.scrollTo(0, 0); }} 
        className="absolute top-24 left-6 md:left-12 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors z-50"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* DESKTOP SPLIT-SCREEN LAYOUT */}
      <div className="hidden md:block relative w-full max-w-5xl h-[650px] bg-white dark:bg-[#111] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 overflow-hidden mx-auto">
        
        {/* Sign In Form Container */}
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#111]"
          animate={{ x: isSignUp ? "100%" : "0%", opacity: isSignUp ? 0 : 1, zIndex: isSignUp ? 1 : 2 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#109121] dark:text-[#16C72E] mb-2">
              {isResetPassword ? 'Reset Password' : isUpdatePassword ? 'Update Password' : 'Sign In'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isResetPassword ? 'Enter your email to receive a reset link' : 'Enter your credentials to access your account'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
            {message && <div className="text-green-500 text-sm text-center mb-2">{message}</div>}

            {(!isUpdatePassword) && (
              <InputField icon={Mail} type="email" name="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="Email address" />
            )}
            
            {(!isResetPassword) && (
              <div>
                <InputField icon={Lock} type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder={isUpdatePassword ? "New Password" : "Password"} showToggle />
                {!isUpdatePassword && (
                  <div className="mt-2 text-right">
                    <button type="button" onClick={() => window.location.hash = 'reset'} className="text-xs text-[#DFB722] hover:underline font-semibold">Forgot Password?</button>
                  </div>
                )}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white py-3.5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-[#109121]/20">
              {loading ? 'Processing...' : isResetPassword ? 'Send Link' : isUpdatePassword ? 'Update' : 'Sign In'}
            </button>
            
            {!isResetPassword && !isUpdatePassword && (
              <>
                <div className="relative flex items-center py-2">
                   <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                   <span className="mx-4 text-gray-400 text-xs font-medium uppercase">OR</span>
                   <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <GoogleBtn />
              </>
            )}
          </form>
          {isResetPassword && (
            <button onClick={() => window.location.hash = 'signin'} className="mt-6 text-sm text-gray-500 hover:text-[#109121] transition-colors text-center w-full">Back to Sign In</button>
          )}
        </motion.div>

        {/* Sign Up Form Container */}
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#111]"
          animate={{ x: isSignUp ? "100%" : "0%", opacity: isSignUp ? 1 : 0, zIndex: isSignUp ? 2 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#109121] dark:text-[#16C72E] mb-2">Create Account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Join Samstones to discover premium assets</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
            
            <InputField icon={User} type="text" name="name" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Full Name" />
            <InputField icon={Mail} type="email" name="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="Email address" />
            <InputField icon={Lock} type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="Password" showToggle />

            <div className="flex items-start mt-2 mb-4 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center h-5">
                <input 
                  id="terms-desktop" 
                  type="checkbox" 
                  required 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-[#109121] dark:bg-gray-800 dark:border-gray-600 accent-[#109121] cursor-pointer" 
                />
              </div>
              <label htmlFor="terms-desktop" className="ml-3 text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer select-none">
                I have read and agree to the <button type="button" onClick={() => setCurrentView('terms')} className="text-[#109121] font-bold hover:underline dark:text-[#16C72E]">Terms of Service</button> and <button type="button" onClick={() => setCurrentView('privacy')} className="text-[#109121] font-bold hover:underline dark:text-[#16C72E]">Privacy Policy</button>.
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white py-3.5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-[#109121]/20">
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
            
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="mx-4 text-gray-400 text-xs font-medium uppercase">OR</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <GoogleBtn />
          </form>
        </motion.div>

        {/* Overlay Container */}
        <motion.div 
          className="absolute top-0 left-1/2 w-1/2 h-full z-30 bg-gradient-to-br from-[#109121] to-[#0a5f15] flex items-center justify-center text-white p-12 text-center overflow-hidden"
          animate={{ x: isSignUp ? "-100%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle logo background pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/samstones-logo.jpg')] bg-cover bg-center mix-blend-overlay scale-150"></div>
          
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div 
                key="signup-overlay"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] border-4 border-[#DFB722]">
                  <img src="/samstones-logo.jpg" alt="Samstones Logo" className="w-20 h-20 rounded-full object-contain" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-serif text-[#DFB722]">Welcome Back!</h2>
                <p className="mb-10 text-white/90 leading-relaxed font-medium px-4">
                  Already a member of the Samstones family? Log in to access your premium dashboard and exclusive collections.
                </p>
                <button 
                  onClick={() => window.location.hash = 'signin'}
                  className="px-10 py-3.5 rounded-full border-2 border-white hover:bg-white hover:text-[#109121] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                >
                  Sign In
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="signin-overlay"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] border-4 border-[#DFB722]">
                  <img src="/samstones-logo.jpg" alt="Samstones Logo" className="w-20 h-20 rounded-full object-contain" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-serif text-[#DFB722]">Hello, Friend!</h2>
                <p className="mb-10 text-white/90 leading-relaxed font-medium px-4">
                  Enter your personal details and start your journey with Samstones Marketplace. Discover the finest assets today.
                </p>
                <button 
                  onClick={() => window.location.hash = 'signup'}
                  className="px-10 py-3.5 rounded-full border-2 border-white hover:bg-white hover:text-[#109121] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                >
                  Sign Up
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MOBILE LAYOUT (Stacked) */}
      <div className="md:hidden w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-[#111] rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md border-2 border-[#109121]">
            <img src="/samstones-logo.jpg" alt="Samstones Logo" className="w-16 h-16 rounded-full object-contain" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-[#109121] dark:text-[#16C72E] mb-2">
              {isResetPassword ? 'Reset Password' : isUpdatePassword ? 'Update Password' : isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isSignUp ? 'Join Samstones to discover premium assets' : 'Access your account'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 w-full">
            {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
            {message && <div className="text-green-500 text-sm text-center mb-2">{message}</div>}

            {isSignUp && (
              <InputField icon={User} type="text" name="name" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Full Name" />
            )}
            
            {(!isUpdatePassword) && (
              <InputField icon={Mail} type="email" name="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="Email address" />
            )}
            
            {(!isResetPassword) && (
              <div>
                <InputField icon={Lock} type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder={isUpdatePassword ? "New Password" : "Password"} showToggle />
                {!isSignUp && !isUpdatePassword && (
                  <div className="mt-2 text-right">
                    <button type="button" onClick={() => window.location.hash = 'reset'} className="text-xs text-[#DFB722] hover:underline font-semibold">Forgot Password?</button>
                  </div>
                )}
              </div>
            )}

            {isSignUp && (
              <div className="flex items-start mt-2 mb-2 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center h-5">
                  <input 
                    id="terms-mobile" 
                    type="checkbox" 
                    required 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-[#109121] dark:bg-gray-800 dark:border-gray-600 accent-[#109121] cursor-pointer" 
                  />
                </div>
                <label htmlFor="terms-mobile" className="ml-3 text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed text-left cursor-pointer select-none">
                  I have read and agree to the <button type="button" onClick={() => { setCurrentView('terms'); window.scrollTo(0,0); }} className="text-[#109121] font-bold hover:underline dark:text-[#16C72E]">Terms</button> and <button type="button" onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="text-[#109121] font-bold hover:underline dark:text-[#16C72E]">Privacy Policy</button>.
                </label>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full mt-2 bg-[#109121] hover:bg-[#0a5f15] text-white py-3.5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-[#109121]/20">
              {loading ? 'Processing...' : isResetPassword ? 'Send Link' : isUpdatePassword ? 'Update' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            {!isResetPassword && !isUpdatePassword && (
              <>
                <div className="relative flex items-center py-2">
                   <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                   <span className="mx-4 text-gray-400 text-xs font-medium uppercase">OR</span>
                   <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <GoogleBtn />
              </>
            )}
          </form>

          <div className="mt-8 text-center">
            {isResetPassword ? (
              <button onClick={() => window.location.hash = 'signin'} className="text-sm text-gray-500 hover:text-[#109121] transition-colors">Back to Sign In</button>
            ) : (
              <button 
                onClick={() => window.location.hash = isSignUp ? 'signin' : 'signup'}
                className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
