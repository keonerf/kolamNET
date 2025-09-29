import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/mockSupabase';
import { Eye, EyeOff, Palette, Sparkles, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/workspace');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError('Please check your email for verification');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-crayon-orange-800/30 to-crayon-yellow-800/30 flex items-center justify-center p-4">
      {/* Back to Landing Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-pastel-orange hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
      
      <div className="max-w-md w-full">

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-crayon-red-500 to-crayon-orange-500 rounded-full mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">KolamNET</h1>
          <p className="text-pastel-yellow">Geometric Art Analysis & Regeneration</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-3xl hover:shadow-4xl transition-all duration-700 hover:scale-105 hover:border-white/30 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-crayon-orange-200 text-lg">
              {isLogin 
                ? 'Sign in to continue your kolam journey' 
                : 'Join us to explore sacred geometry'
              }
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-pastel-yellow mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-crayon-orange-400/50 focus:border-crayon-orange-400/50 focus:bg-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/30 shadow-inner"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-pastel-yellow mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-crayon-orange-400/50 focus:border-crayon-orange-400/50 focus:bg-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/30 shadow-inner pr-14"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastel-orange hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-crayon-red-500/20 border border-crayon-red-500/30 rounded-lg p-3">
                <p className="text-pastel-red text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white py-5 px-8 rounded-2xl font-bold hover:from-crayon-orange-700 hover:to-crayon-red-700 focus:outline-none focus:ring-2 focus:ring-crayon-orange-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 hover:rotate-1 border border-white/20 hover:border-white/40 group overflow-hidden relative"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-pastel-yellow">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-pastel-orange hover:text-white transition-colors underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-pastel-orange text-sm mb-4">What you'll get access to:</p>
          <div className="flex justify-center gap-6 text-pastel-yellow">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-crayon-orange-400/80 to-crayon-yellow-400/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xl hover:scale-110 transition-transform duration-500">
                <Eye className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              <span className="text-sm font-medium">Analyze</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-crayon-yellow-400/80 to-crayon-orange-400/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xl hover:scale-110 transition-transform duration-500">
                <Palette className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              <span className="text-sm font-medium">Create</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-crayon-orange-400/80 to-crayon-yellow-400/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xl hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              <span className="text-sm font-medium">Enhance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
