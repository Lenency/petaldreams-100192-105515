import React, { useState } from "react";
import "./SidePanel.css";
import WhisperToFutureForm from "./WhisperToFutureForm";

/**
 * PUBLIC_INTERFACE
 * Dreamy Themed Collapsible Left Side Panel with core feature buttons.
 * Opens via a floating button on the left edge.
 * Buttons: Whisper to the Future, Notes Never Sent, Memory Garden, Shared Capsules (optional).
 * - Whisper to the Future: Prepares for Mood Music (Spotify API) and Weather API, but does not implement integration.
 */
function SidePanel({ theme, onFeatureSelect }) {
  const [open, setOpen] = useState(false);
  const [showWhisperForm, setShowWhisperForm] = useState(false);

  // Feature items with accent emojis and soft color hints.
  const features = [
    {
      key: "whisper",
      label: "Whisper to the Future",
      desc: "Send a letter to your future self.",
      icon: "💌",
      dreamyHighlight: "panel-btn-whisper",
    },
    {
      key: "notes",
      label: "Notes Never Sent",
      desc: "Safekeep unsent notes for healing.",
      icon: "📝",
      dreamyHighlight: "panel-btn-notes",
    },
    {
      key: "garden",
      label: "Memory Garden",
      desc: "Grow a gentle garden of memories.",
      icon: "🌱",
      dreamyHighlight: "panel-btn-garden",
    },
    {
      key: "capsules",
      label: "Shared Capsules",
      desc: "Share secret thoughts (optional).",
      icon: "🌸",
      dreamyHighlight: "panel-btn-capsules",
    },
  ];

  // Preview section for Whisper to the Future, prepping Spotify/Weather
  const renderWhisperPreview = () => (
    <div className="sidepanel-whisper-extra dreamy-fadein">
      <div className="whisper-preview-label">
        <span className="preview-emoji">🎧</span>
        <span className="preview-label">Attach Mood Music</span>
        <span className="preview-coming">(Spotify API coming soon)</span>
      </div>
      <div className="whisper-preview-label">
        <span className="preview-emoji">⛅</span>
        <span className="preview-label">Today's Weather</span>
        <span className="preview-coming">(Weather API coming soon)</span>
      </div>
      {/* Placeholder UI (not interactive) */}
      <div className="whisper-preview-box dreamy-bg-box">
        <div className="music-placeholder dreamy-pill">+ Add mood music</div>
        <div className="weather-placeholder dreamy-pill">Weather will be shown here</div>
      </div>
    </div>
  );

  return (
    <>
      {!open && (
        <button
          className="sidepanel-open-btn dreamy-panel-btn"
          aria-label="Open Menu"
          onClick={() => setOpen(true)}
        >
          <span className="sidepanel-hamburger">
            <span />
            <span />
            <span />
          </span>
        </button>
      )}
      <aside className={`sidepanel ${open ? "open dreamy-slidein" : ""} ${theme}`}>
        <div className="sidepanel-header">
          <button
            className="sidepanel-close-btn dreamy-panel-btn"
            aria-label="Close Menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <span className="sidepanel-title">Petal Menu</span>
        </div>
        <nav className="sidepanel-features">
          {features.map((f) => (
            <button
              className={`panel-feature-btn dreamy-feature-btn ${f.dreamyHighlight}`}
              key={f.key}
              onClick={() => {
                if (onFeatureSelect) onFeatureSelect(f.key);
                if (f.key === "whisper") setShowWhisperForm(true);
              }}
              tabIndex={open ? 0 : -1}
            >
              <span className="feature-ico">{f.icon}</span>
              <span className="feature-label">{f.label}</span>
              <span className="feature-desc">{f.desc}</span>
            </button>
          ))}
        </nav>
        <div className="sidepanel-divider" />
        <div className="sidepanel-info dreamy-caption">
          <span className="dreamy-bubble">🌙</span> Soft Dreamy Memories
        </div>
        {/* Whisper extras */}
        {open && onFeatureSelect && onFeatureSelect.lastSelected === "whisper" && renderWhisperPreview()}
        <div className="sidepanel-blur-btm dreamy-blur-bg" />
      </aside>
      {/* Subtle overlay when open */}
      {open && <div className="sidepanel-overlay" onClick={() => setOpen(false)} />}
      {/* Whisper to the Future Modal */}
      {showWhisperForm && open && onFeatureSelect && onFeatureSelect.lastSelected === "whisper" && (
        <WhisperToFutureForm onClose={() => setShowWhisperForm(false)} />
      )}
    </>
  );
}

export default SidePanel;
