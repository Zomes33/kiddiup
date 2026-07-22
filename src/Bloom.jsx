import React, { useState, useMemo, useRef, useEffect } from 'react';

// ---------- Config ----------
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8..20
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const BG_OPTIONS = [
  { name: 'Oat', hex: '#F6F1E4', paper: '#FFFFFF', ink: '#2B2B33', inkSoft: '#6B6875', line: '#E4DFD4', accent: '#B8863B', accentSoft: '#F1E9D6' },
  { name: 'Dusty Blue', hex: '#EAF0F6', paper: '#FFFFFF', ink: '#2B2B33', inkSoft: '#6B6875', line: '#E4DFD4', accent: '#3E6178', accentSoft: '#E3EDF2' },
  { name: 'Moss', hex: '#E3E8DD', paper: '#FFFFFF', ink: '#2B2B33', inkSoft: '#6B6875', line: '#E4DFD4', accent: '#4F6B4A', accentSoft: '#EAF1E6' },
  { name: 'Clay', hex: '#F3E3D8', paper: '#FFFFFF', ink: '#2B2B33', inkSoft: '#6B6875', line: '#E4DFD4', accent: '#B15E42', accentSoft: '#F5E3DA' },
  { name: 'Charcoal', hex: '#23252B', paper: '#2C2E36', ink: '#F0EEF2', inkSoft: '#A6A3AF', line: '#3C3E47', accent: '#4F6B4A', accentSoft: '#2E3A2C' },
];

const EMOJI_PALETTE = ['💎', '💼', '🏃', '🗂️', '📚', '💰', '🏠', '✈️', '🎨', '🍳', '🌱', '🧘', '🎵', '🛠️', '📝', '👨‍👩‍👧', '🐾', '💊', '🧹', '🎯', '📞', '💻', '🛒', '⚽'];
const DANGER = '#C1584A';
const AMBER = '#C68A3D';

