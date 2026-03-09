// src/utils/employeeData.js

const generateEmployees = () => {
  const departments = {
    'Human Resources': {
      teams: ['Talent Acquisition', 'Employee Relations', 'Benefits & Compensation'],
      color: 'from-rose-500 to-pink-600'
    },
    'Finance': {
      teams: ['Financial Planning', 'Accounting', 'Audit & Compliance'],
      color: 'from-emerald-500 to-teal-600'
    },
    'Legal': {
      teams: ['Corporate Law', 'Compliance', 'Intellectual Property'],
      color: 'from-indigo-500 to-purple-600'
    },
    'Payroll': {
      teams: ['Processing', 'Tax Administration', 'Benefits Coordination'],
      color: 'from-amber-500 to-orange-600'
    },
    'Information Technology': {
      teams: ['Infrastructure', 'Security', 'Application Development'],
      color: 'from-cyan-500 to-blue-600'
    },
    'Learning & Development': {
      teams: ['Training Programs', 'Onboarding', 'Leadership Development'],
      color: 'from-violet-500 to-fuchsia-600'
    },
    'Operations': {
      teams: ['Supply Chain', 'Facilities', 'Process Optimization'],
      color: 'from-slate-500 to-gray-600'
    },
    'Business Strategy': {
      teams: ['Corporate Strategy', 'Business Analytics', 'PMO'],
      color: 'from-blue-500 to-indigo-600'
    },
    'Marketing': {
      teams: ['Digital Marketing', 'Brand Strategy', 'Communications'],
      color: 'from-pink-500 to-rose-600'
    },
    'Sales': {
      teams: ['Enterprise Sales', 'SMB Sales', 'Partnerships'],
      color: 'from-green-500 to-emerald-600'
    }
  };

  const firstNames = ['Alex', 'Jordan', 'Morgan', 'Casey', 'Taylor', 'Riley', 'Quinn', 'Avery', 'Cameron', 'Dakota', 
    'Sage', 'Rowan', 'Blake', 'Harper', 'Emerson', 'Parker', 'Reese', 'Drew', 'Finley', 'River',
    'Skylar', 'Phoenix', 'Charlie', 'Kai', 'Adrian', 'Sam', 'Jesse', 'Jayden', 'Peyton', 'Robin'];
  
  const lastNames = ['Chen', 'Patel', 'Rodriguez', 'Kim', 'O\'Brien', 'Williams', 'Martinez', 'Anderson', 
    'Thompson', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Johnson', 'Brown', 'Lee', 
    'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Lopez', 'Hill'];
  
  const levels = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Principal'];
  
  const posts = [
    'Excited to share our Q4 results - record growth! 🚀',
    'Great team collaboration today on the new initiative',
    'Just completed my certification in cloud architecture ☁️',
    'Thrilled to be presenting at next week\'s conference',
    'Our team just shipped a major feature update!',
    'Looking forward to the upcoming team offsite',
    'Proud of what we accomplished this sprint 💪',
    'Celebrating 5 years with NovaByte today! 🎉',
    'Excited to welcome our newest team members',
    'Working on something innovative - stay tuned!',
    ''
  ];

  const allEmployees = [];
  let employeeId = 1;

  Object.entries(departments).forEach(([dept, config]) => {
    config.teams.forEach(team => {
      for (let i = 0; i < 10; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const level = levels[Math.floor(Math.random() * levels.length)];
        const isOnline = Math.random() > 0.35;
        const post = posts[Math.floor(Math.random() * posts.length)];
        const imageNum = Math.floor(Math.random() * 70) + 1;
        
        allEmployees.push({
          id: employeeId++,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@novabyte.com`,
          department: dept,
          team,
          level,
          isOnline,
          lastPost: post,
          avatar: `https://i.pravatar.cc/150?img=${imageNum}`,
          color: config.color
        });
      }
    });
  });

  return allEmployees;
};

export const employees = generateEmployees();

export const companyNews = [
  {
    id: 1,
    title: 'NovaByte Named Top UK Workplace for Innovation',
    excerpt: 'Industry recognition for groundbreaking approach to employee development and workplace culture across UK tech sector.',
    date: 'March 5, 2026',
    source: 'TechCrunch Europe',
    category: 'Awards'
  },
  {
    id: 2,
    title: 'Q4 2025: 47% Revenue Growth Across UK and European Markets',
    excerpt: 'Record-breaking quarter as enterprise solutions gain momentum throughout the UK, with strong expansion into EMEA markets.',
    date: 'March 1, 2026',
    source: 'Financial Times',
    category: 'Financial'
  },
  {
    id: 3,
    title: 'AI Platform Wins UK Innovation Excellence Award',
    excerpt: 'NovaByte\'s flagship AI-powered transformation platform recognized by UK Tech Awards for breakthrough technology and business impact.',
    date: 'February 28, 2026',
    source: 'TechNation UK',
    category: 'Product'
  },
  {
    id: 4,
    title: 'Expansion: New Manchester Office Opening',
    excerpt: 'Strategic UK expansion continues with state-of-the-art facility in Manchester to support growing Northern operations.',
    date: 'February 20, 2026',
    source: 'Business Weekly',
    category: 'Expansion'
  }
];