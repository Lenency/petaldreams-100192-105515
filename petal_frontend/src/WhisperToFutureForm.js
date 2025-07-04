import React, { useState } from "react";
import "./WhisperToFutureForm.css";

/**
 * PUBLIC_INTERFACE
 * WhisperToFutureForm: Compose a dreamy letter to your future self, with unlock date presets, playlist/image/voice attachments.
 */
function WhisperToFutureForm({ onClose }) {
  const [letter, setLetter] = useState("");
  const [unlockType, setUnlockType] = useState("nextMonth");
  const [customDate, setCustomDate] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [image, setImage] = useState(null);
  const [voice, setVoice] = useState(null);

  // Preset unlock date logic
  const computeUnlockDate = () => {
    const now = new Date();
    if (unlockType === "nextMonth") {
      now.setMonth(now.getMonth() + 1);
      return now.toISOString().substr(0, 10);
    }
    if (unlockType === "fiveYears") {
      now.setFullYear(now.getFullYear() + 5);
      return now.toISOString().substr(0, 10);
    }
    if (unlockType === "custom") {
      return customDate;
    }
    return ""; // "whenReady"
  };

  function handleImageInput(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  function handleVoiceInput(e) {
    if (e.target.files && e.target.files[0]) {
      setVoice(e.target.files[0]);
    }
  }

  // Simulate save (no backend, just preview effect)
  function handleSubmit(e) {
    e.preventDefault();
    alert(
      "Your Whisper has been saved (pretend)! \n\nLetter: " +
        letter +
        "\nUnlock date: " +
        (unlockType === "whenReady"
          ? "When you're ready"
          : computeUnlockDate()) +
        "\n\nAttachments: " +
        [playlistUrl && "Playlist", image && "Image", voice && "Voice note"]
          .filter(Boolean)
          .join(", ")
    );
    if (onClose) onClose();
  }

  return (
    <div className="whisper-form-overlay dreamy-fadein">
      <div className="whisper-form-content dreamy-content-box">
        {/* Back button at top left */}
        <button
          className="whisper-back-btn dreamy-pill"
          type="button"
          onClick={onClose}
          aria-label="Back"
          style={{
            position: "absolute",
            top: 18,
            left: 16,
            background: "linear-gradient(92deg, #FAE3D9 70%, #B5EAD7 100%)",
            color: "#8974ae",
            border: "none",
            borderRadius: "1.3em",
            boxShadow: "0 6px 20px -7px #B5EAD755",
            padding: "8px 23px 8px 17px",
            fontFamily: "Quicksand, Poppins, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "1.04em",
            cursor: "pointer",
            zIndex: 11,
            display: "flex",
            alignItems: "center",
            opacity: 0.85,
            transition: "background 0.22s"
          }}
        >
          <span style={{
            display: "inline-block",
            marginRight: "7px",
            fontSize: "1.3em",
            verticalAlign: "middle",
            marginTop: "-2px"
          }}>
            {/* Unicode left arrow with soft icon style */}
            ←
          </span>
          Back
        </button>
        <button
          className="whisper-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="whisper-form-title">Whisper to the Future</h2>
        <form className="whisper-form-fields" onSubmit={handleSubmit}>
          <label className="whisper-label" htmlFor="whisper-letter">
            Your Letter
            <textarea
              id="whisper-letter"
              className="whisper-textarea"
              placeholder="Write a gentle message for your future self..."
              autoFocus
              required
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              minLength={4}
            ></textarea>
          </label>
          <div className="whisper-section">
            <label className="whisper-label">Unlock Date</label>
            <div className="whisper-unlock-options">
              <label>
                <input
                  type="radio"
                  name="unlock"
                  checked={unlockType === "nextMonth"}
                  onChange={() => setUnlockType("nextMonth")}
                />
                <span className="whisper-unlock-pill dreamy-pill">
                  Next Month
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="unlock"
                  checked={unlockType === "fiveYears"}
                  onChange={() => setUnlockType("fiveYears")}
                />
                <span className="whisper-unlock-pill dreamy-pill">
                  5 Years
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="unlock"
                  checked={unlockType === "custom"}
                  onChange={() => setUnlockType("custom")}
                />
                <span className="whisper-unlock-pill dreamy-pill">
                  Custom
                </span>
              </label>
              {unlockType === "custom" && (
                <input
                  className="whisper-custom-date dreamy-pill"
                  type="date"
                  required
                  value={customDate}
                  min={new Date().toISOString().substr(0, 10)}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              )}
              <label>
                <input
                  type="radio"
                  name="unlock"
                  checked={unlockType === "whenReady"}
                  onChange={() => setUnlockType("whenReady")}
                />
                <span className="whisper-unlock-pill dreamy-pill">
                  When I'm ready...
                </span>
              </label>
            </div>
          </div>
          <div className="whisper-section">
            <div className="whisper-attachments-label">Attach:</div>
            <div className="whisper-attachments">
              <div className="whisper-attachment dreamy-pill">
                <span role="img" aria-label="music">
                  🎵
                </span>
                <input
                  type="text"
                  placeholder="Playlist link (Spotify)"
                  className="whisper-attach-input"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  style={{ width: "160px" }}
                />
                <span className="whisper-attach-tag">placeholder</span>
              </div>
              <label className="whisper-attachment dreamy-pill">
                <span role="img" aria-label="image">
                  🖼️
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="whisper-attach-input"
                  style={{ width: "124px" }}
                  onChange={handleImageInput}
                  title="Upload image"
                />
                <span className="whisper-attach-tag">
                  {image ? image.name : "add image"}
                </span>
              </label>
              <label className="whisper-attachment dreamy-pill">
                <span role="img" aria-label="mic">
                  🎤
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  className="whisper-attach-input"
                  style={{ width: "112px" }}
                  onChange={handleVoiceInput}
                  title="Upload voice note"
                />
                <span className="whisper-attach-tag">
                  {voice ? voice.name : "voice note"}
                </span>
              </label>
            </div>
          </div>
          <button type="submit" className="whisper-send-btn dreamy-cta-btn">
            Save and Lock Away
          </button>
        </form>
        <div className="whisper-form-footer dreamy-caption">
          Your whisper will remain hidden until the unlock moment you choose.<br />
          Attachments are not sent; they’re just for your eyes only.
        </div>
      </div>
    </div>
  );
}

export default WhisperToFutureForm;
