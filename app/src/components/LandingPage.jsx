import { useState } from 'react';
import { LightWavesBackground } from './ui/light-waves';
import logo from '../assets/logo.png';

export default function LandingPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    console.log('Password reset email sent to:', resetEmail);
    setResetSent(true);
    setTimeout(() => {
      setShowResetModal(false);
      setResetSent(false);
      setResetEmail('');
    }, 3000);
  };

  return (
    <LightWavesBackground>
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
        {/* Logo and Header - Outside the box */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-40 h-40 md:w-48 md:h-48 mb-3 flex items-center justify-center">
            <img src={logo} alt="NovaByte Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">NovaByte Solutions</h1>
          <p className="text-slate-200 text-center drop-shadow-md text-lg">Empowering enterprises with technology.</p>
        </div>

        {/* Form Box - With border */}
        <div className="bg-slate-900/30 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-md border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Staff Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.name@novabyte.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="w-full text-sm text-slate-300 hover:text-blue-400 transition-colors"
            >
              Forgot Password?
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-600/30 text-center">
            <p className="text-xs text-slate-400 font-medium">Authorised Personnel Only</p>
            <p className="text-xs text-slate-500 mt-1">© 2026 NovaByte Solutions</p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/10 relative">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-slate-300 mb-6">Enter your email address and we'll send you a reset link.</p>

            {!resetSent ? (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.name@novabyte.com"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 bg-slate-700/50 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Reset Link Sent!</h3>
                <p className="text-slate-300">
                  Check your inbox at <span className="font-semibold text-blue-400">{resetEmail}</span>
                </p>
                <p className="text-slate-400 text-sm mt-2">This window will close automatically...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </LightWavesBackground>
  );
}