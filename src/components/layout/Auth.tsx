import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface AuthProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function Auth({ onClose, showCloseButton = true }: AuthProps) {
  const router = useRouter();

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const validateEmailDomain = (email: string) => {
    // Only the authorized administrator account is permitted to authenticate.
    return email === 'learncildev@gmail.com';
  };

  const getUserRole = (email: string) => {
    if (email === 'learncildev@gmail.com') return 'admin';
    return null;
  };

  const getDashboardRoute = (email: string, id: string) => {
    if (email === 'learncildev@gmail.com') return `/admin/dashboard/${id}`;
    return null;
  };

  const handleAuthAction = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (forgotPassword) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setMessage('Password reset email sent! Please check your inbox.');
        setForgotPassword(false);
      } catch (err: any) {
        console.error('Password reset error:', err);
        setError(err.message || 'Failed to send password reset email.');
      }
    } else {
      // Validate email domain before signin
      if (!validateEmailDomain(email)) {
        setError('It seems you don\'t have access to a valid email. Reach out to the admin to get enrolled.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        const user = data.user;
        if (!user) throw new Error('No user data returned.');

        // Check if user profile exists in Supabase database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw profileError;
        }

        if (!profile) {
          // Create user profile for first-time login
          const userRole = getUserRole(email);
          if (!userRole) {
            setError('Unable to determine your role. Please contact support.');
            setLoading(false);
            return;
          }

          const { error: insertError } = await supabase.from('profiles').insert([
            {
              id: user.id,
              email: user.email,
              role: userRole,
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString(),
            },
          ]);

          if (insertError) throw insertError;
          setMessage('Profile created successfully! Redirecting to your dashboard...');
        } else {
          // Update last login
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ last_login: new Date().toISOString() })
            .eq('id', user.id);

          if (updateError) throw updateError;
          setMessage('Logged in successfully! Redirecting...');
        }

        // Get dashboard route with user ID
        const dashboardRoute = getDashboardRoute(email, user.id);
        if (dashboardRoute) {
          setTimeout(() => {
            router.push(dashboardRoute);
            if (onClose) onClose();
          }, 1500);
        } else {
          setError('Unable to determine your dashboard. Please contact support.');
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Signin error:', err);
        setError(err.message || 'An error occurred during sign in.');
      }
    }
    setLoading(false);
  };

  const getTitle = () => {
    return forgotPassword ? 'Reset Password' : 'Sign In';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white z-[60] flex items-center justify-center">
          <div className="text-center text-gray-900">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              <div className="absolute inset-2 w-16 h-16 bg-blue-50 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-fade-in text-gray-900">Signing you in...</h2>
            <p className="text-gray-600 animate-fade-in" style={{animationDelay: '0.2s'}}>Please wait while we authenticate your account</p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative transform transition-all duration-300 ease-in-out ${loading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {showCloseButton && onClose && (
          <button onClick={onClose} className="absolute top-2 right-4 text-2xl font-bold">&times;</button>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">{getTitle()}</h2>

        <form onSubmit={handleAuthAction}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="your.email@learncil.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!forgotPassword && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-blue-300"
              type="submit"
              disabled={loading}
            >
              {forgotPassword
                ? 'Send Reset Email'
                : 'Sign In'}
            </button>
          </div>
        </form>

        {message && <p className="text-green-500 text-center mt-4" aria-live="polite">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4" aria-live="assertive">{error}</p>}

        <div className="text-center mt-4">
          {!forgotPassword && (
            <button
              onClick={() => {
                setForgotPassword(true);
                setMessage('');
                setError('');
              }}
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          )}
          {forgotPassword && (
            <button
              onClick={() => {
                setForgotPassword(false);
                setMessage('');
                setError('');
              }}
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}