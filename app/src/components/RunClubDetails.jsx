import { motion } from "framer-motion";

export default function RunClubDetails({ onBack }) {
  
  const handleAddToCalendar = () => {
    // Create calendar event details for next Thursday
    const event = {
      title: 'Company Run Club - Morning Run',
      description: 'Join colleagues for a morning run! All abilities welcome. We split into pace groups so everyone can run comfortably. Meet outside the office at Victoria Nova Park.',
      location: 'Victoria Nova Park, Outside the Office',
      startDate: '2026-03-12T06:00:00', // Next Thursday, March 12, 2026, 6:00 AM
      endDate: '2026-03-12T07:00:00',   // 1 hour duration
      recurring: 'FREQ=WEEKLY;BYDAY=MO,TH', // Recurring: Mondays and Thursdays
    };

    // Generate .ics file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NovaByte Solutions//Run Club//EN
BEGIN:VEVENT
UID:${Date.now()}@novabyte.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startDate.replace(/[-:]/g, '')}
DTEND:${event.endDate.replace(/[-:]/g, '')}
RRULE:${event.recurring}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
DESCRIPTION:Run Club in 30 minutes!
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Create and download .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'run-club-schedule.ics';
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">🏃</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Company Run Club</h1>
                  <p className="text-slate-600 mt-1">Building community through running</p>
                </div>
              </div>

              {/* Introduction */}
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Our Run Club brings colleagues together outside the office to start the day with energy, fresh air, and a sense of community. Whether you're an experienced runner training for your next race or simply looking for a relaxed jog before work, the club is open to everyone.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                Running together is a great way to build connections across teams while supporting a healthy and active lifestyle. The sessions are designed to be informal, social, and inclusive, allowing participants to run at their own pace while enjoying the benefits of getting outdoors before the working day begins.
              </p>

              {/* What to Expect */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What to Expect</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Each session begins with a short meet-up outside the office before heading out on a relaxed group run through the local area. Runners typically split into small pace groups so everyone can run comfortably. The aim is participation, not competition.
              </p>

              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Friendly and welcoming atmosphere</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Multiple pace groups</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">Routes suitable for different abilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <span className="text-slate-700">A great way to meet colleagues across the business</span>
                </li>
              </ul>

              {/* Who Can Join */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Who Can Join</h2>
              <p className="text-slate-700 leading-relaxed mb-10">
                The Run Club is open to all employees, regardless of running experience. If you're new to running, you're encouraged to join and take things at your own pace. Many members started as beginners and found the group to be a great way to stay motivated.
              </p>

              {/* Why Join */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Join?</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Running with colleagues is about more than fitness. It's an opportunity to:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Boost physical and mental wellbeing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Start the day with energy and focus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Connect with colleagues in an informal setting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">•</span>
                  <span className="text-slate-700">Build consistency and motivation in your training</span>
                </li>
              </ul>

              <p className="text-lg text-slate-700 leading-relaxed">
                Whether you're looking to improve your fitness, train for an event, or simply enjoy a social run, the club offers a supportive environment to get moving.
              </p>
            </div>
          </motion.div>

          {/* Sidebar - Schedule Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 shadow-xl text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Run Club Schedule</h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📅</span>
                    <span className="font-semibold text-green-100">Days</span>
                  </div>
                  <p className="text-xl font-bold pl-9">Mondays & Thursdays</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⏰</span>
                    <span className="font-semibold text-green-100">Time</span>
                  </div>
                  <p className="text-xl font-bold pl-9">6:00 AM</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📍</span>
                    <span className="font-semibold text-green-100">Location</span>
                  </div>
                  <p className="text-xl font-bold pl-9">Outside the Office</p>
                  <p className="text-sm text-green-100 pl-9 mt-1">Victoria Nova Park</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-green-100 mb-4">
                  All abilities welcome. Just bring your running shoes and join us.
                </p>
                <button 
                  onClick={handleAddToCalendar}
                  className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
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