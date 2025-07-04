import React, { useState } from "react";
import "./WhisperToFutureForm.css";

/**
 * PUBLIC_INTERFACE
 * NotesNeverSentForm: Compose an unsent letter ("notes never sent") to someone you miss, regret, admire, or hate.
 * The letter stays locked and can only be destroyed with a dreamy flower animation:
 * "burn" (petal/leaf fiery effect) or "plant" (petal/seed growth), matching the core aesthetic.
 */
function NotesNeverSentForm({ onClose }) {
  const [letter, setLetter] = useState("");
  const [emotion, setEmotion] = useState("miss");
  const [locked, setLocked] = useState(true);
  const [destroyChoice, setDestroyChoice] = useState(null); // "burn" or "plant"
  const [animating, setAnimating] = useState(false);
  const [destroyed, setDestroyed] = useState(false);

  // Handles letter destruction choices
  function handleDestroy(type) {
    setDestroyChoice(type);
    setAnimating(true);
    // Animation duration matches SVG CSS below (1.9s)
    setTimeout(() => {
      setDestroyed(true);
    }, 1800);
  }

  function handleLock() {
    setLocked(true);
  }
  function handleUnlock() {
    // Optionally show special effects, but for now, simply unlock
    setLocked(false);
  }

  function handleBack() {
    if (onClose) onClose();
  }

  // This dreamy modal matches WhisperToFutureForm in structure and pastel modal style
  return (
    <div className="whisper-form-overlay dreamy-fadein">
      <div className="whisper-form-content dreamy-content-box" style={{ position: "relative" }}>
        {/* Back button */}
        <button
          className="whisper-back-btn dreamy-pill"
          type="button"
          onClick={handleBack}
          aria-label="Back"
          disabled={animating}
        >
          <span style={{
            display: "inline-block",
            marginRight: "7px",
            fontSize: "1.3em",
            verticalAlign: "middle",
            marginTop: "-2px"
          }}>←</span>
          Back
        </button>
        {/* Close X */}
        <button
          className="whisper-close-btn"
          onClick={handleBack}
          aria-label="Close"
          disabled={animating}
        >
          &times;
        </button>
        <h2 className="whisper-form-title">Notes Never Sent</h2>
        <p style={{
          textAlign: "center",
          color: "var(--text-dream)",
          marginTop: "-12px",
          marginBottom: "2.1em",
          fontSize: "1.17em"
        }}>
          Write a secret letter to someone missing from your life.<br />
          <span style={{ color: "#f88abd", fontWeight: 500 }}>It remains locked forever unless you choose to destroy it below.</span>
        </p>

        {!destroyed && (
        <form
          className="whisper-form-fields"
          style={{ opacity: animating ? 0.6 : 1, pointerEvents: animating ? "none" : "auto" }}
          onSubmit={e => e.preventDefault()}
        >
          <label className="whisper-label" htmlFor="unsent-letter">
            To someone I...
            <select
              style={{
                marginLeft: "0.49em",
                fontSize: "1.05em",
                borderRadius: "1.2em",
                padding: "0.13em 0.7em",
                border: "1px solid #f8bbda9e",
                background: "var(--soft-white,#FFFFFF)",
                color: "var(--text-main,#232237)"
              }}
              value={emotion}
              disabled={locked}
              onChange={e => setEmotion(e.target.value)}
            >
              <option value="miss">miss</option>
              <option value="regret">regret</option>
              <option value="admire">admire</option>
              <option value="hate">hate</option>
            </select>
          </label>
          <textarea
            id="unsent-letter"
            className="whisper-textarea"
            placeholder="Type your honest unsent letter..."
            value={letter}
            onChange={e => setLetter(e.target.value)}
            minLength={4}
            rows={6}
            maxLength={1800}
            readOnly={locked}
            required
            style={{
              opacity: locked ? 0.82 : 1,
              background: locked ? "rgba(250,227,217,0.34)" : undefined,
              fontStyle: locked ? "italic" : undefined
            }}
          ></textarea>
          {locked ? (
            <div style={{ textAlign: "center", opacity: destroyed ? 0.3 : 1 }}>
              <button
                type="button"
                tabIndex={0}
                className="dreamy-cta-btn"
                style={{ marginTop: "0.3em"}}
                onClick={handleUnlock}
                disabled={animating}
              >
                Unlock Letter
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.2em" }}>
              <button
                type="button"
                className="dreamy-cta-btn"
                onClick={handleLock}
                style={{ minWidth: 142, margin: "0 auto 0.7em auto" }}
                disabled={animating}
              >
                Lock Again
              </button>
              <span style={{ fontSize: "1.02em", color: "#7c457a", marginBottom: "0.7em" }}>
                If you wish to let go, destroy this note:
              </span>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "2.6em", marginBottom: "1.2em" }}>
                <button
                  type="button"
                  className="dreamy-cta-btn"
                  style={{
                    background: "linear-gradient(90deg,#f8bbda 74%,#f5b29b 92%)",
                    color: "#792522",
                    fontWeight: 600
                  }}
                  onClick={() => handleDestroy("burn")}
                  disabled={animating}
                  aria-label="Burn and let go"
                >
                  <span role="img" aria-label="burn" style={{marginRight:7}}>🔥</span>
                  Burn
                </button>
                <button
                  type="button"
                  className="dreamy-cta-btn"
                  style={{
                    background: "linear-gradient(95deg, #b5ead7 61%, #fae3d9 99%)",
                    color: "#326526",
                    fontWeight: 600
                  }}
                  onClick={() => handleDestroy("plant")}
                  disabled={animating}
                  aria-label="Plant and grow"
                >
                  <span role="img" aria-label="plant" style={{marginRight:7}}>🌱</span>
                  Plant
                </button>
              </div>
              <div style={{ margin: "0 auto", maxWidth: 340, fontSize: "0.99em", color: "#b088d4", opacity: 0.82 }}>
                You cannot undo destruction. Petals will bloom or disappear—your note's memory will fade into the garden of dreams.
              </div>
            </div>
          )}
        </form>
        )}

        {/* Animated overlay for burning or planting, appears on destroy */}
        {!destroyed && destroyChoice && animating && (
          <div
            style={{
              position: "absolute",
              left: 0, top: 0, width: "100%", height: "100%",
              zIndex: 999,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center", justifyContent: "center",
              background: destroyChoice === "burn"
                ? "radial-gradient(circle at 50% 58%,rgba(248,187,218,0.37) 60%,rgba(245,178,155,0.22) 100%)"
                : "radial-gradient(circle at 50% 68%,rgba(181,234,215,0.4) 58%,rgba(250,227,217,0.21) 100%)",
              transition: "background 0.6s"
            }}
          >
            {destroyChoice === "burn" ? (
              <BurnPetalAnimation />
            ) : (
              <PlantPetalAnimation />
            )}
          </div>
        )}

        {destroyed && (
          <DestroyedMessage destroyChoice={destroyChoice} onClose={onClose} />
        )}

        <div className="whisper-form-footer dreamy-caption">
          This note lives in your memory—never to be sent.<br />
          Only you can destroy it, with petals and dreams.
        </div>
      </div>
    </div>
  );
}

