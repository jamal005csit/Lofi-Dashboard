```markdown
# 🎧 stillroom

<div align="center">

![stillroom](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A minimalist focus room with ambient music and a Pomodoro timer**

[Features](#✨-features) • [Demo](#🎬-demo) • [Installation](#🚀-installation) • [Usage](#🎯-usage) • [Keyboard Shortcuts](#⌨️-keyboard-shortcuts)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x450/0a0a0b/e7e7ea?text=stillroom+Focus+Room" alt="stillroom dashboard" width="800"/>
  <br/>
  <em>The ambient focus room with integrated music player and timer</em>
</div>

---

## ✨ Features

### 🎵 **Ambient Music Player**
- **4 curated stations** for different moods:
  - 🌙 Chilled Lofi - Beats to relax/study to
  - 🌧️ Ambient Rain - Rainy night in the city
  - 🌊 Synthwave - Neon drives after dark
  - ☕ Coffee Shop - Soft jazz for deep work
- **Live radio** with continuous playback
- **Volume control** with per-station memory
- **Visual audio feedback** with animated sound waves
- **YouTube API integration** for high-quality streams

### ⏱️ **Smart Pomodoro Timer**
- **Focus/Break modes** with smooth transitions
- **Visual progress ring** showing remaining time
- **Session tracking** - count completed focus sessions
- **Total focus time** calculation
- **Auto-pause** music during breaks
- **Customizable session lengths** (25/50/90 minutes)

### 🎨 **Beautiful UI**
- **Dark, ambient theme** optimized for focus
- **Animated particle backgrounds** with floating orbs
- **Responsive design** - works on desktop and mobile
- **Minimalist sidebar** with quick station access
- **Keyboard shortcuts** for power users
- **Smooth animations** and transitions

### 💾 **Data Persistence**
- All preferences saved locally
- Remember your:
  - Active station
  - Volume level (per station)
  - Timer state
  - Session count
  - Focus length preference
- Resume where you left off after refresh

### ⌨️ **Keyboard Shortcuts**
| Key | Action |
|-----|--------|
| `Space` | Play/Pause music |
| `←` `→` | Switch stations |
| `T` | Start/Pause timer |
| `R` | Reset timer |
| `M` | Mute/Unmute |

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Quick Start

```bash
# Clone the repository
git clone https://github.com/jamal005csit/stillroom.git

# Navigate to project
cd stillroom

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` 🎉

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Usage Guide

### Getting Started
1. **Choose a station** - Click any station card to load ambient sounds
2. **Adjust volume** - Use the slider in the player card
3. **Start the timer** - Click "Start timer" to begin your focus session
4. **Enjoy the flow** - Let the ambient music and timer keep you focused

### Timer Flow
1. **Focus Session** (default: 25 minutes)
   - Music plays continuously
   - Progress ring fills up
   - Session count increments on completion

2. **Break Session** (5 minutes)
   - Music auto-pauses
   - Timer counts down for break
   - Auto-transitions back to focus

3. **Repeat** for optimal productivity!

### Customization
- **Change focus length**: Settings → Focus session length
- **Reset stats**: Settings → Reset stats
- **Switch modes**: Click Focus/Break buttons
- **Change stations**: Click station cards or use arrow keys

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### APIs & Integrations
- **YouTube IFrame API** - Audio streaming
- **LocalStorage** - Data persistence

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 📁 Project Structure

```
stillroom/
├── src/
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # Vite types
├── public/
│   └── vite.svg         # App icon
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── README.md            # You are here
```

---

## 🎨 Customization

### Adding New Stations

Edit the `stations` array in `App.tsx`:

```typescript
const stations: Station[] = [
  {
    id: 'YOUR_YOUTUBE_VIDEO_ID',
    name: 'Station Name',
    description: 'Description',
    icon: YourIcon,      // From lucide-react
    color: '#hexcolor',
    duration: 'HH:MM:SS'
  },
  // Add more stations
];
```

### Changing Colors

Modify the CSS variables in `index.css`:

```css
:root {
  --primary: #e7e7ea;
  --background: #0a0a0b;
  --card-bg: #0f0f11;
  --border: #1f1f23;
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test thoroughly before submitting
- Update documentation as needed

---

## 🐛 Known Issues & Solutions

### YouTube Player Not Loading
- **Issue**: Player doesn't appear or load
- **Fix**: Clear browser cache and reload
- **Alternative**: Disable ad-blockers temporarily

### Timer Not Persisting
- **Issue**: Timer resets on refresh
- **Fix**: Allow localStorage in browser settings
- **Alternative**: Use the "Reset" button to start fresh

### Audio Cutting Out
- **Issue**: Music stops intermittently
- **Fix**: Refresh the page
- **Alternative**: Switch to a different station and back

---

## 📝 To-Do / Roadmap

- [ ] Add more ambient stations
- [ ] Custom station upload
- [ ] Sound effects for timer completion
- [ ] Daily/weekly statistics dashboard
- [ ] To-do list integration
- [ ] Ambient visualizer
- [ ] Export session data
- [ ] PWA support
- [ ] Dark/light theme toggle
- [ ] Mobile app version

---

## 🙏 Credits

### Libraries & Tools
- **[React](https://reactjs.org/)** - UI framework
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Lucide Icons](https://lucide.dev/)** - Icons
- **[YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)** - Video streaming

### Inspiration
- **Pomodoro Technique** - Timer methodology
- **Lo-fi Hip Hop** - Music genre inspiration
- **Minimalist Design** - UI philosophy

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Support

If you find this useful:
- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest features
- 🔀 Contribute code

---

<div align="center">

**Made with ☕ and 🎧 for better focus**

[Report Bug](https://github.com/yourusername/stillroom/issues) • [Request Feature](https://github.com/yourusername/stillroom/issues)

</div>
```

---

## 🎨 **Optional: Add a Logo/Badge Section**

If you want to add some cool badges at the top, include this HTML in your README:

```html
<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Made%20with-Vite-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Made%20with-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</div>
```

---

## 📸 **Add Real Screenshots**

Replace the placeholder image URL with actual screenshots. You can:

1. **Take a screenshot** of your app running
2. **Upload to imgur** or another image host
3. **Replace** the `https://via.placeholder.com/...` URL

Example:
```markdown
![stillroom dashboard](./screenshots/dashboard.png)
```

---
