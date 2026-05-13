import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [displayName, setDisplayName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@novabyte.com');
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?img=33');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [twoFactorSuccess, setTwoFactorSuccess] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState('');
  
  // 2FA Secret and QR Code
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setPasswordResetSuccess(true);
      setTimeout(() => {
        setPasswordResetSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 3000);
    }
  };

  const generateSecret = () => {
    // Generate a random base32 secret (16 characters)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 16; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)];
    }
    return secret;
  };

  const generateTOTP = (secret) => {
    // Simple TOTP generation (30-second window)
    const epoch = Math.floor(Date.now() / 1000);
    const counter = Math.floor(epoch / 30);
    
    // This is a simplified version - in production use a proper TOTP library
    const hash = counter.toString() + secret;
    let code = 0;
    for (let i = 0; i < hash.length; i++) {
      code = (code * 31 + hash.charCodeAt(i)) % 1000000;
    }
    return code.toString().padStart(6, '0');
  };

  const handleEnable2FA = () => {
    const newSecret = generateSecret();
    setSecret(newSecret);
    
    // Generate QR Code URL (otpauth format)
    const issuer = 'NovaByte Solutions';
    const accountName = email;
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${newSecret}&issuer=${encodeURIComponent(issuer)}`;
    
    setQrCodeUrl(otpauthUrl);
    setShowQRCode(true);
    setTwoFactorError('');
  };

  const handleVerify2FA = (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setTwoFactorError('Please enter a 6-digit code');
      return;
    }

    // Generate the current valid TOTP code
    const validCode = generateTOTP(secret);
    
    // Check if entered code matches
    if (verificationCode === validCode) {
      setTwoFactorEnabled(true);
      setShowQRCode(false);
      setTwoFactorSuccess(true);
      setTwoFactorError('');
      setVerificationCode('');
      setTimeout(() => setTwoFactorSuccess(false), 3000);
    } else {
      setTwoFactorError('Invalid code. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>{`
        .grain-light {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="grain-light absolute inset-0 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-slate-900 mb-3">Settings</h1>
          <p className="text-xl text-slate-600">Manage your account and security preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Profile Settings
            </h2>

            <div className="space-y-6">
              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Picture</label>
                <div className="flex items-center gap-6">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold cursor-pointer hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
                    >
                      Upload New Photo
                    </label>
                    <p className="text-sm text-slate-500 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg">
                Save Profile Changes
              </button>
            </div>
          </motion.div>

          {/* Quick Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-xl text-white">
              <h3 className="text-lg font-bold mb-2">Account Status</h3>
              <p className="text-blue-100 text-sm mb-4">Active Member</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100">Member Since</span>
                  <span className="font-bold">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100">Last Login</span>
                  <span className="font-bold">Today</span>
                </div>
              </div>
            </div>

            {twoFactorSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4"
              >
                <p className="text-green-800 font-semibold text-sm">✓ 2FA enabled successfully!</p>
              </motion.div>
            )}

            {passwordResetSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4"
              >
                <p className="text-green-800 font-semibold text-sm">✓ Password updated successfully!</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Security Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Password Reset */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Reset Password
            </h2>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
              >
                Update Password
              </button>
            </form>
          </motion.div>

          {/* Two-Factor Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              Two-Factor Authentication
            </h2>

            {!twoFactorEnabled ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
                  <p className="text-amber-800 text-sm font-medium">
                    🔒 Add an extra layer of security to your account
                  </p>
                </div>

                {!showQRCode ? (
                  <button
                    onClick={handleEnable2FA}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Enable 2FA
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-6 text-center">
                      <p className="text-sm text-slate-600 mb-4 font-semibold">Scan this QR code with your authenticator app</p>
                      <p className="text-xs text-slate-500 mb-4">
                        Use Google Authenticator, Microsoft Authenticator, or Authy
                      </p>
                      
                      {/* Real QR Code */}
                      <div className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-md">
                        <QRCodeSVG 
                          value={qrCodeUrl} 
                          size={192}
                          level="M"
                          includeMargin={true}
                        />
                      </div>
                      
                      <div className="bg-white border-2 border-slate-200 rounded-xl p-3 mb-2">
                        <p className="text-xs text-slate-500 mb-1">Or enter code manually:</p>
                        <p className="text-sm font-mono font-bold text-slate-900 break-all">{secret}</p>
                      </div>
                    </div>

                    <form onSubmit={handleVerify2FA}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code</label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setTwoFactorError('');
                        }}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 text-center text-2xl tracking-widest font-mono mb-4"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                      
                      {twoFactorError && (
                        <p className="text-red-500 text-sm mb-4 text-center">{twoFactorError}</p>
                      )}
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
                      >
                        Verify & Enable
                      </button>
                    </form>
                    
                    <p className="text-xs text-slate-500 text-center mt-4">
                      💡 Tip: The code refreshes every 30 seconds
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">2FA is Enabled</h3>
                  <p className="text-sm text-green-700">Your account is protected with two-factor authentication</p>
                </div>

                <button
                  onClick={() => {
                    setTwoFactorEnabled(false);
                    setSecret('');
                    setQrCodeUrl('');
                  }}
                  className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Disable 2FA
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}