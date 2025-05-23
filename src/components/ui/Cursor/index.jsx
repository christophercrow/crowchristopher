import React, { useEffect, useRef, useCallback } from "react";
import './cursor.css';
import DescCard from '../../features/DescCard';

// Utility for setting style via ref (for brevity)
const setStyle = (ref, styles) => {
  if (ref.current) Object.assign(ref.current.style, styles);
};

export default function Cursor({ project }) {
  // DOM refs
  const dot = useRef(null);
  const dotOutline = useRef(null);
  const electron = useRef(null);
  const card = useRef(null);
  const canvasRef = useRef(null);

  // State refs (for animation loop)
  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);
  const electronAngle = useRef(0);

  // Mouse position and trail
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trail = useRef(Array.from({ length: 16 }, () => ({ x: pos.current.x, y: pos.current.y })));

  // Responsive canvas
  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorVisible.current = true;
      pos.current = { x: e.pageX, y: e.pageY };
      setCursorVisibility();
    };
    const handleMouseEnter = () => {
      cursorVisible.current = true;
      setCursorVisibility();
    };
    const handleMouseLeave = () => {
      cursorVisible.current = false;
      setCursorVisibility();
    };
    const handleMouseDown = () => {
      cursorEnlarged.current = true;
      setCursorSize();
    };
    const handleMouseUp = () => {
      cursorEnlarged.current = false;
      setCursorSize();
    };
    const handleHover = (e) => {
      const shouldEnlarge = e.target.closest('a, svg, span, input, button, .orbit-hover, .glitch-hover');
      cursorEnlarged.current = !!shouldEnlarge;
      setCursorSize();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHover);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHover);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  // Cursor appearance handlers
  const setCursorVisibility = useCallback(() => {
    const visible = cursorVisible.current ? 1 : 0;
    [dot, dotOutline, card, electron, canvasRef].forEach(ref => {
      if (ref.current) ref.current.style.opacity = visible;
    });
  }, []);

  const setCursorSize = useCallback(() => {
    if (!dot.current || !dotOutline.current || !card.current) return;
    if (cursorEnlarged.current) {
      setStyle(dot, { transform: 'translate(-50%, -50%) scale(1.24)' });
      setStyle(dotOutline, { transform: 'translate(-50%, -50%) scale(2.1)' });
      setStyle(card, { transform: 'translate(-50%, -50%) scale(1.27)' });
      if (electron.current) electron.current.style.filter = 'brightness(1.45)';
    } else {
      setStyle(dot, { transform: 'translate(-50%, -50%) scale(1)' });
      setStyle(dotOutline, { transform: 'translate(-50%, -50%) scale(1)' });
      setStyle(card, { transform: 'translate(-50%, -50%) scale(1)' });
      if (electron.current) electron.current.style.filter = 'brightness(1.13)';
    }
  }, []);

  // Animation loop (requestAnimationFrame)
  useEffect(() => {
    let running = true;
    const animate = () => {
      // Move trailing positions
      trail.current.pop();
      trail.current.unshift({ ...pos.current });

      // Canvas trail
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < trail.current.length; i++) {
          const t = trail.current[i];
          const alpha = Math.max(0, 0.33 - i * 0.025);
          ctx.beginPath();
          ctx.arc(t.x, t.y, 5 - i * 0.3, 0, 2 * Math.PI, false);
          ctx.fillStyle = `rgba(71,255,233,${alpha})`;
          ctx.shadowBlur = 7;
          ctx.shadowColor = "#47ffe9";
          ctx.fill();
        }
      }

      // Animate electron
      electronAngle.current += cursorEnlarged.current ? 0.22 : 0.09;
      const r = 22 * (cursorEnlarged.current ? 1.27 : 1);
      if (electron.current && dot.current) {
        setStyle(electron, {
          left: pos.current.x + "px",
          top: pos.current.y + "px",
          transform:
            `translate(-50%, -50%) translate(${Math.cos(electronAngle.current) * r}px, ${Math.sin(electronAngle.current) * r}px)`
        });
      }

      // Move cursor
      setStyle(dot, {
        left: pos.current.x + "px",
        top: pos.current.y + "px"
      });
      setStyle(dotOutline, {
        left: pos.current.x + "px",
        top: pos.current.y + "px"
      });
      setStyle(card, {
        left: pos.current.x + "px",
        top: pos.current.y + "px"
      });

      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; };
  }, [setCursorSize]);

  // ---- JSX ----
  return (
    <>
      {/* Canvas trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9997,
        }}
      />
      {/* Main outline */}
      <div
        ref={dotOutline}
        className="cursor-dot-outline"
        style={{
          position: "fixed",
          width: 38,
          height: 38,
          left: 0, top: 0,
          borderRadius: "50%",
          background: "rgba(71,255,233,0.11)",
          boxShadow: "0 0 18px 6px #47ffe9bb, 0 0 42px 7px #fff1",
          border: "2.6px solid #47ffe9cc",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "background 0.16s, border 0.2s, box-shadow 0.18s, transform 0.18s"
        }}
      />
      {/* Core dot */}
      <div
        ref={dot}
        className="cursor-dot"
        style={{
          position: "fixed",
          width: 15,
          height: 15,
          left: 0, top: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 65% 30%, #fff 62%, #47ffe9 95%, #1a2a41 100%)",
          boxShadow: "0 0 8px #47ffe9ee, 0 0 24px #fff4",
          zIndex: 10000,
          filter: "brightness(1.11) blur(0.04px)",
          transform: "translate(-50%, -50%)",
          transition: "background 0.23s, filter 0.18s, transform 0.18s"
        }}
      />
      {/* Electron */}
      <div
        ref={electron}
        className="cursor-electron"
        style={{
          position: "fixed",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 55%, #a7e1ff 64%, #47ffe9 100%)",
          boxShadow: "0 0 22px 2px #fff, 0 0 14px 0 #47ffe9aa",
          zIndex: 10001,
          pointerEvents: "none",
          opacity: 1,
          transition: "filter 0.17s"
        }}
      />
      {/* Card */}
      <DescCard cardRef={card} project={project} />
    </>
  );
}
