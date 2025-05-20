import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// You can pass techIcons as array: [<SiDocker />, <SiNginx />, ...]
export default function Animated3DPinCardFramer(props) {
  const [hovered, setHovered] = useState(false);

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "32px", // <-- More padding for spaciousness
    gap: "1.2rem",
    color: "rgba(233, 233, 233, 0.95)",
    width: "100%",
    minWidth: "19rem",
    height: "fit-content",
  };

  const titleStyle = {
    ...props.title.font,
    marginTop: props.title.marginTop,
    marginBottom: props.title.marginBottom,
    color: props.title.color || "#e9e9e9",
    fontWeight: props.title.font.fontWeight || "bold",
  };

  const subtitleStyle = {
    ...props.subtitle.font,
    marginTop: props.subtitle.marginTop,
    marginBottom: props.subtitle.marginBottom,
    color: props.subtitle.color || "rgba(233,233,233,0.7)",
    fontWeight: props.subtitle.font.fontWeight || "normal",
  };

  const imageBoxStyle = {
    width: "100%",
    height: "220px",
    borderRadius: props.image.borderRadius,
    marginTop: props.image.marginTop,
    backgroundImage: props.image.image?.src
      ? `url(${props.image.image.src})`
      : "url(https://images.unsplash.com/photo-1488905373347-189b5464fd44?q=80&w=2244&auto=format&fit=crop&ixlib=rb-4.0.3)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <LazyMotion strict features={domAnimation}>
      <PinContainer {...props} hovered={hovered} setHovered={setHovered}>
        <div style={contentStyle}>
          {props.icon && (
            <div style={{ marginBottom: "0.8rem", textAlign: "center" }}>
              {props.icon}
            </div>
          )}
          <h3 style={titleStyle}>{props.title.text}</h3>
          <p style={subtitleStyle}>{props.subtitle.text}</p>
          <div style={imageBoxStyle} />
        </div>
        {/* Tech icons + Pin Marker (only render if techIconsAbovePin=true) */}
        <PinMarkerAndOrbit
          hovered={hovered}
          pin={props.pin}
          onPinClick={props.onPinClick}
          techIcons={props.techIcons}
        />
      </PinContainer>
    </LazyMotion>
  );
}

const PinContainer = ({ children, cardBody, hovered, setHovered }) => {
  // 3D effect stays
  const transform = hovered
    ? "translate(-50%,-50%) rotateX(35deg) scale(0.94)"
    : "translate(-50%,-50%) rotateX(0deg) scale(1)";

  const wrapperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 50,
  };

  const perspectiveStyle = {
    perspective: "1000px",
    position: "absolute",
    left: "50%",
    top: "50%",
  };

  const contentWrapperStyle = {
    transform,
    position: "absolute",
    left: "50%",
    top: "50%",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: cardBody.borderRadius,
    border: `${cardBody.borderWidth || 4}px solid ${
      hovered ? cardBody.borderHoverColor : cardBody.borderColor
    }`,
    backgroundColor: cardBody.backgroundColor,
    transition: "transform 0.7s, border-color 0.7s",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: 0, // Padding is in child div
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

// Pin marker + orbiting tech icons
const PinMarkerAndOrbit = ({ hovered, pin, onPinClick, techIcons = [] }) => {
  // Arrange icons in a semi-circle above pin marker
  const orbitRadius = 68;
  const orbitAngleStep =
    techIcons.length > 1 ? Math.PI / (techIcons.length - 1) : 0;
  return (
    <div style={{ position: "absolute", left: "50%", bottom: "38px", width: "0", zIndex: 2 }}>
      {/* Orbiting icons */}
      {techIcons.map((icon, i) => {
        const angle = Math.PI + i * orbitAngleStep; // from left to right, semicircle
        return (
          <m.div
            key={i}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={
              hovered
                ? {
                    y: Math.sin(angle) * orbitRadius - 42,
                    x: Math.cos(angle) * orbitRadius,
                    opacity: 1,
                    scale: 1.2,
                  }
                : { y: 0, x: 0, opacity: 0, scale: 0.5 }
            }
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 18,
              delay: hovered ? i * 0.09 : 0,
            }}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
              fontSize: "2.1rem",
              zIndex: 8,
              filter: "drop-shadow(0 3px 14px rgba(0,0,0,0.5))",
              pointerEvents: "none",
            }}
          >
            {icon}
          </m.div>
        );
      })}

      {/* PIN MARKER */}
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.15 : 0.7,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-20px",
          width: "13px",
          height: "68px",
          borderRadius: "9999px",
          background: pin.lineColorPrimary,
          border: `4px solid ${pin.lineColorSecondary}`,
          boxShadow: `0 0 16px 2px ${pin.lineColorPrimary}44`,
          transform: "translate(-50%, 0)",
        }}
      />
      {/* Pin button */}
      <m.div
        onClick={onPinClick}
        style={{
          position: "absolute",
          bottom: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "7px 22px",
          borderRadius: "9999px",
          backgroundColor: pin.backgroundColor,
          cursor: "pointer",
          zIndex: 4,
          border: `2.5px solid ${pin.textColor}`,
          boxShadow: `0 2px 18px 0 ${pin.textColor}22`,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          style={{
            fontSize: pin.font.fontSize,
            color: pin.textColor,
            fontWeight: pin.font.fontWeight || "bold",
          }}
        >
          {pin.title}
        </span>
      </m.div>
    </div>
  );
};