// Fiery animated SVG for "Burn" effect
function BurnPetalAnimation() {
  return (
    <div style={{
      minHeight: "160px",
      width: "100%",
      display: "flex", justifyContent: "center", alignItems: "center",
      pointerEvents: "none"
    }}>
      {/* Animated SVG: flaming cherry blossom */}
      <svg width={142} height={142} viewBox="0 0 128 128">
        <g>
          {/* Fire animation (fades in, rises, flickers) */}
          <g style={{
            transformOrigin: "64px 82px",
            animation: "petalFlameRise 1.7s cubic-bezier(.41,.11,.53,1.13)",
            opacity: 0.91
          }}>
          <ellipse cx="64" cy="98" rx="27" ry="18" fill="#ffcaca" opacity="0.46" />
          <path
            d="M64 127 Q77 110 83 97 Q93 74 81 80 Q76 74 79 64 Q72 70 67 64 Q65 67 58 63 Q60 73 52 67 Q55 85 45 96 Q58 117 64 127 Z"
            style={{
              fill: "url(#petalFire)",
              stroke: "#f99982",
              strokeWidth: 1.1,
              opacity: 0.93,
            }}
          />
          <defs>
            <radialGradient id="petalFire" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffa276" stopOpacity="0.98" />
              <stop offset="56%" stopColor="#fae3d9" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#f88abd" stopOpacity="0.81" />
            </radialGradient>
          </defs>
          </g>
        </g>
        {/* Floating petals burning away */}
        <g>
          <PetalFadeFlame />
          <PetalFadeFlame delay={0.38} />
          <PetalFadeFlame delay={0.82} />
        </g>
      </svg>
      {/* Fire animation keyframes */}
      <style>
      {`
      @keyframes petalFlameRise {
        0% { transform: scaleY(0.6) translateY(34px); opacity: 0;}
        54% { opacity: 1;}
        97% { opacity: 1;}
        100% { transform: scaleY(1.01) translateY(0); opacity: 0; }
      }
      @keyframes petalFadeBurn {
        0% { opacity: 1; transform: translateY(0) scale(1);}
        61% { opacity: 0.85;}
        85% { opacity: 0.23;}
        100% { opacity: 0; transform: translateY(-20px) scale(1.23);}
      }
      `}
      </style>
    </div>
  );
}