// ---------- Date helpers ----------
function pad(n) { return String(n).padStart(2, '0'); }
function dateKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function startOfWeek(d) { const dow = d.getDay(); const diff = dow === 0 ? -6 : 1 - dow; return addDays(d, diff); }
function isSameDay(a, b) { return dateKey(a) === dateKey(b); }
function fmtHour(h) {
  const period = h < 12 ? 'am' : 'pm';
  let display = h % 12;
  if (display === 0) display = 12;
  return `${display}:00 ${period}`;
}
function fmtDayHeader(d) {
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtWeekRange(d) {
  const start = startOfWeek(d);
  const end = addDays(start, 6);
  const sameMonth = start.getMonth() === end.getMonth();
  const startStr = start.toLocaleDateString('en-AU', { day: 'numeric', month: sameMonth ? undefined : 'short' });
  const endStr = end.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startStr} – ${endStr}`;
}
function fmtMonthLabel(d) {
  return d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}
function daysUntil(dueDateStr) {
  if (!dueDateStr) return null;
  const [y, m, d] = dueDateStr.split('-').map(Number);
  const due = new Date(y, m - 1, d);
  const now = new Date();
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((due - nowMid) / 86400000);
}
function fmtDue(dueDateStr) {
  const [y, m, d] = dueDateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export default function Bloom() {
  const [bgIndex, setBgIndex] = useState(0);
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week' | 'month'
  const [anchorDate, setAnchorDate] = useState(new Date());

  const [bigTasks, setBigTasks] = useState([
    { id: 'bt1', name: 'Client project', emoji: '💼', dueDate: dateKey(addDays(new Date(), 9)) },
    { id: 'bt2', name: 'Health & movement', emoji: '🏃', dueDate: null },
    { id: 'bt3', name: 'Admin & errands', emoji: '🗂️', dueDate: null },
  ]);

  // tasksByDate: { 'YYYY-MM-DD': { 8: {text, done, bigTaskId} | null, ... } }
  const [tasksByDate, setTasksByDate] = useState({});

  const [openEmojiMenuFor, setOpenEmojiMenuFor] = useState(null);
  const [openDueMenuFor, setOpenDueMenuFor] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [leadMinutes, setLeadMinutes] = useState(10);
  const [toast, setToast] = useState(null);
  const audioCtxRef = useRef(null);
  const notifiedRef = useRef(new Set());
  const toastTimerRef = useRef(null);
  const [openSlotForm, setOpenSlotForm] = useState(null); // { dateKey, hour } | null
  const [draftText, setDraftText] = useState('');
  const [draftTag, setDraftTag] = useState('');
  const [idCounter, setIdCounter] = useState(4);

  const theme = BG_OPTIONS[bgIndex];
  const today = new Date();

  const bigTaskById = (id) => bigTasks.find((t) => t.id === id);

  const getSlot = (dk, hour) => (tasksByDate[dk] && tasksByDate[dk][hour]) || null;

  const setSlot = (dk, hour, data) => {
    setTasksByDate((prev) => ({
      ...prev,
      [dk]: { ...(prev[dk] || {}), [hour]: data },
    }));
  };

  // ---------- Navigation ----------
  const goPrev = () => {
    if (viewMode === 'day') setAnchorDate((d) => addDays(d, -1));
    else if (viewMode === 'week') setAnchorDate((d) => addDays(d, -7));
    else setAnchorDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const goNext = () => {
    if (viewMode === 'day') setAnchorDate((d) => addDays(d, 1));
    else if (viewMode === 'week') setAnchorDate((d) => addDays(d, 7));
    else setAnchorDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };
  const goToday = () => setAnchorDate(new Date());
  const jumpToDay = (d) => { setAnchorDate(d); setViewMode('day'); };

  // ---------- Slot form ----------
  const openForm = (dk, hour) => {
    const existing = getSlot(dk, hour);
    setDraftText(existing ? existing.text : '');
    setDraftTag(existing && existing.bigTaskId ? existing.bigTaskId : '');
    setOpenSlotForm({ dateKey: dk, hour });
  };

  const saveSlot = (dk, hour) => {
    const val = draftText.trim();
    const existing = getSlot(dk, hour);
    setSlot(dk, hour, val ? { text: val, done: existing ? existing.done : false, bigTaskId: draftTag || null } : null);
    setOpenSlotForm(null);
  };

  const toggleDone = (dk, hour) => {
    const existing = getSlot(dk, hour);
    if (!existing) return;
    setSlot(dk, hour, { ...existing, done: !existing.done });
  };

  const deleteSlot = (dk, hour) => setSlot(dk, hour, null);

  // ---------- Big tasks ----------
  const addBigTask = () => {
    const id = 'bt' + idCounter;
    setIdCounter((c) => c + 1);
    setBigTasks((prev) => [...prev, { id, name: 'New task', emoji: EMOJI_PALETTE[prev.length % EMOJI_PALETTE.length], dueDate: null }]);
  };
  const renameBigTask = (id, name) => setBigTasks((prev) => prev.map((t) => (t.id === id ? { ...t, name: name || t.name } : t)));
  const setEmoji = (id, emoji) => { setBigTasks((prev) => prev.map((t) => (t.id === id ? { ...t, emoji } : t))); setOpenEmojiMenuFor(null); };
  const setDueDate = (id, dueDate) => { setBigTasks((prev) => prev.map((t) => (t.id === id ? { ...t, dueDate: dueDate || null } : t))); };
  const deleteBigTask = (id) => {
    setBigTasks((prev) => prev.filter((t) => t.id !== id));
    setTasksByDate((prev) => {
      const next = {};
      Object.keys(prev).forEach((dk) => {
        next[dk] = {};
        Object.keys(prev[dk]).forEach((h) => {
          const s = prev[dk][h];
          next[dk][h] = s && s.bigTaskId === id ? { ...s, bigTaskId: null } : s;
        });
      });
      return next;
    });
  };

  // ---------- Aggregates for the visible period ----------
  const periodDates = useMemo(() => {
    if (viewMode === 'day') return [anchorDate];
    if (viewMode === 'week') {
      const start = startOfWeek(anchorDate);
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    const first = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const last = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
    const days = [];
    for (let d = new Date(first); d <= last; d = addDays(d, 1)) days.push(new Date(d));
    return days;
  }, [viewMode, anchorDate]);

  const { done, total, pct } = useMemo(() => {
    const filled = [];
    periodDates.forEach((d) => {
      const slots = tasksByDate[dateKey(d)] || {};
      Object.values(slots).forEach((s) => s && filled.push(s));
    });
    const done = filled.filter((s) => s.done).length;
    const total = filled.length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [periodDates, tasksByDate]);

  const periodLabel = viewMode === 'day' ? fmtDayHeader(anchorDate) : viewMode === 'week' ? fmtWeekRange(anchorDate) : fmtMonthLabel(anchorDate);

  const progressForBigTask = (id) => {
    let total = 0, done = 0;
    Object.values(tasksByDate).forEach((slots) => {
      Object.values(slots).forEach((s) => {
        if (s && s.bigTaskId === id) { total++; if (s.done) done++; }
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  // ---------- Calendar export (.ics) ----------
  const pad2 = (n) => String(n).padStart(2, '0');
  const icsDateTime = (dk, hour) => {
    const [y, m, d] = dk.split('-');
    return `${y}${m}${d}T${pad2(hour)}0000`;
  };
  const escapeICS = (str) => String(str).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  const buildICS = (dateKeysToInclude) => {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bloom//Bloom Export//EN', 'CALSCALE:GREGORIAN'];
    const now = new Date();
    const stamp = `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}00Z`;

    dateKeysToInclude.forEach((dk) => {
      const slots = tasksByDate[dk];
      if (!slots) return;
      Object.entries(slots).forEach(([hourStr, task]) => {
        if (!task) return;
        const hour = Number(hourStr);
        const tag = task.bigTaskId ? bigTaskById(task.bigTaskId) : null;
        const summary = tag ? `${tag.emoji} ${task.text}` : task.text;
        lines.push(
          'BEGIN:VEVENT',
          `UID:bloom-${dk}-${hour}@bloom`,
          `DTSTAMP:${stamp}`,
          `DTSTART:${icsDateTime(dk, hour)}`,
          `DTEND:${icsDateTime(dk, hour + 1)}`,
          `SUMMARY:${escapeICS(summary)}`,
          tag ? `DESCRIPTION:${escapeICS('Project: ' + tag.name)}` : '',
          task.done ? 'STATUS:COMPLETED' : 'STATUS:CONFIRMED',
          'END:VEVENT'
        );
      });
    });

    lines.push('END:VCALENDAR');
    return lines.filter(Boolean).join('\r\n');
  };

  const downloadICS = (dateKeysToInclude, filename) => {
    const ics = buildICS(dateKeysToInclude);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCurrentView = () => {
    downloadICS(periodDates.map(dateKey), `bloom-${viewMode}-${dateKey(anchorDate)}.ics`);
    setSettingsOpen(false);
  };
  const exportEverything = () => {
    downloadICS(Object.keys(tasksByDate), 'bloom-full-export.ics');
    setSettingsOpen(false);
  };

  // ---------- Sound reminders ----------
  const playPianoNote = (ctx, freq, start, dur, peak) => {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(peak, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    gain.connect(ctx.destination);
    [1, 2, 3, 4].forEach((h, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * h, start);
      const harmonicGain = ctx.createGain();
      harmonicGain.gain.value = [1, 0.5, 0.22, 0.1][i];
      osc.connect(harmonicGain);
      harmonicGain.connect(gain);
      osc.start(start);
      osc.stop(start + dur + 0.1);
    });
  };

  const playChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => playPianoNote(ctx, freq, t + i * 0.18, 1.6 - i * 0.15, 0.2 - i * 0.02));
    } catch (e) { /* audio not available */ }
  };

  const showToast = (text) => {
    setToast(text);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 8000);
  };

  const toggleSound = () => {
    if (!soundEnabled) playChime(); // unlock audio with this click (user gesture)
    setSoundEnabled((s) => !s);
  };

  useEffect(() => {
    if (!soundEnabled) return;
    const checkReminders = () => {
      const now = new Date();
      const todayKey = dateKey(now);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      HOURS.forEach((h) => {
        const task = tasksByDate[todayKey] && tasksByDate[todayKey][h];
        if (!task || task.done) return;
        const slotMinutes = h * 60;
        const minutesUntil = slotMinutes - nowMinutes;
        const notifyKey = `${todayKey}-${h}`;
        if (minutesUntil <= leadMinutes && minutesUntil >= 0 && !notifiedRef.current.has(notifyKey)) {
          notifiedRef.current.add(notifyKey);
          playChime();
          showToast(`${fmtHour(h)} — ${task.text}`);
        }
      });
    };
    checkReminders();
    const id = setInterval(checkReminders, 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundEnabled, leadMinutes, tasksByDate]);

  // ================= RENDER =================
  return (
    <div
      onClick={() => { if (openEmojiMenuFor) setOpenEmojiMenuFor(null); if (openDueMenuFor) setOpenDueMenuFor(null); if (settingsOpen) setSettingsOpen(false); }}
      style={{ background: theme.hex, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: theme.ink, transition: 'background .4s ease' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .dp-empty:hover { opacity: 1 !important; }
        .dp-slot-body:hover .dp-slot-del { opacity: 1 !important; }
        .dp-big-task:hover { background: ${theme.hex} !important; }
        .dp-big-task:hover .dp-big-task-del { opacity: 1 !important; }
        .dp-emoji-btn:hover { transform: scale(1.1); }
        .dp-emoji-wrap:hover .dp-emoji-tooltip { opacity: 1 !important; }
        .dp-add-big:hover { border-color: ${theme.accent} !important; color: ${theme.accent} !important; }
        .dp-input::placeholder { color: ${theme.inkSoft}; opacity: .7; }
        .dp-nav-btn:hover { background: ${theme.accentSoft} !important; }
        .dp-view-btn:hover { color: ${theme.accent} !important; }
        .dp-week-day:hover { border-color: ${theme.accent}66 !important; }
        .dp-month-cell:hover { background: ${theme.accentSoft} !important; }
        .dp-week-add:hover { color: ${theme.accent} !important; }
        .dp-emoji-option:hover { background: ${theme.accentSoft} !important; }
      `}</style>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '36px 28px 80px' }}>
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 22, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6, display: 'block' }}>
              {today.toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 40, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Bloom</h1>
            <p style={{ margin: 0, color: theme.inkSoft, fontSize: 14 }}>Plan the hours. Tag your projects.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: theme.paper, border: `1px solid ${theme.line}`, padding: '8px 12px', borderRadius: 999 }}>
              <span style={{ fontSize: 11, color: theme.inkSoft, fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase', letterSpacing: 1, marginRight: 2 }}>Backdrop</span>
              {BG_OPTIONS.map((opt, i) => (
                <div
                  key={opt.name}
                  className="dp-swatch"
                  title={opt.name}
                  onClick={() => setBgIndex(i)}
                  style={{ width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', background: opt.hex, border: i === bgIndex ? `2px solid ${theme.accent}` : '2px solid transparent', transition: 'transform .15s ease, border-color .15s ease', flexShrink: 0 }}
                />
              ))}
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setSettingsOpen((s) => !s); setOpenEmojiMenuFor(null); setOpenDueMenuFor(null); }}
                title="Settings"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: `1px solid ${theme.line}`,
                  background: theme.paper,
                  color: theme.ink,
                  cursor: 'pointer',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ⚙️
              </button>

              {settingsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 46,
                    right: 0,
                    background: theme.paper,
                    border: `1px solid ${theme.line}`,
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.14)',
                    zIndex: 20,
                    width: 260,
                  }}
                >
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Calendar sync</div>
                  <p style={{ fontSize: 12, color: theme.inkSoft, lineHeight: 1.5, margin: '0 0 12px' }}>
                    Download your schedule as a calendar file, then open it to add these tasks to iPhone Calendar, Google Calendar, or Outlook.
                  </p>

                  <button
                    onClick={exportCurrentView}
                    style={{ width: '100%', border: 'none', background: theme.accent, color: '#fff', borderRadius: 8, padding: '9px 10px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}
                  >
                    Export {viewMode} view (.ics)
                  </button>
                  <button
                    onClick={exportEverything}
                    style={{ width: '100%', border: `1px solid ${theme.line}`, background: 'none', color: theme.ink, borderRadius: 8, padding: '9px 10px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Export everything (.ics)
                  </button>

                  <p style={{ fontSize: 10.5, color: theme.inkSoft, lineHeight: 1.5, margin: '12px 0 0', opacity: 0.8 }}>
                    This is a one-time export, not a live sync — changes made here afterwards won't update your phone's calendar automatically.
                  </p>

                  <div style={{ borderTop: `1px solid ${theme.line}`, marginTop: 14, paddingTop: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600 }}>Sound reminders</div>
                      <div
                        onClick={toggleSound}
                        style={{
                          width: 38,
                          height: 22,
                          borderRadius: 999,
                          background: soundEnabled ? theme.accent : theme.line,
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'background .15s ease',
                          flexShrink: 0,
                        }}
                      >
                        <div style={{ position: 'absolute', top: 2, left: soundEnabled ? 18 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .15s ease' }} />
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: theme.inkSoft, lineHeight: 1.5, margin: '0 0 10px' }}>
                      Play a soft piano arpeggio before a scheduled task starts, while this tab is open.
                    </p>

                    {soundEnabled && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: 12, color: theme.inkSoft }}>Remind me</span>
                          <select
                            value={leadMinutes}
                            onChange={(e) => setLeadMinutes(Number(e.target.value))}
                            style={{ border: `1px solid ${theme.line}`, borderRadius: 6, padding: '5px 6px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: theme.hex, color: theme.ink }}
                          >
                            <option value={5}>5 min before</option>
                            <option value={10}>10 min before</option>
                            <option value={15}>15 min before</option>
                          </select>
                        </div>
                        <button
                          onClick={playChime}
                          style={{ width: '100%', border: `1px solid ${theme.line}`, background: 'none', color: theme.ink, borderRadius: 8, padding: '8px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Test sound
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* View controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 999, padding: 4 }}>
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                className="dp-view-btn"
                onClick={() => setViewMode(mode)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '7px 16px',
                  borderRadius: 999,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  background: viewMode === mode ? theme.accent : 'transparent',
                  color: viewMode === mode ? '#fff' : theme.inkSoft,
                  transition: 'all .15s ease',
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="dp-nav-btn" onClick={goPrev} style={navBtnStyle(theme)}>‹</button>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, minWidth: 190, textAlign: 'center' }}>{periodLabel}</div>
            <button className="dp-nav-btn" onClick={goNext} style={navBtnStyle(theme)}>›</button>
            <button
              className="dp-nav-btn"
              onClick={goToday}
              style={{ ...navBtnStyle(theme), width: 'auto', padding: '0 14px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Today
            </button>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
          <div style={{ flex: 1, height: 8, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: theme.accent, width: `${pct}%`, transition: 'width .35s ease', borderRadius: 6 }} />
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.inkSoft, whiteSpace: 'nowrap' }}>{done} / {total} done</div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'day' ? '1.55fr 1fr' : '1fr', gap: 24, alignItems: 'start' }}>
          {viewMode === 'day' && (
            <DayPanel
              theme={theme}
              dk={dateKey(anchorDate)}
              getSlot={getSlot}
              openSlotForm={openSlotForm}
              openForm={openForm}
              saveSlot={saveSlot}
              toggleDone={toggleDone}
              deleteSlot={deleteSlot}
              draftText={draftText}
              setDraftText={setDraftText}
              draftTag={draftTag}
              setDraftTag={setDraftTag}
              setOpenSlotForm={setOpenSlotForm}
              bigTasks={bigTasks}
              bigTaskById={bigTaskById}
            />
          )}

          {viewMode === 'week' && (
            <WeekPanel theme={theme} anchorDate={anchorDate} tasksByDate={tasksByDate} bigTaskById={bigTaskById} toggleDone={toggleDone} jumpToDay={jumpToDay} today={today} />
          )}

          {viewMode === 'month' && (
            <MonthPanel theme={theme} anchorDate={anchorDate} tasksByDate={tasksByDate} bigTaskById={bigTaskById} jumpToDay={jumpToDay} today={today} />
          )}

          {/* Big tasks panel — always visible */}
          <div style={{ background: theme.paper, borderRadius: 14, border: `1px solid ${theme.line}`, overflow: 'hidden', ...(viewMode !== 'day' ? { maxWidth: 420 } : {}) }}>
            <div style={{ padding: '18px 22px', borderBottom: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, margin: 0 }}>Projects</h2>
              <span style={{ fontSize: 11, color: theme.inkSoft, fontFamily: "'IBM Plex Mono', monospace" }}>{bigTasks.length} tracked</span>
            </div>

            <div style={{ padding: 16 }}>
              {bigTasks.map((bt) => {
                const progress = progressForBigTask(bt.id);
                const days = daysUntil(bt.dueDate);
                let dueLabel = 'Ongoing';
                let dueColor = theme.inkSoft;
                if (bt.dueDate) {
                  if (days < 0) { dueLabel = `Overdue ${Math.abs(days)}d`; dueColor = DANGER; }
                  else if (days === 0) { dueLabel = 'Due today'; dueColor = AMBER; }
                  else if (days <= 3) { dueLabel = `Due in ${days}d`; dueColor = AMBER; }
                  else { dueLabel = `Due ${fmtDue(bt.dueDate)}`; dueColor = theme.inkSoft; }
                }
                const barColor = bt.dueDate && days < 0 ? DANGER : theme.accent;

                return (
                  <div key={bt.id} className="dp-big-task" style={{ padding: '12px 10px', borderRadius: 10, marginBottom: 6, transition: 'background .15s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="dp-emoji-wrap" style={{ position: 'relative' }}>
                        <div
                          className="dp-emoji-btn"
                          onClick={(e) => { e.stopPropagation(); setOpenEmojiMenuFor(openEmojiMenuFor === bt.id ? null : bt.id); setOpenDueMenuFor(null); }}
                          style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, cursor: 'pointer', background: theme.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, transition: 'transform .15s ease' }}
                        >
                          {bt.emoji}
                        </div>
                        <div
                          className="dp-emoji-tooltip"
                          style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginBottom: 6,
                            background: theme.ink,
                            color: theme.paper,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10.5,
                            fontWeight: 500,
                            padding: '4px 8px',
                            borderRadius: 6,
                            whiteSpace: 'nowrap',
                            opacity: 0,
                            pointerEvents: 'none',
                            transition: 'opacity .15s ease',
                            zIndex: 5,
                          }}
                        >
                          Click to change
                        </div>
                        {openEmojiMenuFor === bt.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'absolute', top: 38, left: 0, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 10, padding: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10, width: 200 }}
                          >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginBottom: 8 }}>
                              {EMOJI_PALETTE.map((e) => (
                                <div
                                  key={e}
                                  className="dp-emoji-option"
                                  onClick={() => setEmoji(bt.id, e)}
                                  style={{ width: 28, height: 28, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background .15s ease' }}
                                >
                                  {e}
                                </div>
                              ))}
                            </div>
                            <input
                              type="text"
                              placeholder="Or paste any emoji"
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                if (val) { setEmoji(bt.id, val); e.target.value = ''; }
                              }}
                              style={{ width: '100%', border: `1px solid ${theme.line}`, borderRadius: 6, padding: '6px 8px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: theme.hex, color: theme.ink, boxSizing: 'border-box' }}
                            />
                          </div>
                        )}
                      </div>

                      <BigTaskNameField initialName={bt.name} onCommit={(name) => renameBigTask(bt.id, name)} theme={theme} />

                      <button className="dp-big-task-del" onClick={() => deleteBigTask(bt.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.inkSoft, fontSize: 15, opacity: 0, transition: 'opacity .15s ease', flexShrink: 0 }}>✕</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, paddingLeft: 42, flexWrap: 'wrap', rowGap: 6 }}>
                      <div style={{ flex: '1 1 40px', minWidth: 40, height: 6, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress.pct}%`, background: barColor, borderRadius: 4, transition: 'width .3s ease' }} />
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: theme.inkSoft, whiteSpace: 'nowrap' }}>
                        {progress.done}/{progress.total}
                      </div>

                      <div style={{ position: 'relative' }}>
                        <div
                          onClick={(e) => { e.stopPropagation(); setOpenDueMenuFor(openDueMenuFor === bt.id ? null : bt.id); setOpenEmojiMenuFor(null); }}
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 10.5,
                            color: dueColor,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            padding: '3px 8px',
                            borderRadius: 999,
                            background: theme.hex,
                            border: `1px solid ${theme.line}`,
                          }}
                        >
                          {dueLabel}
                        </div>
                        {openDueMenuFor === bt.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'absolute', top: 28, right: 0, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 10, padding: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10, width: 190 }}
                          >
                            <input
                              type="date"
                              value={bt.dueDate || ''}
                              onChange={(e) => setDueDate(bt.id, e.target.value)}
                              style={{ width: '100%', border: `1px solid ${theme.line}`, borderRadius: 6, padding: '6px 8px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: theme.hex, color: theme.ink, boxSizing: 'border-box', marginBottom: 8 }}
                            />
                            <button
                              onClick={() => { setDueDate(bt.id, null); setOpenDueMenuFor(null); }}
                              style={{ width: '100%', border: 'none', background: theme.accentSoft, color: theme.accent, borderRadius: 6, padding: '7px 8px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                            >
                              Mark as ongoing
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dp-add-big" onClick={addBigTask} style={{ margin: '8px 10px 16px', padding: 12, border: `1.5px dashed ${theme.line}`, borderRadius: 10, textAlign: 'center', color: theme.inkSoft, fontSize: 13, cursor: 'pointer', transition: 'all .15s ease' }}>
              + add a project
            </div>
          </div>
        </div>

      </div>

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: theme.paper,
            border: `1px solid ${theme.line}`,
            borderLeft: `4px solid ${theme.accent}`,
            borderRadius: 10,
            padding: '12px 16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.16)',
            maxWidth: 280,
            zIndex: 50,
          }}
        >
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: theme.accent, marginBottom: 4 }}>Upcoming</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: theme.ink }}>{toast}</div>
        </div>
      )}
    </div>
  );
}

function BigTaskNameField({ initialName, onCommit, theme }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialName);
  const inputRef = useRef(null);

  useEffect(() => { setValue(initialName); }, [initialName]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const fontSize = value.length > 26 ? 12.5 : value.length > 16 ? 13.5 : 14.5;

  const commit = () => {
    setEditing(false);
    onCommit(value.trim() || initialName);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') { setValue(initialName); setEditing(false); } }}
        style={{ flex: 1, minWidth: 0, border: 'none', background: 'none', fontFamily: "'DM Sans', sans-serif", fontSize, fontWeight: 500, color: theme.ink, padding: '4px 2px', outline: 'none' }}
      />
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      style={{
        flex: 1,
        minWidth: 0,
        cursor: 'text',
        fontFamily: "'DM Sans', sans-serif",
        fontSize,
        fontWeight: 500,
        color: theme.ink,
        padding: '4px 2px',
        lineHeight: 1.3,
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
      }}
    >
      {value}
    </div>
  );
}

function navBtnStyle(theme) {
  return {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: `1px solid ${theme.line}`,
    background: theme.paper,
    color: theme.ink,
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background .15s ease',
  };
}

// ================= DAY VIEW =================
function DayPanel({ theme, dk, getSlot, openSlotForm, openForm, saveSlot, toggleDone, deleteSlot, draftText, setDraftText, draftTag, setDraftTag, setOpenSlotForm, bigTasks, bigTaskById }) {
  return (
    <div style={{ background: theme.paper, borderRadius: 14, border: `1px solid ${theme.line}`, overflow: 'hidden' }}>
      <div style={{ padding: '18px 22px', borderBottom: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, margin: 0 }}>Schedule</h2>
        <span style={{ fontSize: 11, color: theme.inkSoft, fontFamily: "'IBM Plex Mono', monospace" }}>8:00 — 20:00</span>
      </div>

      <div style={{ padding: '6px 0' }}>
        {HOURS.map((h) => {
          const data = getSlot(dk, h);
          const tag = data && data.bigTaskId ? bigTaskById(data.bigTaskId) : null;
          const isEditing = openSlotForm && openSlotForm.dateKey === dk && openSlotForm.hour === h;

          return (
            <div key={h} style={{ display: 'flex', alignItems: 'stretch', borderBottom: `1px solid ${theme.line}`, minHeight: 56 }}>
              <div style={{ width: 88, flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.inkSoft, padding: '14px 0 0 20px', whiteSpace: 'nowrap' }}>
                {fmtHour(h)}
              </div>

              <div className="dp-slot-body" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', padding: '8px 18px 8px 14px', gap: 10 }}>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: 8, width: '100%', alignItems: 'center', flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
                    <input
                      className="dp-input"
                      type="text"
                      autoFocus
                      placeholder="What needs doing?"
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') saveSlot(dk, h); if (e.key === 'Escape') setOpenSlotForm(null); }}
                      style={{ flex: 1, minWidth: 120, border: `1px solid ${theme.line}`, borderRadius: 8, padding: '8px 10px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, background: theme.hex, color: theme.ink }}
                    />
                    <select
                      value={draftTag}
                      onChange={(e) => setDraftTag(e.target.value)}
                      style={{ border: `1px solid ${theme.line}`, borderRadius: 8, padding: '7px 8px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: theme.hex, color: theme.ink, maxWidth: 140 }}
                    >
                      <option value="">No tag</option>
                      {bigTasks.map((bt) => (<option key={bt.id} value={bt.id}>{bt.emoji} {bt.name}</option>))}
                    </select>
                    <button onClick={() => saveSlot(dk, h)} style={{ border: 'none', background: theme.accent, color: '#fff', borderRadius: 8, padding: '8px 12px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Save</button>
                  </div>
                ) : data ? (
                  <>
                    <div
                      onClick={() => toggleDone(dk, h)}
                      style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${data.done ? theme.accent : theme.inkSoft}`, flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease', background: data.done ? theme.accent : 'transparent' }}
                    >
                      {data.done && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
                    </div>
                    {tag && (
                      <div style={{ fontSize: 15, flexShrink: 0, width: 22, textAlign: 'center' }} title={tag.name}>{tag.emoji}</div>
                    )}
                    <div onClick={() => openForm(dk, h)} style={{ flex: 1, fontSize: 14, lineHeight: 1.35, cursor: 'pointer', textDecoration: data.done ? 'line-through' : 'none', color: data.done ? theme.inkSoft : theme.ink }}>
                      {data.text}
                    </div>
                    <button className="dp-slot-del" onClick={() => deleteSlot(dk, h)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.inkSoft, fontSize: 15, opacity: 0, transition: 'opacity .15s ease', flexShrink: 0 }}>✕</button>
                  </>
                ) : (
                  <div className="dp-empty" onClick={() => openForm(dk, h)} style={{ color: theme.inkSoft, fontSize: 13, cursor: 'pointer', opacity: 0.55, transition: 'opacity .15s ease', padding: '10px 0', width: '100%' }}>
                    + add task
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ================= WEEK VIEW =================
function WeekPanel({ theme, anchorDate, tasksByDate, bigTaskById, toggleDone, jumpToDay, today }) {
  const start = startOfWeek(anchorDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
      {days.map((d) => {
        const dk = dateKey(d);
        const slots = tasksByDate[dk] || {};
        const entries = Object.entries(slots)
          .filter(([, v]) => v)
          .sort((a, b) => Number(a[0]) - Number(b[0]));
        const isToday = isSameDay(d, today);

        return (
          <div
            key={dk}
            className="dp-week-day"
            style={{ background: theme.paper, border: `1px solid ${isToday ? theme.accent : theme.line}`, borderRadius: 12, padding: '12px 10px', minHeight: 220, display: 'flex', flexDirection: 'column', transition: 'border-color .15s ease' }}
          >
            <div onClick={() => jumpToDay(d)} style={{ cursor: 'pointer', marginBottom: 8 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: isToday ? theme.accent : theme.inkSoft }}>
                {WEEKDAY_LABELS[(d.getDay() + 6) % 7]}
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: isToday ? theme.accent : theme.ink }}>{d.getDate()}</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {entries.length === 0 && (
                <div style={{ fontSize: 11.5, color: theme.inkSoft, opacity: 0.7, marginTop: 4 }}>No tasks yet</div>
              )}
              {entries.map(([hourStr, task]) => {
                const hour = Number(hourStr);
                const tag = task.bigTaskId ? bigTaskById(task.bigTaskId) : null;
                return (
                  <div key={hourStr} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <div
                      onClick={() => toggleDone(dk, hour)}
                      style={{ width: 12, height: 12, marginTop: 2, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', background: task.done ? theme.accent : 'transparent', border: `1.5px solid ${task.done ? theme.accent : theme.inkSoft}` }}
                    />
                    {tag && <div style={{ fontSize: 11, marginTop: 1, flexShrink: 0 }}>{tag.emoji}</div>}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: theme.inkSoft }}>{fmtHour(hour)}</div>
                      <div
                        style={{
                          fontSize: 12,
                          lineHeight: 1.3,
                          color: task.done ? theme.inkSoft : theme.ink,
                          textDecoration: task.done ? 'line-through' : 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={task.text}
                      >
                        {task.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dp-week-add" onClick={() => jumpToDay(d)} style={{ marginTop: 10, fontSize: 11, color: theme.inkSoft, cursor: 'pointer', textAlign: 'center', borderTop: `1px solid ${theme.line}`, paddingTop: 8 }}>
              + plan this day
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ================= MONTH VIEW =================
function MonthPanel({ theme, anchorDate, tasksByDate, bigTaskById, jumpToDay, today }) {
  const monthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const monthEnd = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = addDays(startOfWeek(monthEnd), 6);
  const totalDays = Math.round((gridEnd - gridStart) / 86400000) + 1;
  const cells = Array.from({ length: totalDays }, (_, i) => addDays(gridStart, i));

  return (
    <div style={{ background: theme.paper, borderRadius: 14, border: `1px solid ${theme.line}`, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${theme.line}` }}>
        {WEEKDAY_LABELS.map((lbl) => (
          <div key={lbl} style={{ padding: '10px 8px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 1, color: theme.inkSoft, textAlign: 'center' }}>
            {lbl}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((d) => {
          const dk = dateKey(d);
          const inMonth = d.getMonth() === anchorDate.getMonth();
          const isToday = isSameDay(d, today);
          const slots = tasksByDate[dk] || {};
          const filled = Object.values(slots).filter(Boolean);
          const doneCount = filled.filter((s) => s.done).length;
          const emojis = [...new Set(filled.map((s) => (s.bigTaskId ? bigTaskById(s.bigTaskId)?.emoji : null)).filter(Boolean))];

          return (
            <div
              key={dk}
              className="dp-month-cell"
              onClick={() => jumpToDay(d)}
              style={{
                minHeight: 92,
                padding: '8px 8px 10px',
                borderRight: `1px solid ${theme.line}`,
                borderBottom: `1px solid ${theme.line}`,
                cursor: 'pointer',
                opacity: inMonth ? 1 : 0.35,
                transition: 'background .15s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: isToday ? '#fff' : theme.inkSoft,
                  background: isToday ? theme.accent : 'transparent',
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                }}
              >
                {d.getDate()}
              </div>

              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', flex: 1, fontSize: 11 }}>
                {emojis.slice(0, 5).map((e, i) => (<span key={i}>{e}</span>))}
              </div>

              {filled.length > 0 && (
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: theme.inkSoft, marginTop: 4 }}>
                  {doneCount}/{filled.length}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
