import { motion } from "framer-motion";

export default function BookClubDetails({ onBack }) {
  
  const handleAddToCalendar = () => {
    // Create calendar event details
    const event = {
      title: 'Book Club Discussion - The Phoenix Project',
      description: 'Monthly book club discussion. Currently reading: The Phoenix Project by Gene Kim, Kevin Behr, and George Spafford. New members welcome!',
      location: 'Conference Room 3B / Virtual (Hybrid)',
      startDate: '2026-03-14T15:00:00', // March 14, 2026, 3:00 PM
      endDate: '2026-03-14T16:00:00',   // 1 hour duration
    };

    // Generate .ics file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NovaByte Solutions//Book Club//EN
BEGIN:VEVENT
UID:${Date.now()}@novabyte.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startDate.replace(/[-:]/g, '')}
DTEND:${event.endDate.replace(/[-:]/g, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Create and download .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'book-club-discussion.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Book Club</h1>
                  <p className="text-slate-600 mt-1">Exploring ideas through reading</p>
                </div>
              </div>

              {/* Introduction */}
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Our Book Club is a space for curious minds to come together, share perspectives, and explore new ideas through literature. Each month, we select a book that challenges our thinking and sparks meaningful conversations.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                Whether you're passionate about business strategy, science fiction, leadership, or personal development, our diverse reading list has something for everyone. The discussions are informal, thought-provoking, and always welcoming to new participants.
              </p>

              {/* Current Book */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Currently Reading</h2>
              <div className="bg-purple-50 rounded-2xl p-6 mb-10">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">The Phoenix Project</h3>
                <p className="text-purple-700 mb-4">by Gene Kim, Kevin Behr, and George Spafford</p>
                <p className="text-slate-700 leading-relaxed">
                  A novel about IT, DevOps, and helping your business win. Follow Bill as he works to save Parts Unlimited from a failing IT initiative. This business novel explores the world of IT work and demonstrates how to improve business outcomes through better collaboration and systems thinking.
                </p>
              </div>

              {/* What to Expect */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What to Expect</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Our discussions are relaxed and inclusive. There's no pressure to have "the right answer" – we're here to learn from each other's perspectives and interpretations.
              </p>

              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Thoughtful, open discussions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Diverse book selections across genres</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Monthly meetings with flexible attendance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Connect with colleagues who love reading</span>
                </li>
              </ul>

              {/* How It Works */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                At the end of each month, we gather to discuss the current book and vote on the next selection. Members can suggest titles, and we rotate between different genres to keep things fresh and interesting.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Read at your own pace throughout the month</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Join our discussion sessions (virtual or in-person)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Share insights and recommendations with the group</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Participate as much or as little as you like</span>
                </li>
              </ul>

              <p className="text-lg text-slate-700 leading-relaxed">
                Whether you're an avid reader or just getting back into books, the club offers a welcoming community to explore ideas and build connections across the organization.
              </p>
            </div>
          </motion.div>

          {/* Sidebar - Info Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 shadow-xl text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Discussion Schedule</h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📅</span>
                    <span className="font-semibold text-purple-100">Next Meeting</span>
                  </div>
                  <p className="text-xl font-bold pl-9">Friday, March 14th</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⏰</span>
                    <span className="font-semibold text-purple-100">Time</span>
                  </div>
                  <p className="text-xl font-bold pl-9">3:00 PM</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📍</span>
                    <span className="font-semibold text-purple-100">Format</span>
                  </div>
                  <p className="text-xl font-bold pl-9">Hybrid</p>
                  <p className="text-sm text-purple-100 pl-9 mt-1">Conference Room 3B or Virtual</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="font-semibold text-purple-100">Members</span>
                  </div>
                  <p className="text-xl font-bold pl-9">42 Active</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-purple-100 mb-4">
                  New members always welcome. No need to have finished the book to join the discussion!
                </p>
                <button 
                  onClick={handleAddToCalendar}
                  className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}