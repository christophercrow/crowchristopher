// components/framer/3dpin-card.jsx

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

// --- Constants ---
const CARD_WIDTH = 450;
const CARD_HEIGHT = 600;
const PIN_HEIGHT = 120;
const BUTTON_HEIGHT = 52;
const ICON_SIZE = 34;
const ICON_GAP = 16;
const RIPPLE_LIFESPAN = 1460; // ms
const RIPPLE_INTERVAL = 320;  // ms

// --- Add Ripple Animation Keyframes Once ---
const addRippleKeyframes = () => {
  if (!document.getElementById("ripple-water-keyframes")) {
    const style = document.createElement("style");
    style.id = "ripple-water-keyframes";
    style.innerHTML = `
      @keyframes ripple-water {
        0% {
          opacity: 0.34;
          transform: translate(-50%, -50%) scale(0.2);
        }
        40% { opacity: 0.18; }
        85% { opacity: 0.08; }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(3.7);
        }
      }
    `;
    document.head.appendChild(style);
  }
};
addRippleKeyframes();

// --- Ripple Effect at Pin Tip ---
const RippleCardAttached = memo(function RippleCardAttached({ hovered, pin }) {
  const [ripples, setRipples] = useState([]);
  const rippleColor = pin?.lineColorPrimary || "#fff";
  const intervalRef = useRef();

  // Start/stop ripple interval
  useEffect(() => {
    if (!hovered) {
      setRipples([]);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    // Add first ripple immediately
    setRipples([{ id: Date.now() }]);
    intervalRef.current = setInterval(() => {
      setRipples((old) => [...old, { id: Date.now() }]);
    }, RIPPLE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRipples([]);
    };
  }, [hovered]);

  // Auto-remove ripples after their lifespan
  useEffect(() => {
    if (!ripples.length) return;
    const timeout = setTimeout(() => {
      setRipples((old) => old.slice(1));
    }, RIPPLE_LIFESPAN / 1.1);
    return () => clearTimeout(timeout);
  }, [ripples]);

  return (
    <div style={styles.rippleWrapper}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            ...styles.ripple,
            border: `3.5px solid ${rippleColor}`,
            animation: "ripple-water 1.45s cubic-bezier(.33,1.32,.68,1) forwards",
          }}
        />
      ))}
      {hovered && (
        <div
          style={{
            ...styles.rippleDot,
            background: rippleColor,
          }}
        />
      )}
    </div>
  );
});

// --- Pin Marker (vertical bar) ---
const PinMarker = memo(function PinMarker({ hovered, pin }) {
  const height = hovered ? PIN_HEIGHT : 0;
  return (
    <div style={styles.pinMarkerWrap}>
      <div
        style={{
          ...styles.pinMarker,
          height: `${height}px`,
          background: pin?.lineColorPrimary || "#fff",
          border: `1px solid ${pin?.lineColorSecondary || "#fff9"}`,
          boxShadow: `0 0 16px 2px ${(pin?.lineColorPrimary || "#fff")}44`,
        }}
      />
    </div>
  );
});

