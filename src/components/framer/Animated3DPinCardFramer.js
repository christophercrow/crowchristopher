import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styled from "styled-components";

export default function Animated3DPinCardFramer({
  icon,
  title,
  subtitle,
  image,
  cardBody = {},
  pin = {},
  techIcons = [],
  techIconsAbovePin = false,
  hovered = false,
  onPinClick = () => {},
}) {
  // 3D Tilt logic
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    rotateY.set(deltaX * 16);
    rotateX.set(-deltaY * 13);
  }
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <CardPerspective>
      {/* Pin Label & Line, floating above card */}
      <PinWrap>
        <PinLabel pinColor={pin.lineColorPrimary || "#7ecad7"}>
          {pin.title || "View Project"}
        </PinLabel>
        <PinLine pinColor={pin.lineColorPrimary || "#7ecad7"} />
      </PinWrap>

      <CardRoot
        ref={cardRef}
        as={motion.div}
        style={{
          rotateX,
          rotateY,
          border: `${cardBody.borderWidth || 3.2}px solid ${
            hovered
              ? cardBody.borderHoverColor || "#ffba8b"
              : cardBody.borderColor || "#7ecad7"
          }`,
          background: cardBody.backgroundColor || "#191f23",
          borderRadius: cardBody.borderRadius || 18,
          boxShadow: hovered
            ? `0 16px 48px #000c, 0 2px 40px ${(pin.lineColorPrimary || "#7ecad7")}44`
            : "0 8px 36px #0009",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ICON + TEXT */}
        <CardInner>
          <IconCircle>{icon}</IconCircle>
          <CardTitle style={title?.font} color={title?.color}>
            {title?.text}
          </CardTitle>
          <CardSubtitle style={subtitle?.font} color={subtitle?.color}>
            {subtitle?.text}
          </CardSubtitle>
          {image?.image?.src && (
            <CardImage
              src={image.image.src}
              style={{
                borderRadius: image.borderRadius || 14,
                marginTop: image.marginTop,
                marginRight: image.marginRight,
                width: image.width || "100%",
              }}
              alt=""
              draggable={false}
            />
          )}
        </CardInner>

        {/* Sprouting tech icons */}
        {techIconsAbovePin && (
          <TechIconsRow>
            <AnimatePresence>
              {hovered &&
                techIcons.map((icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 30, opacity: 0, scale: 0.7 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: 0.7 }}
                    transition={{
                      duration: 0.32,
                      delay: 0.08 * i,
                      type: "spring",
                      stiffness: 180,
                    }}
                    style={{ pointerEvents: "none" }}
                  >
                    {icon}
                  </motion.div>
                ))}
            </AnimatePresence>
          </TechIconsRow>
        )}

        {/* Pin marker/button stays at bottom of card */}
        <PinRow>
          <PinMarker
            as={motion.button}
            whileHover={{
              scale: 1.11,
              y: -3,
              boxShadow: "0 5px 16px #0007",
            }}
            style={{
              background: pin.backgroundColor || "#262e37",
              color: pin.textColor || "#7ecad7",
              borderColor: pin.lineColorPrimary || "#7ecad7",
            }}
            onClick={onPinClick}
          >
            <PinHead
              style={{
                background: pin.lineColorPrimary || "#7ecad7",
                boxShadow: "0 1px 8px #0009",
              }}
            />
            <PinText style={pin.font}>{pin.title || "View Project"}</PinText>
          </PinMarker>
          <PinLineShort
            style={{
              background: pin.lineColorPrimary || "#7ecad7",
              opacity: 0.38,
            }}
          />
        </PinRow>
      </CardRoot>
    </CardPerspective>
  );
}

// --- Styled Components ---

const CardPerspective = styled.div`
  perspective: 1100px;
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 68px; /* add more space for the pin label */
`;

const PinWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: -56px;
  transform: translateX(-50%);
  z-index: 20;
  pointer-events: none;
`;

const PinLabel = styled.div`
  background: #222;
  color: #fff;
  border-radius: 22px;
  border: 2.7px solid ${({ pinColor }) => pinColor};
  padding: 7px 25px 5px 25px;
  font-size: 1.09rem;
  font-weight: 900;
  letter-spacing: 0.7px;
  margin-bottom: 3px;
  box-shadow: 0 2px 14px #000a;
  text-shadow: 0 2px 5px #0006;
`;

const PinLine = styled.div`
  width: 3.1px;
  height: 56px;
  background: ${({ pinColor }) => pinColor};
  margin: 0 auto;
  border-radius: 2px;
`;

const CardRoot = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 2.1rem 1.6rem 5.7rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
  background: #191f23;
`;

const CardInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: flex-start;
  margin-bottom: 1.2rem;
`;

const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #242a2f;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0008;
  margin-bottom: 0.4rem;
`;

const CardTitle = styled.div`
  font-size: 1.37rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${({ color }) => color || "#7ecad7"};
`;

const CardSubtitle = styled.div`
  font-size: 1.07rem;
  font-weight: 600;
  color: ${({ color }) => color || "#dadada"};
  opacity: 0.92;
`;

const CardImage = styled.img`
  margin-top: 0.4rem;
  max-width: 98%;
  max-height: 180px;
  border-radius: 14px;
  object-fit: cover;
  user-drag: none;
  pointer-events: none;
  box-shadow: 0 2px 12px #0006;
  border: 1.5px solid #2229;
`;

const TechIconsRow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 75px;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 12;
  pointer-events: none;
`;

const PinRow = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
`;

const PinMarker = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.72rem;
  padding: 0.59rem 1.45rem 0.59rem 1.05rem;
  border-radius: 23px;
  background: #222b32;
  border: 2.5px solid #7ecad7;
  color: #7ecad7;
  font-weight: 700;
  font-size: 1.08rem;
  box-shadow: 0 2px 12px #0006;
  cursor: pointer;
  outline: none;
  transition: background 0.17s, color 0.18s, border 0.18s;
  position: relative;
`;

const PinHead = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #7ecad7;
  border: 2.5px solid #fff9;
  margin-right: 0.9rem;
`;

const PinText = styled.span`
  font-size: 1.06rem;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

const PinLineShort = styled.div`
  width: 4px;
  height: 26px;
  margin: 0 auto;
  border-radius: 6px;
  background: #7ecad7;
  margin-top: -0.18rem;
`;
