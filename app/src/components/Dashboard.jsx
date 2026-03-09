import { useState } from "react";
import { motion } from "framer-motion";
import { companyNews } from '../utils/employeeData';

export default function Dashboard({ onViewArticle, onViewRunClub, onViewBookClub }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');
        
        .grain-light {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
        }
      `}</style>

      <div className="grain-light absolute inset-0 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-slate-900 mb-3">Welcome back</h1>
          <p className="text-xl text-slate-600 mb-6">Here's what's happening at NovaByte today</p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search news, updates, or community events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-md"
            />
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company News - Main Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Company Highlights</h2>
              
              <div className="space-y-6">
                {companyNews.map((news, index) => (
                  <motion.article
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover-lift overflow-hidden relative cursor-pointer"
                    onClick={() => onViewArticle(news.id)}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                          {news.category}
                        </span>
                        <span className="text-sm text-slate-500">{news.source}</span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-slate-500">{news.date}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {news.excerpt}
                      </p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewArticle(news.id);
                        }}
                        className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        Read full article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Community */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Community</h2>

              {/* Book Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 shadow-xl mb-6 overflow-hidden relative group hover-lift cursor-pointer"
                onClick={onViewBookClub}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Book Club</h3>
                      <p className="text-purple-100 text-sm">42 active members</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20">
                    <p className="text-purple-100 text-sm mb-2">Currently Reading</p>
                    <p className="text-white text-xl font-bold">The Phoenix Project</p>
                  </div>

                  <div className="flex items-center justify-between text-white text-sm mb-6">
                    <span>Next Discussion</span>
                    <span className="font-semibold">Friday, 3:00 PM</span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewBookClub();
                    }}
                    className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors"
                  >
                    Join Discussion
                  </button>
                </div>
              </motion.div>

              {/* Running Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 shadow-xl overflow-hidden relative group hover-lift cursor-pointer"
                onClick={onViewRunClub}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">🏃</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Running Club</h3>
                      <p className="text-green-100 text-sm">28 active runners</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20">
                    <p className="text-green-100 text-sm mb-2">Active Program</p>
                    <p className="text-white text-xl font-bold">5K Training</p>
                  </div>

                  <div className="flex items-center justify-between text-white text-sm mb-6">
                    <span>Next Run</span>
                    <span className="font-semibold">Thursday, 6:00 AM</span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewRunClub();
                    }}
                    className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors"
                  >
                    Join Next Run
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}