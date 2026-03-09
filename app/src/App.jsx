import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Directory from './components/Directory';
import Settings from './components/Settings';
import ProfileDetails from './components/ProfileDetails';
import ArticleDetails from './components/ArticleDetails';
import RunClubDetails from './components/RunClubDetails';
import BookClubDetails from './components/BookClubDetails';
import logo from './assets/logo.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  if (currentPage === 'login') {
    return <LandingPage onLogin={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'profile' && selectedEmployeeId) {
    return <ProfileDetails employeeId={selectedEmployeeId} onBack={() => setCurrentPage('directory')} />;
  }

  if (currentPage === 'article' && selectedArticleId) {
    return <ArticleDetails articleId={selectedArticleId} onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'runclub') {
    return <RunClubDetails onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'bookclub') {
    return <BookClubDetails onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={logo}
                  alt="NovaByte Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg text-slate-900">NovaByte Solutions</div>
                <div className="text-xs text-slate-500">Employee Portal</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  currentPage === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('directory')}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  currentPage === 'directory'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  currentPage === 'settings'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className="ml-4 px-6 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {currentPage === 'dashboard' && (
          <Dashboard 
            key="dashboard" 
            onViewArticle={(id) => { setSelectedArticleId(id); setCurrentPage('article'); }}
            onViewRunClub={() => setCurrentPage('runclub')}
            onViewBookClub={() => setCurrentPage('bookclub')}
          />
        )}
        {currentPage === 'directory' && (
          <Directory 
            key="directory" 
            onViewProfile={(id) => { setSelectedEmployeeId(id); setCurrentPage('profile'); }} 
          />
        )}
        {currentPage === 'settings' && <Settings key="settings" />}
      </AnimatePresence>
    </div>
  );
}