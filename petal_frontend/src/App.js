import React, { useEffect, useRef, useState } from "react";
import "./App.css";

/**
 * AnimatedPetalsBackground: Layered, animated pastel gradient background with
 * drifting petals and sparkles. Includes scroll-based parallax and blur.
 */
function AnimatedPetalsBackground({ theme }) {
  const bgRef = useRef(null);

  useEffect(() => {
    // Scroll-based parallax and blur
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (bgRef.current) {
        // Parallax
        bgRef.current.style.transform = `translateY(${-scrolled * 0.15}px)`;
        // Blur based on scroll
        bgRef.current.style.filter =
          scrolled > 30 ? `blur(${Math.min(8, scrolled * 0.015)}px)` : "none";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adjusted gradients for light/dark mode
  const gradients =
    theme === "dark"
      ? [
          "linear-gradient(135deg, #2C2D31 0%, #4A5568 100%)",
          "radial-gradient(circle at 60% 30%, #5fbbc1 0%, #30163f 80%)",
        ]
      : [
          "linear-gradient(135deg, #F8BBDA 0%, #B5EAD7 100%)",
          "radial-gradient(circle at 60% 30%, #FAE3D9 0%, #B5EAD7 80%)",
        ];

  // Generate drifting cherry blossom flowers using SVG
  const petalCount = 12;
  const petalEls = [];
  for (let i = 0; i < petalCount; i++) {
    const time = 16 + Math.random() * 12; // seconds
    const delay = -Math.random() * time;
    const left = 10 + Math.random() * 80;
    const size = 42 + Math.random() * 36;
    const rotation = Math.random() * 360;
    const opacity = 0.72 + Math.random() * 0.19;
    const pastelPink = theme === "dark" ? "#fbe6fa" : "#F8BBDA";
    const pastelWhite = theme === "dark" ? "#cdb0dc" : "#FEFCFC";
    // Render SVG for sakura flower
    petalEls.push(
      <div
        key={`petal-${i}`}
        className="petal cherry-sakura"
        style={{
          left: `${left}%`,
          width: size,
          height: size,
          opacity,
          animationDuration: `${time}s`,
          animationDelay: `${delay}s`,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          style={{ display: "block" }}
        >
          <g>
            <ellipse
              cx="32"
              cy="15"
              rx="13"
              ry="18"
              fill={pastelPink}
              opacity="0.84"
              />
            <ellipse
              cx="52"
              cy="33"
              rx="12"
              ry="18"
              fill={pastelPink}
              opacity="0.84"
              transform="rotate(55 52 33)"
            />
            <ellipse
              cx="32"
              cy="56"
              rx="13"
              ry="18"
              fill={pastelPink}
              opacity="0.84"
              />
            <ellipse
              cx="12"
              cy="33"
              rx="12"
              ry="18"
              fill={pastelPink}
              opacity="0.84"
              transform="rotate(-55 12 33)"
            />
            <ellipse
              cx="32"
              cy="35"
              rx="11"
              ry="14"
              fill={pastelPink}
              opacity="0.96"
              />
            <circle
              cx="32"
              cy="33"
              r="7.5"
              fill={pastelWhite}
              opacity="0.88"
            />
            <circle cx="29" cy="29" r="1.1" fill="#efb2c0" />
            <circle cx="35" cy="29" r="1.1" fill="#edbbd8" />
            <circle cx="33" cy="33" r="1.1" fill="#f3e5ef" />
            <circle cx="30" cy="36" r="0.8" fill="#edbbd8" />
            <circle cx="34" cy="36" r="0.7" fill="#efb2c0" />
          </g>
        </svg>
      </div>
    );
  }

  // Generate floating soft green leaves with animation mirroring petals
  const leafCount = 7;
  const leafEls = [];
  for (let i = 0; i < leafCount; i++) {
    const time = 15 + Math.random() * 11;
    const delay = -Math.random() * time;
    const left = 8 + Math.random() * 84;
    const size = 32 + Math.random() * 22;
    const rotation = Math.random() * 360;
    const opacity = 0.48 + Math.random() * 0.22;
    const pastelGreen = theme === "dark" ? "#7beccf" : "#B5EAD7";
    const accentGreen = theme === "dark" ? "#28cc8e" : "#83d19c";
    // Render SVG leaf
    leafEls.push(
      <div
        key={`leaf-${i}`}
        className="leaf floating-leaf"
        style={{
          left: `${left}%`,
          width: size,
          height: size,
          opacity,
          animationDuration: `${time}s`,
          animationDelay: `${delay}s`,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 38 50"
          style={{ display: "block" }}
          fill="none"
        >
          <g>
            <path
              d="M19 49 Q30 40 36 26 Q37 7 19 1 Q1 7 2 26 Q8 40 19 49 Z"
              fill={pastelGreen}
              opacity="0.82"
              style={{ filter: "blur(0.2px)" }}
            />
            <path
              d="M19 49 Q30 40 36 26 Q37 7 19 1"
              stroke={accentGreen}
              strokeWidth="1"
              opacity="0.46"
              fill="none"
            />
            <path
              d="M19 49 Q8 40 2 26 Q1 7 19 1"
              stroke={accentGreen}
              strokeWidth="0.8"
              opacity="0.36"
              fill="none"
            />
            <line
              x1="19" y1="49"
              x2="19" y2="2.6"
              stroke={accentGreen}
              strokeWidth="0.6"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Drifting sparkles
  const sparkleCount = 13;
  const sparkleEls = [];
  for (let i = 0; i < sparkleCount; i++) {
    const size = 8 + Math.random() * 16;
    const left = Math.random() * 97;
    const top = Math.random() * 95;
    const fade = 3 + Math.random() * 5;
    sparkleEls.push(
      <div
        key={i}
        className="sparkle"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: size,
          height: size,
          opacity: 0.32 + Math.random() * 0.22,
          animationDuration: `${fade}s`,
          background:
            theme === "dark"
              ? "rgba(224,255,255,0.42)"
              : `rgba(250, 233, 239, 0.90)`,
        }}
      />
    );
  }

  return (
    <div className="animated-bg" ref={bgRef}>
      <div
        className="bg-gradient"
        style={{
          background: gradients[0],
        }}
      ></div>
      <div
        className="bg-gradient2"
        style={{
          background: gradients[1],
        }}
      ></div>
      <div className="petal-layer">{petalEls}</div>
      <div className="leaf-layer">{leafEls}</div>
      <div className="sparkle-layer">{sparkleEls}</div>
      {/* Soft overlay for glow/fade */}
      <div className="soft-overlay" />
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ThemeToggle: Stylized floating theme mode button with spring animation.
 */
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className="theme-toggle dreamy-accent"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙 Dreamy dark" : "☀️ Soft light"}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main content section with intro, title, and accent call to action.
 */
function Content({ theme }) {
  return (
    <main className="main-content">
      <div className="content-inner">
        <h1 className="petal-title">petal</h1>
        <h2 className="petal-subtitle">
          A whimsical world of gentle color, drifting petals, and digital calm.
        </h2>
        <p className="desc">
          Dream, write, journal, or simply breathe—Petal’s relaxing animated background soothes your screen, day or night.<br />
          <span className="mobile-hide">Scroll to explore the magic below.</span>
        </p>
        <a href="#try" className="dreamy-cta-btn">
          Try the Demo
        </a>
      </div>
    </main>
  );
}

/**
 * PUBLIC_INTERFACE
 * Footer with minimal, soft info.
 */
function Footer() {
  return (
    <footer className="footer">
      <span>
        &copy; 2024 Petal &mdash; pastel dreams crafted with love 🌸
      </span>
    </footer>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  // Font loading (Google Fonts CDN for Poppins/Quicksand)
  useEffect(() => {
    const id = "petal-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Poppins:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Set theme [applies theme to document element]
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <div className={`App dreamy-root ${theme}`}>
      <AnimatedPetalsBackground theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Content theme={theme} />
      <Footer />
    </div>
  );
}

export default App;
