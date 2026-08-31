import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Headphones,
  Library,
  ListMusic,
  Moon,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  SkipBack,
  SkipForward,
  Sparkles,
  TimerReset,
  Volume2,
  VolumeX,
  Waves,
  Wind,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: { onReady?: () => void; onStateChange?: (event: { data: number }) => void };
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
}

type Station = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
};

const stations: Station[] = [
  { id: 'jfKfPfyJRdk', name: 'Chilled Lofi', description: 'beats to relax / study to', icon: Headphones, color: '#9ca3af', duration: '24/7' },
  { id: 'qH3fETPsqXU', name: 'Ambient Rain', description: 'rainy night in the city', icon: Wind, color: '#94a3b8', duration: '10:02:14' },
  { id: '4xDzrJKXOOY', name: 'Synthwave', description: 'neon drives after dark', icon: Waves, color: '#a1a1aa', duration: '03:42:18' },
  { id: '5qap5aO4i9A', name: 'Coffee Shop', description: 'soft jazz for deep work', icon: Coffee, color: '#a8a29e', duration: '08:27:05' },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
};

function App() {
  const playerRef = useRef<YTPlayer | null>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const [activeStation, setActiveStation] = useState(() => localStorage.getItem('focus-station') || stations[0].id);
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('focus-volume') || 72));
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [focusLength, setFocusLength] = useState(() => Number(localStorage.getItem('focus-length') || 25));
  const [secondsLeft, setSecondsLeft] = useState(() => Number(localStorage.getItem('focus-seconds') || 25 * 60));
  const [timerRunning, setTimerRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notice, setNotice] = useState('');

  const selectedStation = stations.find((station) => station.id === activeStation) || stations[0];

  const loadPlayer = useCallback(() => {
    if (!window.YT || !playerHostRef.current || playerRef.current) return;
    playerRef.current = new window.YT.Player(playerHostRef.current, {
      videoId: activeStation,
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, loop: 1, modestbranding: 1, playsinline: 1, rel: 0 },
      events: {
        onReady: () => {
          playerRef.current?.setVolume(volume);
          setPlayerReady(true);
        },
        onStateChange: (event) => {
          if (window.YT && event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
          if (window.YT && [window.YT.PlayerState.PAUSED, window.YT.PlayerState.ENDED].includes(event.data)) setIsPlaying(false);
        },
      },
    });
  }, [activeStation, volume]);

  useEffect(() => {
    if (window.YT) {
      loadPlayer();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    window.onYouTubeIframeAPIReady = loadPlayer;
    document.body.appendChild(script);
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [loadPlayer]);

  useEffect(() => {
    localStorage.setItem('focus-station', activeStation);
    if (playerReady) playerRef.current?.loadVideoById(activeStation);
  }, [activeStation, playerReady]);

  useEffect(() => {
    localStorage.setItem('focus-volume', volume.toString());
    playerRef.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('focus-length', focusLength.toString());
  }, [focusLength]);

  useEffect(() => {
    if (!timerRunning) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setTimerRunning(false);
          setMode((currentMode) => {
            const nextMode = currentMode === 'focus' ? 'break' : 'focus';
            if (nextMode === 'break') playerRef.current?.pauseVideo();
            return nextMode;
          });
          setNotice(mode === 'focus' ? 'Focus session complete. Time for a little reset.' : 'Break is over. Ready when you are.');
          return mode === 'focus' ? 5 * 60 : focusLength * 60;
        }
        const next = current - 1;
        localStorage.setItem('focus-seconds', next.toString());
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [timerRunning, mode, focusLength]);

  const togglePlayback = () => {
    if (!playerReady) {
      setNotice('Connecting to YouTube…');
      return;
    }
    if (isPlaying) playerRef.current?.pauseVideo();
    else playerRef.current?.playVideo();
  };

  const selectStation = (station: Station) => {
    setActiveStation(station.id);
    setNotice(`${station.name} is ready to play.`);
  };

  const changeMode = (nextMode: 'focus' | 'break') => {
    setMode(nextMode);
    setTimerRunning(false);
    setSecondsLeft(nextMode === 'focus' ? focusLength * 60 : 5 * 60);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(mode === 'focus' ? focusLength * 60 : 5 * 60);
    localStorage.removeItem('focus-seconds');
  };

  const skipStation = (direction: number) => {
    const index = stations.findIndex((station) => station.id === activeStation);
    const next = stations[(index + direction + stations.length) % stations.length];
    selectStation(next);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><span>stillroom</span></div>
        <div className="sidebar-label">Your space</div>
        <nav>
          <button className="nav-item active"><Clock3 size={17} /><span>Focus room</span></button>
          <button className="nav-item"><Library size={17} /><span>My library</span></button>
          <button className="nav-item"><ListMusic size={17} /><span>Playlists</span><span className="nav-count">4</span></button>
        </nav>
        <div className="sidebar-section">
          <div className="sidebar-label">Quick start</div>
          {stations.slice(0, 3).map((station) => {
            const Icon = station.icon;
            return <button key={station.id} className={`quick-station ${station.id === activeStation ? 'selected' : ''}`} onClick={() => selectStation(station)}><span className="station-dot" style={{ background: station.color }}><Icon size={14} /></span><span>{station.name}</span></button>;
          })}
        </div>
        <div className="sidebar-bottom"><button className="nav-item" onClick={() => setShowSettings(true)}><Settings2 size={17} /><span>Settings</span></button><div className="profile"><div className="avatar">A</div><div><strong>Alex's room</strong><small>Personal space</small></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumbs"><span>Wednesday, August 31</span><span className="crumb-separator">/</span><strong>Good afternoon, Alex</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={18} /></button><div className="status-pill"><span className="status-dot" />Your space is quiet</div></div></header>

        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">FOCUS ROOM <span>•</span> SESSION 01</p><h1>Make room for <em>good work.</em></h1><p className="subheading">A softer place to think, create, and get things done.</p></div><button className="date-picker"><span className="calendar-icon">31</span><span>Today</span><ChevronDown size={15} /></button></section>

          <section className="workspace-grid">
            <div className="player-card card-surface">
              <div className="ambient-art" style={{ '--station-color': selectedStation.color } as React.CSSProperties}><div className="ambient-glow" /><div className="ambient-grid" /><div className="ambient-orb orb-one" /><div className="ambient-orb orb-two" /><div className="player-embed" ref={playerHostRef} /></div>
              <div className="player-info"><div><div className="playing-label"><span className={`sound-wave ${isPlaying ? 'playing' : ''}`}><i /><i /><i /><i /></span>{isPlaying ? 'NOW PLAYING' : 'READY WHEN YOU ARE'}</div><h2>{selectedStation.name}</h2><p>{selectedStation.description}</p></div><div className="player-actions"><button className="round-control" onClick={() => skipStation(-1)} aria-label="Previous station"><SkipBack size={17} /></button><button className="play-button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button><button className="round-control" onClick={() => skipStation(1)} aria-label="Next station"><SkipForward size={17} /></button></div></div>
              <div className="player-progress"><span>Live radio</span><div className="progress-track"><div className={`progress-fill ${isPlaying ? 'moving' : ''}`} /></div><span>{selectedStation.duration}</span></div>
              <div className="volume-row"><button className="volume-icon" onClick={() => { setIsMuted(!isMuted); if (!isMuted) playerRef.current?.mute(); else playerRef.current?.unMute(); }} aria-label={isMuted ? 'Unmute' : 'Mute'}>{isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(event) => { setIsMuted(false); setVolume(Number(event.target.value)); }} aria-label="Volume" /><span>{isMuted ? 0 : volume}%</span></div>
            </div>

            <div className="timer-card card-surface"><div className="card-heading"><div><p className="eyebrow">YOUR TIMER</p><h2>Stay in the flow</h2></div><button className="icon-button subtle" onClick={resetTimer} aria-label="Reset timer"><RotateCcw size={17} /></button></div><div className="mode-switch"><button className={mode === 'focus' ? 'active' : ''} onClick={() => changeMode('focus')}>Focus</button><button className={mode === 'break' ? 'active' : ''} onClick={() => changeMode('break')}>Break</button></div><div className="timer-display"><div className={`timer-ring ${timerRunning ? 'timer-active' : ''}`}><div><span>{formatTime(secondsLeft)}</span><small>{timerRunning ? 'in session' : 'paused'}</small></div></div></div><div className="timer-controls"><button className="timer-main-button" onClick={() => setTimerRunning(!timerRunning)}>{timerRunning ? <><Pause size={16} fill="currentColor" />Pause timer</> : <><Play size={16} fill="currentColor" />Start timer</>}</button><button className="timer-reset" onClick={resetTimer}><TimerReset size={16} /></button></div><div className="timer-note"><span className="tiny-sparkle"><Sparkles size={13} /></span><span>{mode === 'focus' ? 'A clear mind does its best work.' : 'Step away. Let your mind wander.'}</span></div></div>
          </section>

          <section className="stations-section"><div className="section-heading"><div><p className="eyebrow">EXPLORE SOUNDS</p><h2>Find your atmosphere</h2></div><button className="text-button">View all <ChevronRight size={15} /></button></div><div className="station-grid">{stations.map((station) => { const Icon = station.icon; return <button key={station.id} className={`station-card ${station.id === activeStation ? 'active' : ''}`} onClick={() => selectStation(station)}><div className="station-art" style={{ '--station-color': station.color } as React.CSSProperties}><Icon size={26} strokeWidth={1.5} /><span className="station-duration">{station.duration}</span>{station.id === activeStation && <span className="active-badge"><span className="mini-bars"><i /><i /><i /></span>Active</span>}</div><div className="station-copy"><strong>{station.name}</strong><span>{station.description}</span></div><span className="station-arrow"><ChevronRight size={15} /></span></button>; })}<button className="add-station"><span><Plus size={21} /></span><strong>Add a station</strong><small>Make it yours</small></button></div></section>
          <section className="footer-note"><Moon size={15} /><span>Dark mode is on</span><span className="footer-separator">•</span><span>Your preferences are saved on this device</span></section>
        </div>
      </main>

      {notice && <button className="notice" onClick={() => setNotice('')}>{notice}<X size={14} /></button>}
      {showSettings && <div className="modal-backdrop" onClick={() => setShowSettings(false)}><div className="settings-modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">PERSONALIZE</p><h2>Room settings</h2></div><button className="icon-button" onClick={() => setShowSettings(false)}><X size={18} /></button></div><label>Focus session length<select value={focusLength} onChange={(event) => { const next = Number(event.target.value); setFocusLength(next); if (mode === 'focus') setSecondsLeft(next * 60); }}><option value={25}>25 minutes</option><option value={50}>50 minutes</option><option value={90}>90 minutes</option></select></label><div className="setting-row"><div><strong>Auto-pause on break</strong><small>Pause the station when focus ends</small></div><span className="toggle on"><span /></span></div><div className="setting-row"><div><strong>Ambient visuals</strong><small>Keep the room animation moving</small></div><span className="toggle on"><span /></span></div></div></div>}
    </div>
  );
}

export default App;
