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
