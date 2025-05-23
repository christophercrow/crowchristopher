// src/components/ui/FadeInImg.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.66s cubic-bezier(.43,1.6,.34,1);
  will-change: opacity;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 18px;
  box-shadow: 0 14px 38px 8px #282b4061, 0 4px 28px 6px #262d4e61;
  filter: grayscale(0.11) contrast(1.13) brightness(1.13);
  background: #161e2d;
`;

export default function FadeInImg(props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Img
      {...props}
      $loaded={loaded}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
    />
  );
}
