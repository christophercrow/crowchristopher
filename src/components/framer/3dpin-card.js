import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Animated3DPinCardFramer(props) {
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "0.5rem",
    color: "rgba(233, 233, 233, 0.9)",
    width: "100%",
    minWidth: "18rem",
    height: "fit-content",
  };

  // title/subtitle styles pulled from props
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
    height: "200px",
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
      <PinContainer {...props}>
        <div style={contentStyle}>
          {props.icon && (
            <div style={{ marginBottom: "0.5rem", textAlign: "center" }}>
              {props.icon}
            </div>
          )}
          <h3 style={titleStyle}>{props.title.text}</h3>
          <p style={subtitleStyle}>{props.subtitle.text}</p>
          <div style={imageBoxStyle} />
        </div>
      </PinContainer>
    </LazyMotion>
  );
}

export const PinContainer = ({
  children,
  cardBody,
  pin,
  onPinClick, // passed from index.js
}) => {
  const [hovered, setHovered] = useState(false);

  // Per-instance transform
  const transform = hovered
    ? "translate(-50%,-50%) rotateX(40deg) scale(0.8)"
    : "translate(-50%,-50%) rotateX(0deg) scale(1)";

  // wrapper to capture hover
  const wrapperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 50,
  };

  // perspective and content
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
    padding: "16px",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: cardBody.borderRadius,
    border: `${cardBody.borderWidth}px solid ${
      hovered ? cardBody.borderHoverColor : cardBody.borderColor
    }`,
    backgroundColor: cardBody.backgroundColor,
    transition: "transform 0.7s, border-color 0.7s",
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
      <PinPerspective pin={pin} hovered={hovered} onClick={onPinClick} />
    </div>
  );
};

export const PinPerspective = ({ pin, hovered, onClick }) => {
  // static lines & button
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: hovered ? 1 : 0,
    transition: "opacity 0.5s",
    perspective: "1000px",
  };

  return (
    <m.div style={containerStyle}>
      <m.div
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, delay: 0 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "11.25rem",
          height: "11.25rem",
          borderRadius: "50%",
          backgroundColor: "rgba(172,172,172,0.08)",
        }}
      />
      <m.div
        className="pin-line"
        style={{
          position: "absolute",
          right: "50%",
          bottom: "50%",
          width: "1px",
          height: hovered ? "130px" : "80px",
          backgroundImage: `linear-gradient(to bottom, transparent, ${pin.lineColorPrimary})`,
          transition: "height 0.5s",
        }}
      />
      <m.div
        className="pin-line"
        style={{
          position: "absolute",
          right: "50%",
          bottom: "50%",
          width: "1px",
          height: hovered ? "130px" : "80px",
          backgroundImage: `linear-gradient(to bottom, transparent, ${pin.lineColorSecondary})`,
          transition: "height 0.5s",
        }}
      />
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRadius: "9999px",
          backgroundColor: pin.backgroundColor,
          cursor: "pointer",
        }}
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
      </div>
    </m.div>
  );
};
