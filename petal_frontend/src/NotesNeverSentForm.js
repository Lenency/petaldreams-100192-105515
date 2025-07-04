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

/**
 * BurningLetterAnimation: visually "burns away" a letter with SVG/CSS.
 * Used when "Burn" is selected in NotesNeverSentForm. Self-contained, does not affect other UI.
 */
// PUBLIC_INTERFACE
function BurningLetterAnimation() {
  // Show burning effect with SVG mask, animated flames, and burn-away paper.
  return (
    <div
      style={{
        width: 200,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        background: "none",
        userSelect: "none",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={180}
        height={180}
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="paperGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#faf6fa" />
            <stop offset="80%" stopColor="#fae3d9" />
            <stop offset="100%" stopColor="#f5b29b" />
          </linearGradient>
          <clipPath id="burnClip">
            {/* Animate mask up to gradually "burn" the paper */}
            <rect
              id="burn-rect"
              x="0"
              y="0"
              width="200"
              height="200"
              style={{
                animation:
                  "burnAwayMask 1.6s 1 cubic-bezier(.48,.03,.86,1) forwards",
              }}
            />
          </clipPath>
          <filter id="paperBurn" x="0" y="0" width="200" height="200">
            <feTurbulence
              id="turb"
              type="fractalNoise"
              baseFrequency="0.09 0.23"
              numOctaves="1"
              seed="6"
              result="turb"
            />
            <feDisplacementMap in2="turb" in="SourceGraphic" scale="9" />
          </filter>
        </defs>
        {/* Paper letter */}
        <g clipPath="url(#burnClip)">
          <rect
            x="18"
            y="40"
            width="164"
            height="100"
            rx="20"
            fill="url(#paperGradient)"
            filter="url(#paperBurn)"
            style={{
              stroke: "#f8bbda",
              strokeWidth: 3,
              transition: "fill .4s",
            }}
          />
          {/* Fold lines, address, text lines */}
          <rect
            x="28"
            y="50"
            width="60"
            height="14"
            rx="4"
            fill="#e9cae4"
            opacity="0.62"
          />
          <rect
            x="28"
            y="70"
            width="124"
            height="9"
            rx="6"
            fill="#eccfda"
            opacity="0.24"
          />
          <rect
            x="28"
            y="84"
            width="124"
            height="9"
            rx="6"
            fill="#eccfda"
            opacity="0.17"
          />
          <rect
            x="28"
            y="98"
            width="110"
            height="8"
            rx="5"
            fill="#eec4d6"
            opacity="0.13"
          />
          <rect
            x="28"
            y="110"
            width="80"
            height="8"
            rx="4"
            fill="#eec4d6"
            opacity="0.18"
          />
          {/* Bottom folded triangle for classic letter look */}
          <polygon
            points="100,130 44,140 156,140"
            fill="#fde8e5"
            opacity="0.77"
          />
        </g>
        {/* Burn edge with red/orange glow, animated upward */}
        <g>
          <ellipse
            id="burn-glow"
            cx="100"
            cy="132"
            rx="68"
            ry="10"
            fill="url(#burnGradient)"
            opacity="0.82"
            style={{
              filter: "blur(7px)",
              animation: "burnGlowRise 1.6s forwards cubic-bezier(.46,.03,.6,1)",
            }}
          />
          <defs>
            <radialGradient id="burnGradient" cx="50%" cy="50%" r="100%">
              <stop offset="0%" stopColor="#ffded6" stopOpacity="0.82" />
              <stop offset="75%" stopColor="#ff9444" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#f88abd" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>
        {/* Flickering flames at burn edge */}
        <g className="burn-flames">
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d={
                `M${60 + i * 16},130 ` +
                "Q" +
                (65 + i * 16) +
                "," +
                (120 + (Math.random() * 11 - 4)) +
                " " +
                (70 + i * 16) +
                ",130"
              }
              fill="none"
              stroke="#fb8d4a"
              strokeWidth={3.7 - 1.2 * (i % 2)}
              opacity={0.93 - 0.11 * i}
              style={{
                filter: "blur(0.9px)",
                strokeLinejoin: "round",
                strokeLinecap: "round",
                animation: `flameFlicker .5s ${i * 0.09}s infinite alternate`,
              }}
            />
          ))}
        </g>
        {/* Burned paper edges - brown fade, animates up */}
        <ellipse
          id="burnd"
          cx="100"
          cy="136"
          rx="66"
          ry="7"
          fill="#eebaa8"
          opacity="0.25"
          style={{
            filter: "blur(2px)",
            animation: "burnGlowRise 1.6s forwards",
          }}
        />
      </svg>
      {/* Animation keyframes */}
      <style>
        {`
        @keyframes burnAwayMask {
          0% { height: 200px;}
          87% { height: 200px;}
          90% { height: 89px;}
          100% { height: 0px;}
        }
        @keyframes burnGlowRise {
          0% { transform: translateY(0);}
          82% { opacity:1; }
          95% { opacity:0.6; }
          100% { transform: translateY(-110px); opacity:0; }
        }
        @keyframes flameFlicker {
          0% { stroke: #fb8d4a;}
          44% { stroke: #ffde99;}
          75% { stroke: #ffad9a;}
          100% { stroke: #d94a0a;}
        }
        `}
      </style>
    </div>
  );
}

// Fiery animated SVG for "Burn" effect
function BurnPetalAnimation() {
  // For backward compatibility, provide previous look as fallback,
  // but for "Burn" destruction, use BurningLetterAnimation.
  return <BurningLetterAnimation />;
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