// --- Floating Tech Icons ---
const FloatingIconsHorizontal = memo(function FloatingIconsHorizontal({ hovered, techIcons = [], pin }) {
  if (!hovered || techIcons.length === 0) return null;
  return (
    <div style={styles.iconsContainer}>
      {techIcons.map((icon, i) => (
        <div
          key={i}
          style={{
            ...styles.icon,
            color: pin?.lineColorPrimary || "#fff",
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
});

// --- Project Button (only clickable thing) ---
const ViewProjectButton = memo(function ViewProjectButton({ hovered, style, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        opacity: hovered ? 1 : 0,
        pointerEvents: hovered ? "auto" : "none",
        transform: `translate(-50%, 0) scale(${hovered ? 1 : 0.95})`,
        outline: hovered ? "2px solid #47ffe9" : "2px solid transparent",
      }}
      tabIndex={0}
      type="button"
    >
      {children}
    </button>
  );
});

// --- PinContainer (card body and tilt) ---
const PinContainer = memo(function PinContainer({ children, cardBody, hovered, tilt }) {
  return (
    <div style={styles.pinContainerWrap}>
      <div style={styles.pinContainerPerspective}>
        <div
          style={{
            ...styles.pinContainerContent,
            borderRadius: cardBody.borderRadius,
            border: `${cardBody.borderWidth || 4}px solid ${
              hovered ? cardBody.borderHoverColor : cardBody.borderColor
            }`,
            backgroundColor: cardBody.backgroundColor,
            transform: `rotateX(${tilt}deg) scale(${hovered ? 0.94 : 1})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

// --- Main Card ---
export default function Animated3DPinCardFramer(props) {
  const [hovered, setHovered] = useState(false);
  const tilt = hovered ? 75 : 0;

  // Styles moved out of render for performance
  const contentStyle = styles.content;
  const titleStyle = {
    ...props.title.font,
    ...styles.title,
    color: props.title.color || "#e9e9e9",
    fontWeight: props.title.font.fontWeight || "bold",
  };
  const subtitleStyle = {
    ...props.subtitle.font,
    ...styles.subtitle,
    color: props.subtitle.color || "rgba(233,233,233,0.7)",
    fontWeight: props.subtitle.font.fontWeight || "normal",
  };
  const buttonStyle = {
    ...styles.button,
    backgroundColor: props.pin.backgroundColor,
    border: `2.5px solid ${props.pin.textColor}`,
    color: props.pin.textColor,
    fontSize: props.pin.font.fontSize,
    fontWeight: props.pin.font.fontWeight || "bold",
  };

  return (
    <LazyMotion strict features={domAnimation}>
      <div
        style={styles.outer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <PinMarker hovered={hovered} pin={props.pin} />
        <FloatingIconsHorizontal hovered={hovered} techIcons={props.techIcons} pin={props.pin} />
        <ViewProjectButton
          hovered={hovered}
          style={buttonStyle}
          onClick={props.onPinClick}
        >
          {props.pin.title}
        </ViewProjectButton>
        <PinContainer cardBody={props.cardBody} hovered={hovered} tilt={tilt}>
          <div style={contentStyle}>
            <h3 style={titleStyle}>{props.title.text}</h3>
            <p style={subtitleStyle}>{props.subtitle.text}</p>
            <RippleCardAttached hovered={hovered} pin={props.pin} />
          </div>
        </PinContainer>
      </div>
    </LazyMotion>
  );
}

// --- Styles ---
const styles = {
  outer: {
    position: "relative",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    opacity: 0.9,
    pointerEvents: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    padding: "28px 24px 0 24px",
    gap: "1.1rem",
    color: "rgba(233, 233, 233, 0.95)",
    overflow: "hidden",
    position: "relative",
    pointerEvents: "none",
  },
  title: {
    margin: 0,
    fontSize: "1.44rem",
    lineHeight: 1.17,
    wordBreak: "break-word",
    pointerEvents: "none",
  },
  subtitle: {
    margin: "0.55rem 0 0.7rem 0",
    fontSize: "1.08rem",
    lineHeight: 1.21,
    wordBreak: "break-word",
    maxHeight: "3.5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    pointerEvents: "none",
  },
  button: {
    width: "160px",
    height: `${BUTTON_HEIGHT}px`,
    borderRadius: "9999px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: `0 2px 18px 0 #47ffe922`,
    outline: "none",
    transition: "background .23s,border .23s,box-shadow .23s",
    zIndex: 50,
    userSelect: "none",
    backgroundClip: "padding-box",
    position: "absolute",
    left: "50%",
    top: `calc(44% - 120px - 26px)`,
    transformOrigin: "bottom center",
    pointerEvents: "auto",
  },
  rippleWrapper: {
    position: "absolute",
    left: "50%",
    top: `calc(73% - ${PIN_HEIGHT}px)`,
    width: 0,
    height: 0,
    zIndex: 41,
    pointerEvents: "none",
  },
  ripple: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "148px",
    height: "148px",
    borderRadius: "50%",
    opacity: 0.34,
    pointerEvents: "none",
    filter: "blur(0.5px)",
    transform: "translate(-50%, -50%) scale(0.2)",
    zIndex: 2,
  },
  rippleDot: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 18,
    height: 18,
    borderRadius: "50%",
    opacity: 0.47,
    filter: "blur(1.6px)",
    transform: "translate(-50%, -50%) scale(1)",
    pointerEvents: "none",
    zIndex: 3,
    transition: "opacity 0.18s",
  },
  pinMarkerWrap: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 0,
    height: 0,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 50,
  },
  pinMarker: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "4px",
    borderRadius: "999px",
    transform: "translate(-50%, -100%)",
    zIndex: 50,
    transition: "height 0.45s cubic-bezier(.45,0,.55,1)",
  },
  iconsContainer: {
    position: "absolute",
    left: "50%",
    top: `calc(47% - ${PIN_HEIGHT + BUTTON_HEIGHT}px)`,
    transform: `translate(-50%, -100%)`,
    display: "flex",
    gap: `${ICON_GAP}px`,
    zIndex: 46,
    pointerEvents: "none",
    opacity: 1,
    transition: "opacity 0.38s cubic-bezier(.6,-0.04,.58,1.2)",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.1rem",
    filter: "drop-shadow(0 3px 14px rgba(0,0,0,0.45))",
    transform: "scale(1.15)",
    opacity: 1,
    transition: "transform 0.38s cubic-bezier(.6,-0.04,.58,1.2), opacity 0.38s cubic-bezier(.6,-0.04,.58,1.2)",
    pointerEvents: "none",
  },
  pinContainerWrap: {
    position: "relative",
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    top: "-15%",
    zIndex: 30,
    overflow: "visible",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    pointerEvents: "none",
  },
  pinContainerPerspective: {
    perspective: "1000px",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "50%",
    bottom: "0",
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },
  pinContainerContent: {
    transformOrigin: "48% 69%",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.45s cubic-bezier(.45,0,.55,1), border-color 0.45s cubic-bezier(.45,0,.55,1)",
    boxSizing: "border-box",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
    pointerEvents: "none",
  },
};
