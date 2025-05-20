import React, { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

const CARD_WIDTH = 500;
const CARD_HEIGHT = 500;
const PIN_HEIGHT = 120;
const BUTTON_HEIGHT = 52;
const ICON_SIZE = 34;
const ICON_GAP = 16;

function RippleCardAttached({ hovered, pin }) {
  // Ripple color based on pin, fallback to white
  const rippleColor = pin?.lineColorPrimary || "#fff";
  // Reference for interval control
  const rippleContainerRef = useRef(null);
  const intervalRef = useRef(null);

  // Inject CSS keyframes only once
  useEffect(() => {
    if (!document.getElementById("ripple-water-keyframes")) {
      const style = document.createElement("style");
      style.id = "ripple-water-keyframes";
      style.innerHTML = `
        @keyframes ripple-water {
          0% {
            opacity: 0.34;
            transform: translate(-50%, -50%) scale(0.2);
          }
          40% {
            opacity: 0.18;
          }
          85% {
            opacity: 0.08;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.7);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Ongoing ripple effect: add new ripples at intervals when hovered, clear on unhover
  useEffect(() => {
    const container = rippleContainerRef.current;
    if (!container) return;
    // Remove all existing ripples on state change
    container.innerHTML = "";
    if (hovered) {
      intervalRef.current = setInterval(() => {
        const ripple = document.createElement("div");
        ripple.style.position = "absolute";
        ripple.style.left = "50%";
        ripple.style.top = "50%";
        ripple.style.width = "148px";
        ripple.style.height = "148px";
        ripple.style.borderRadius = "50%";
        ripple.style.border = `3.5px solid ${rippleColor}`;
        ripple.style.opacity = "0.34";
        ripple.style.pointerEvents = "none";
        ripple.style.filter = "blur(0.5px)";
        ripple.style.transform = "translate(-50%, -50%) scale(0.2)";
        ripple.style.animation = "ripple-water 1.45s cubic-bezier(.33,1.32,.68,1) forwards";
        ripple.style.zIndex = 2;
        container.appendChild(ripple);

        // Remove ripple after animation completes
        setTimeout(() => {
          if (container.contains(ripple)) container.removeChild(ripple);
        }, 1460);
      }, 320);

      // Add a first ripple immediately for instant response
      const firstRipple = document.createElement("div");
      firstRipple.style.position = "absolute";
      firstRipple.style.left = "50%";
      firstRipple.style.top = "50%";
      firstRipple.style.width = "148px";
      firstRipple.style.height = "148px";
      firstRipple.style.borderRadius = "50%";
      firstRipple.style.border = `3.5px solid ${rippleColor}`;
      firstRipple.style.opacity = "0.34";
      firstRipple.style.pointerEvents = "none";
      firstRipple.style.filter = "blur(0.5px)";
      firstRipple.style.transform = "translate(-50%, -50%) scale(0.2)";
      firstRipple.style.animation = "ripple-water 1.45s cubic-bezier(.33,1.32,.68,1) forwards";
      firstRipple.style.zIndex = 2;
      container.appendChild(firstRipple);

      setTimeout(() => {
        if (container.contains(firstRipple)) container.removeChild(firstRipple);
      }, 1460);

    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      container.innerHTML = "";
    }
    // Cleanup on unmount or when hovered changes
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (container) container.innerHTML = "";
    };
  }, [hovered, rippleColor]);

  // The parent is positioned at the tip of the pin: adjust PIN_HEIGHT and BUTTON_HEIGHT if needed
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        // This ensures the ripple is centered at the pin tip (card center - PIN_HEIGHT)
        top: `calc(73% - ${PIN_HEIGHT}px)`,
        width: 0,
        height: 0,
        zIndex: 41,
        pointerEvents: "none",
      }}
    >
      {/* Ripple container (ripples are absolutely positioned inside) */}
      <div ref={rippleContainerRef} style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0 }} />
      {/* The impact drop */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 18,
            height: 18,
            background: rippleColor,
            borderRadius: "50%",
            opacity: 0.47,
            filter: "blur(1.6px)",
            transform: "translate(-50%, -50%) scale(1)",
            pointerEvents: "none",
            zIndex: 3,
            transition: "opacity 0.18s",
          }}
        />
      )}
    </div>
  );
}

function PinMarker({ hovered, pin }) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (hovered) setHeight(PIN_HEIGHT);
    else setHeight(0);
  }, [hovered]);
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 0,
      height: 0,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 50,
    }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "4px",
          height: `${height}px`,
          background: pin?.lineColorPrimary || "#fff",
          border: `1px solid ${pin?.lineColorSecondary || "#fff9"}`,
          borderRadius: "999px",
          boxShadow: `0 0 16px 2px ${(pin?.lineColorPrimary || "#fff")}44`,
          transform: "translate(-50%, -100%)",
          zIndex: 50,
          transition: "height 0.45s cubic-bezier(.45,0,.55,1)",
        }}
      />
    </div>
  );
}

function FloatingIconsHorizontal({ hovered, techIcons = [], pin }) {
  if (!hovered || techIcons.length === 0) return null;
  const totalWidth = techIcons.length * ICON_SIZE + (techIcons.length - 1) * ICON_GAP;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: `calc(47% - ${PIN_HEIGHT + BUTTON_HEIGHT}px)`,
        transform: `translate(-50%, -100%)`,
        display: "flex",
        gap: `${ICON_GAP}px`,
        zIndex: 46,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.38s cubic-bezier(.6,-0.04,.58,1.2)",
      }}
    >
      {techIcons.map((icon, i) => (
        <div
          key={i}
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.1rem",
            filter: "drop-shadow(0 3px 14px rgba(0,0,0,0.45))",
            color: pin?.lineColorPrimary || "#fff",
            transform: `scale(${hovered ? 1.15 : 0.6})`,
            opacity: hovered ? 1 : 0,
            transition: "transform 0.38s cubic-bezier(.6,-0.04,.58,1.2), opacity 0.38s cubic-bezier(.6,-0.04,.58,1.2)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

function ViewProjectButton({ hovered, tilt, style, onClick, children }) {
  const startRotateAt = 55;
  const maxTilt = 75;
  const progress = tilt > startRotateAt ? (tilt - startRotateAt) / (maxTilt - startRotateAt) : 0;
  const buttonRotation = tilt - progress * tilt;
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        opacity: hovered ? 1 : 0,
        pointerEvents: hovered ? "auto" : "none",
        transform: `translate(-50%, 0) rotateX(${-buttonRotation}deg) scale(${hovered ? 1 : 0.8})`,
        transition: "transform 0.36s cubic-bezier(.45,0,.55,1), background .23s, border .23s, box-shadow .23s, opacity 0.25s cubic-bezier(.4,0,.2,1)",
      }}
      tabIndex={hovered ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
}

const PinContainer = ({ children, cardBody, hovered, setHovered, tilt }) => {
  const wrapperStyle = {
    position: "relative",
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    zIndex: 30,
    overflow: "visible",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };
  const perspectiveStyle = {
    perspective: "1000px",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "50%",
    bottom: "0",
    transform: "translateX(-50%)",
  };
  const contentWrapperStyle = {
    transformOrigin: "50% 50%",
    transform: `rotateX(${tilt}deg) scale(${hovered ? 0.94 : 1})`,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: cardBody.borderRadius,
    border: `${cardBody.borderWidth || 4}px solid ${
      hovered ? cardBody.borderHoverColor : cardBody.borderColor
    }`,
    backgroundColor: cardBody.backgroundColor,
    transition: "transform 0.45s cubic-bezier(.45,0,.55,1), border-color 0.45s cubic-bezier(.45,0,.55,1)",
    boxSizing: "border-box",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
  };
  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={perspectiveStyle}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  );
};

export default function Animated3DPinCardFramer(props) {
  const [hovered, setHovered] = useState(false);
  const tilt = hovered ? 75 : 0;
  const contentStyle = {
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
  };
  const titleStyle = {
    ...props.title.font,
    margin: 0,
    color: props.title.color || "#e9e9e9",
    fontWeight: props.title.font.fontWeight || "bold",
    fontSize: "1.44rem",
    lineHeight: 1.17,
    wordBreak: "break-word",
  };
  const subtitleStyle = {
    ...props.subtitle.font,
    margin: "0.55rem 0 0.7rem 0",
    color: props.subtitle.color || "rgba(233,233,233,0.7)",
    fontWeight: props.subtitle.font.fontWeight || "normal",
    fontSize: "1.08rem",
    lineHeight: 1.21,
    wordBreak: "break-word",
    maxHeight: "3.5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  };
  const imageBoxStyle = {
    width: "100%",
    height: "190px",
    borderRadius: props.image.borderRadius,
    marginBottom: "0.9rem",
    backgroundImage: props.image.image?.src && `url(${props.image.image.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
  };
  const buttonStyle = {
    width: "160px",
    height: `${BUTTON_HEIGHT}px`,
    borderRadius: "9999px",
    backgroundColor: props.pin.backgroundColor,
    border: `2.5px solid ${props.pin.textColor}`,
    color: props.pin.textColor,
    fontSize: props.pin.font.fontSize,
    fontWeight: props.pin.font.fontWeight || "bold",
    letterSpacing: ".02em",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: `0 2px 18px 0 ${props.pin.textColor}22`,
    outline: "none",
    transition: "background .23s,border .23s,box-shadow .23s",
    zIndex: 50,
    userSelect: "none",
    backgroundClip: "padding-box",
    position: "absolute",
    left: "50%",
    top: `calc(44% - ${PIN_HEIGHT + BUTTON_HEIGHT / 2}px)`,
    transformOrigin: "bottom center",
  };
  return (
    <LazyMotion strict features={domAnimation}>
      <div style={{ position: "relative", width: CARD_WIDTH, height: CARD_HEIGHT }}>
        <PinMarker hovered={hovered} pin={props.pin} />
        <FloatingIconsHorizontal hovered={hovered} techIcons={props.techIcons} pin={props.pin} />
        <ViewProjectButton
          hovered={hovered}
          tilt={tilt}
          style={buttonStyle}
          onClick={props.onPinClick}
        >
          {props.pin.title}
        </ViewProjectButton>
        <PinContainer cardBody={props.cardBody} hovered={hovered} setHovered={setHovered} tilt={tilt}>
          <div style={contentStyle}>
            <div style={imageBoxStyle} />
            <h3 style={titleStyle}>{props.title.text}</h3>
            <p style={subtitleStyle}>{props.subtitle.text}</p>
            <RippleCardAttached hovered={hovered} pin={props.pin} />
          </div>
        </PinContainer>
      </div>
    </LazyMotion>
  );
}