// Small burning petal, animated upward fade
function PetalFadeFlame({ delay = 0 }) {
  return (
    <ellipse
      cx={64 + Math.round(Math.random() * 20 - 10)}
      cy={74 + Math.round(Math.random() * 10)}
      rx={6 + Math.round(Math.random() * 1)}
      ry={10 + Math.round(Math.random() * 1)}
      fill="#f8bbda"
      opacity="0.87"
      style={{
        animation: `petalFadeBurn 1.2s linear both`,
        animationDelay: `${delay}s`
      }}
    />
  );
}

// Plant growing bloom animation for "Plant" effect: seeded petal grows/leaves sprout
function PlantPetalAnimation() {
  return (
    <div style={{
      minHeight: "160px",
      width: "100%",
      display: "flex", justifyContent: "center", alignItems: "center",
      pointerEvents: "none"
    }}>
      <svg width={142} height={142} viewBox="0 0 128 128">
        {/* Seed falls then petals bloom and leaves sprout-out */}
        {/* Seed */}
        <circle
          cx="64" cy="112"
          r="7.9"
          fill="#B5EAD7"
          opacity="0.82"
          style={{ animation: "seedDrop 0.8s cubic-bezier(.49,.07,.35,.99)" }}
        />
        {/* Sprouting stem and leaves, bloom grows up with B5EAD7 accent */}
        <g style={{
          transformOrigin: "64px 112px",
          animation: "sproutGrow 1.7s cubic-bezier(.50,0,.23,1.18)",
          opacity: 0.95
        }}>
        <rect x="62.2" y="101" width="3.6" height="18" fill="#8ec7ab" rx="1.6"/>
        <ellipse cx={54} cy={99} rx={6} ry={13} fill="#b5ead7" opacity="0.53"/>
        <ellipse cx={74} cy={99} rx={7} ry={13} fill="#b5ead7" opacity="0.41"/>
        {/* Petal blossom */}
        <ellipse cx={64} cy={82} rx={22} ry={14} fill="#f8bbda" opacity="0.73"/>
        <ellipse cx={61} cy={86} rx={12} ry={8.3} fill="#fae3d9" opacity="0.53"/>
        </g>
      </svg>
      <style>
        {`
        @keyframes sproutGrow {
          0% { transform: scaleY(0) translateY(55px); opacity:0;}
          26% { opacity:1;}
          100% { transform: scaleY(1.02) translateY(0); opacity: 1;}
        }
        @keyframes seedDrop {
          0% { transform: translateY(-33px) scale(0.33); opacity: 0;}
          47% { transform: translateY(0) scale(1.05); opacity: 1;}
          100% { opacity: 1;}
        }
        `}
      </style>
    </div>
  );
}

// Final destroyed message overlay
function DestroyedMessage({ destroyChoice, onClose }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      minHeight: 180, marginTop: 12, marginBottom: 20
    }}>
      {destroyChoice === "burn" ? (
        <>
          <span style={{
            fontSize: "2.25em", marginBottom: "0.2em"
          }}>🔥</span>
          <div style={{
            fontSize: "1.33em", color: "#d15e59", marginBottom: "0.99em", textAlign: "center"
          }}>
            Your note has burned into petals and vanished in a warm breeze.
          </div>
        </>
      ) : (
        <>
          <span style={{
            fontSize: "2.25em", marginBottom: "0.2em"
          }}>🌸</span>
          <div style={{
            fontSize: "1.28em", color: "#4c8570", marginBottom: "0.89em", textAlign: "center"
          }}>
            Your note has been planted. One day, petals may bloom again.
          </div>
        </>
      )}
      <button
        type="button"
        className="dreamy-cta-btn"
        style={{ minWidth: 170 }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export default NotesNeverSentForm;
