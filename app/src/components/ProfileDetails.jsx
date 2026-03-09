import { motion } from "framer-motion";
import { employees } from '../utils/employeeData';

export default function ProfileDetails({ employeeId, onBack }) {
  const employee = employees.find(e => e.id === employeeId);

  if (!employee) {
    return <div className="p-12 text-center">Employee not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Directory
        </button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-32 h-32 rounded-3xl object-cover shadow-lg"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                employee.isOnline ? 'bg-green-500' : 'bg-slate-400'
              }`}></div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-xl text-slate-600 mb-4">{employee.level}</p>
              
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-4 py-2 bg-gradient-to-r ${employee.color} text-white text-sm font-bold rounded-full`}>
                  {employee.department}
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${employee.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  <span className="text-sm text-slate-600 font-medium">
                    {employee.isOnline ? 'Online now' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <a href={`mailto:${employee.email}`} className="text-lg text-blue-600 hover:underline font-medium">
                  {employee.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Team</p>
                <p className="text-lg text-slate-900 font-medium">{employee.team}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Latest Activity */}
        {employee.lastPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Activity</h2>
            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-slate-700 text-lg italic leading-relaxed">
                "{employee.lastPost}"
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}