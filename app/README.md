# NovaByte Internal Employee Portal

A modern employee intranet for NovaByte Solutions - centralising staff communications, company news, and community engagement.


## 🎯 The Problem

Employee contact information and company communications were scattered across multiple systems, making it difficult to connect with colleagues and stay informed.


## 💡 The Solution

A single, centralised platform where employees can:

- **Connect** with colleagues through a searchable directory
- **Stay Informed** with company news and updates
- **Engage** with community activities
- **Manage** profiles and security settings


## 🛠️ Why Vite + React?

- **Vite** - Lightning-fast builds and instant Hot Module Replacement
- **React** - Component-based architecture for maintainability
- **Significantly lighter** than Create React App
- **Faster development** experience


## 📂 How It's Built
```
src/
├── components/
│   ├── Dashboard.jsx        # News & community hub
│   ├── Directory.jsx        # Employee search
│   ├── Settings.jsx         # Account & 2FA
│   └── ...
├── utils/
│   └── employeeData.js      # Data & news
└── App.jsx                  # Routing
```


## ✨ Features

🔐 Secure login with 2FA support

👥 300+ employee profiles with filtering

📰 UK company news feed

🏃 Community clubs with calendar sync

⚙️ Profile & security management


## 🚀 Quick Start
```bash
# Install dependencies
npm install

# Run on port 80 (requires admin privileges)
sudo npm run dev
```

Runs at `http://localhost` (port 80)


### Alternative: Run without sudo

If you prefer not to use sudo, change port in `vite.config.js`:
```javascript
server: {
  port: 3000  // or any port above 1024
}
```

Then run: `npm run dev`


## 🔮 Future Improvements

- [ ] **Real-time messaging** - Direct chat between employees
- [ ] **Notifications** - Email/push alerts for company news
- [ ] **Calendar integration** - Full calendar view of all events
- [ ] **Mobile app** - Native iOS/Android versions
- [ ] **Dark mode** - Theme toggle for accessibility
- [ ] **Analytics dashboard** - Employee engagement metrics
- [ ] **File sharing** - Internal document repository
- [ ] **Team pages** - Dedicated spaces for each department
- [ ] **Search enhancement** - AI-powered smart search
- [ ] **SSO integration** - Single sign-on with Microsoft/Google


## 🇬🇧 About NovaByte

UK-based technology company with offices in London.


---

**Built for NovaByte Solutions**