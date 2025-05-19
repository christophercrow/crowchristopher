"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Animated3DPinCardFramer(props) {
  const contentStyle = {
    display: "flex",
    flexBasis: "100%",
    flexDirection: "column",
    padding: "16px",
    letterSpacing: "tight",
    color: "rgba(233, 233, 233, 0.5)",
    width: "100%",
    minWidth: "18rem",
    height: "fit-content",
  };

  const titleStyle = {
    maxWidth: "20rem",
    marginTop: props.title.marginTop,
    marginBottom: props.title.marginBottom,
    fontSize: props.title.font.fontSize,
    fontWeight: props.title.font.fontWeight || "bold",
    fontFamily: props.title.font.fontFamily,
    letterSpacing: props.title.font.letterSpacing,
    lineHeight: props.title.font.lineHeight,
    textAlign: props.title.font.textAlign,
    color: props.title.color,
  };

  const subtitleStyle = {
    marginTop: props.subtitle.marginTop,
    marginBottom: props.subtitle.marginBottom,
    fontSize: props.subtitle.font.fontSize,
    fontWeight: props.subtitle.font.fontWeight || "normal",
    fontFamily: props.subtitle.font.fontFamily,
    letterSpacing: props.subtitle.font.letterSpacing,
    lineHeight: props.subtitle.font.lineHeight,
    textAlign: props.subtitle.font.textAlign,
    color: props.subtitle.color,
  };

  const imageBoxStyle = {
    display: "flex",
    width: "100%",
    height: "200px",
    borderRadius: props.image.borderRadius,
    marginTop: props.image.marginTop,
    backgroundImage: props.image.image?.src
      ? `url(${props.image.image.src})`
      : "url(https://images.unsplash.com/photo-1488905373347-189b5464fd44?q=80&w=2244&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <LazyMotion strict features={domAnimation}>
      <PinContainer props={props}>
        <div style={contentStyle}>
          <h3 style={titleStyle}>{props.title.text}</h3>
          <div style={subtitleStyle}>
            <span>{props.subtitle.text}</span>
          </div>
          <div style={imageBoxStyle} />
        </div>
      </PinContainer>
    </LazyMotion>
  );
}

export const PinContainer = ({ children, props }) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

  const onMouseEnter = () => setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  const onMouseLeave = () => setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");

  const componentStyle = `
    .hover-group-pin { position: relative; z-index: 50; width: 100%; height: 100%; }
    .hover-aware-content {
      transform: ${transform};
      position: absolute; left: 50%; top: 50%; padding: 16px;
      display: flex; justify-content: flex-start; border-radius: ${props.cardBody.borderRadius}px;
      border-color: ${props.cardBody.borderColor}; background-color: ${props.cardBody.backgroundColor};
      transition-duration: 0.7s; transition-property: all;
      border-width: ${props.cardBody.borderWidth}px; border-style: solid;
    }
    .hover-group-pin:hover .hover-aware-content {
      border-color: ${props.cardBody.borderHoverColor};
    }
    .hover-group-pin:hover .perspective-container { opacity: 1; }
    .hover-group-pin:hover .pin-line-1, .hover-group-pin:hover .pin-line-2 { height: 130px; }
  `;

  const perspectiveContainerStyle = {
    perspective: "1000px",
    transform: "rotateX(70deg) translateZ(0deg) translate(-50%, -50%)",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "16px",
  };

  const childrenWrapperStyle = { position: "relative", zIndex: "50" };

  return (
    <div className="hover-group-pin" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <style>{componentStyle}</style>
      <div style={perspectiveContainerStyle}>
        <div className="hover-aware-content">
          <div style={childrenWrapperStyle}>{children}</div>
        </div>
      </div>
      <PinPerspective props={props} />
    </div>
  );
};

export const PinPerspective = ({ props }) => {
  const componentStyle = `
    .perspective-container { width: 100%; max-width: 376px; height: 200px; display: flex; align-items: center; justify-content: center; opacity: 0; z-index: 60; transition: opacity 500ms; }
    .pin-line-1, .pin-line-2 {
      position: absolute; right: 50%; bottom: 50%; width: 1px; height: 80px;
      background-image: linear-gradient(to bottom, transparent, ${props.pin.lineColorPrimary});
    }
    .pin-line-2 { background-image: linear-gradient(to bottom, transparent, ${props.pin.lineColorSecondary}); }
  `;

  const containerStyle = { width: "100%", height: "100%", flexShrink: 0, inset: 0 };
  const container2Style = { position: "absolute", top: "40px", left: 0, right: 0, display: "flex", justifyContent: "center" };
  const linkStyle = {
    position: "relative", display: "flex", columnGap: "8px", alignItems: "center", zIndex: 10,
    borderRadius: "9999px", backgroundColor: props.pin.backgroundColor,
    padding: "2px 16px", boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1)", cursor: "pointer", textDecoration: "none"
  };
  const titleSpanStyle = {
    position: "relative", zIndex: 20, padding: "2px 0", fontSize: props.pin.font.fontSize,
    fontWeight: props.pin.font.fontWeight || "bold", fontFamily: props.pin.font.fontFamily,
    letterSpacing: props.pin.font.letterSpacing, lineHeight: props.pin.font.lineHeight,
    textAlign: props.pin.font.textAlign, color: props.pin.textColor
  };
  const titleUnderlineStyle = {
    position: "absolute", bottom: 0, left: "18px", height: "1px", width: "calc(100% - 36px)",
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0), ${props.pin.titleUnderlineColor}, rgba(0, 0, 0, 0))`,
    transition: "opacity 500ms"
  };
  const container3Style = {
    perspective: "1000px", transform: "rotateX(70deg) translateZ(0) translate(-50%, -50%)",
    position: "absolute", left: "50%", top: "50%", marginLeft: "1.5px", marginTop: "16px"
  };
  const motionDivStyle = {
    position: "absolute", left: "50%", top: "50%", height: "11.25rem", width: "11.25rem",
    borderRadius: "50%", backgroundColor: "rgba(172, 172, 172, 0.08)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
  };
  const motionDiv2Style = {
    position: "absolute", right: "50%", transform: "translateX(0.5px) translateY(14px)",
    bottom: "50%", backgroundColor: props.pin.lineColorPrimary, width: "2px", height: "2px",
    borderRadius: "9999px", zIndex: 40
  };

  return (
    <m.div className="perspective-container">
      <style>{componentStyle}</style>
      <div style={containerStyle}>
        <div style={container2Style}>
          <a href={props.pin.link} target={props.pin.linkTarget === "newWindow" ? "_blank" : "_self"} style={linkStyle}>
            <span style={titleSpanStyle}>{props.pin.title}</span>
            <span style={titleUnderlineStyle}></span>
          </a>
        </div>
        <div style={container3Style}>
          <>
            <m.div initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }} transition={{ duration: 6, repeat: Infinity, delay: 0 }} style={motionDivStyle} />
            <m.div initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} style={motionDivStyle} />
            <m.div initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }} animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }} transition={{ duration: 6, repeat: Infinity, delay: 4 }} style={motionDivStyle} />
          </>
        </div>
        <>
          <m.div className="pin-line-1"></m.div>
          <m.div className="pin-line-2"></m.div>
          <m.div style={{ ...motionDiv2Style, filter: "blur(3px)" }}></m.div>
          <m.div style={motionDiv2Style}></m.div>
        </>
      </div>
    </m.div>
  );
};
