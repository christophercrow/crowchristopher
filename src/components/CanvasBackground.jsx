// src/components/CanvasBackground.jsx

import React, { useRef, useEffect } from "react";

export default function CanvasBackground({ side = "left", nebulaImg }) {
  const canvasRef = useRef();
  const dpr = window.devicePixelRatio || 1;

  // Size reference for canvas resizing
  const sizeRef = useRef({
    width: window.innerWidth / 2,
    height: window.innerHeight
  });

  // Particle/effect state (kept outside React state for perf)
  const dataRef = useRef({
    stars: [],
    shooties: [],
    stardust: [],
    binaryCols: [],
    arc: null,
    terminal: null,
    nebula: null,
    nebulaLoaded: false,
    SPAWN: performance.now()
  });

  // Random helper
  const rand = (a, b) => a + Math.random() * (b - a);

  useEffect(() => {
    // Handle resizing
    function updateSize() {
      sizeRef.current.width = window.innerWidth / 2;
      sizeRef.current.height = window.innerHeight;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = sizeRef.current.width * dpr;
      canvas.height = sizeRef.current.height * dpr;
      canvas.style.width = sizeRef.current.width + "px";
      canvas.style.height = sizeRef.current.height + "px";
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    // (Re)generate all particles/effects for this side
    function setupParticles() {
      const WIDTH = sizeRef.current.width;
      const HEIGHT = sizeRef.current.height;

      if (side === "left") {
        // Starfield
        dataRef.current.stars = Array.from({ length: 60 }, () => {
          const r = Math.random();
          let size, blur;
          if (r < 0.84) {
            size = rand(1.4, 3); blur = rand(0.42, 1.12);
          } else if (r < 0.98) {
            size = rand(4.5, 6.9); blur = rand(0.3, 0.7);
          } else {
            size = rand(7.3, 9.5); blur = rand(0.19, 0.44);
          }
          return {
            baseX: rand(0, WIDTH),
            baseY: rand(0, HEIGHT),
            floatSpeed: rand(0.012, 0.019),
            twinkleSpeed: rand(0.24, 0.47),
            twinklePhase: rand(0, Math.PI * 2),
            size,
            blur,
            color: ["#fff", "#d5e9ff", "#a7e1ff", "#e5debf", "#b5cfff", "#f9e8d3", "#b8baff", "#d1d4f3", "#ffe7ee", "#fee8be", "#c9ffe5"][Math.floor(rand(0, 11))]
          };
        });
        // Shooting stars
        dataRef.current.shooties = Array.from({ length: 2 }, () => ({
          x: rand(0, WIDTH * 0.7),
          y: rand(0, HEIGHT * 0.3),
          len: rand(80, 130),
          speed: rand(0.25, 0.33),
          phase: rand(0, 10000)
        }));
        // Stardust
        dataRef.current.stardust = Array.from({ length: 30 }, (_, i) => ({
          x: rand(WIDTH * 0.17, WIDTH * 0.41),
          y: rand(HEIGHT * 0.26, HEIGHT * 0.41),
          size: rand(1, 2.6),
          blur: Math.random() < 0.7 ? rand(0.2, 1.1) : rand(1, 2.1),
          color: ["#fff", "#a7e1ff", "#ffe7ee", "#add6fe", "#ffe8be"][i % 5],
          twinkleSpeed: rand(1.6, 3.7),
          twinklePhase: rand(0, Math.PI * 2)
        }));
        // Nebula
        dataRef.current.nebulaLoaded = false;
        if (nebulaImg) {
          const img = new window.Image();
          img.src = nebulaImg;
          img.onload = () => {
            dataRef.current.nebulaLoaded = true;
            dataRef.current.nebula = img;
          };
        }
      }

      if (side === "right") {
        // === BINARY RAIN: Spread across full width ===
        const n = Math.floor(WIDTH / 26);
        dataRef.current.binaryCols = Array.from({ length: n }, (_, i) => ({
          x: WIDTH * (i / (n - 1)) + rand(-12, 12),  // Now fully spread across
          baseY: rand(-100, -40),
          y: rand(-100, -40),
          speed: rand(0.045, 0.1),
          char: Math.random() > 0.5 ? "0" : "1",
          color: ["#47ffe9", "#1f6feb", "#00fff4", "#f92b6c"][Math.floor(rand(0, 4))],
          fontSize: rand(18, 30),
          time: performance.now() + rand(0, 2000)
        }));

        // === ARC: Circuits can start/branch across full width ===
        function randomTreePath() {
          const points = [];
          let x = rand(WIDTH * 0.04, WIDTH * 0.96);   // 4% margin for realism
          let y = rand(HEIGHT * 0.18, HEIGHT * 0.43);
          points.push({ x, y });
          let dx = rand(70, 120);
          for (let b = 0; b < rand(3, 5); ++b) {
            x += dx;
            y += rand(-100, 170);
            // Clamp x so arc stays in bounds
            x = Math.max(WIDTH * 0.04, Math.min(x, WIDTH * 0.96));
            points.push({ x, y });
            // Branches, also full width
            if (Math.random() > 0.5) {
              let bx = x - rand(20, 70);
              bx = Math.max(WIDTH * 0.04, Math.min(bx, WIDTH * 0.96));
              let by = y + rand(10, 80);
              points.push({ x: bx, y: by }, { x, y });
            }
            dx = rand(55, 140);
          }
          return points;
        }
        dataRef.current.arc = {
          points: randomTreePath(),
          t0: performance.now(),
          duration: 2100
        };

        // === TERMINAL LINES: Spread across full width ===
        const terminalLines = [
          { msg: "[OK] Boot complete", color: "#00ff73" },
          { msg: "node server.js", color: "#5de6ff" },
          { msg: "Welcome, admin.", color: "#00ffe5" },
          { msg: "Fetching data...", color: "#b7ffcf" },
          { msg: "python3 analyze.py", color: "#c3c3ff" },
          { msg: "Login success.", color: "#c2f56c" },
          { msg: "export PATH=$PATH:/usr/local/bin", color: "#fff9b1" },
          { msg: "Run: ./deploy.sh", color: "#c9ffef" },
          { msg: "CPU: 47%, MEM: 2.1 GB", color: "#8dd0ff" },
          { msg: "Operation completed.", color: "#b2fa92" },
          { msg: "git status --short", color: "#90d3ff" },
          { msg: "ps aux | grep nginx", color: "#fff" },
          { msg: "[ERR] Permission denied", color: "#ff3e4d", isError: true },
          { msg: "Traceback (most recent call last):", color: "#ff3e4d", isError: true },
          { msg: "Error: Connection reset", color: "#ff3e4d", isError: true }
        ];
        function genTerminalLine(W, H) {
          const entry = terminalLines[Math.floor(rand(0, terminalLines.length))];
          return {
            msg: entry.msg,
            color: entry.color,
            isError: entry.isError,
            start: performance.now(),
            charIdx: 0,
            scanlinePhase: rand(0, Math.PI * 2),
            cursorBlock: Math.random() < 0.75,
            x: rand(W * 0.05, W * 0.94),  // full width, 5% margin
            y: rand(H * 0.12, H * 0.75),
            fontSize: rand(18, 26),
            opacity: rand(0.81, 1)
          };
        }
        dataRef.current.terminal = {
          lines: Array.from({ length: 6 }, () => genTerminalLine(WIDTH, HEIGHT)),
          genLine: () => genTerminalLine(WIDTH, HEIGHT)
        };
        // Expose helpers for arc regeneration and terminal line regen
        dataRef.current.randomTreePath = randomTreePath;
        dataRef.current.genTerminalLine = genTerminalLine;
      }
    }

    setupParticles();

    // Resize: throttle to avoid performance spikes
    let resizeTimeout = null;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setupParticles, 160);
    };
    window.addEventListener("resize", handleResize);

    // Animation draw loop
    let running = true;
    function draw(now) {
        const WIDTH = sizeRef.current.width;
        const HEIGHT = sizeRef.current.height;
        const canvas = canvasRef.current;
        if (!canvas) {
          // Canvas not mounted yet, try again on next frame.
          if (running) requestAnimationFrame(draw);
          return;
        }
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      // --- LEFT: STARFIELD/NEBULA ---
      if (side === "left") {
        // Starfield
        for (let s of dataRef.current.stars) {
          let t = ((now - dataRef.current.SPAWN) * s.floatSpeed * 0.09 + s.baseY) % HEIGHT;
          let opacity = 0.14 + 0.84 * (0.5 + 0.5 * Math.sin((now - dataRef.current.SPAWN) * s.twinkleSpeed * 0.0008 + s.twinklePhase));
          ctx.save();
          ctx.globalAlpha = Math.max(0.08, Math.min(opacity, 1));
          ctx.shadowBlur = s.blur;
          ctx.shadowColor = s.color;
          ctx.beginPath();
          ctx.arc(s.baseX, HEIGHT - t, s.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = s.color;
          ctx.fill();
          ctx.restore();
        }
        // Shooting Stars
        for (let sh of dataRef.current.shooties) {
          let progress = ((now * sh.speed + sh.phase) % (WIDTH * 2.5)) / (WIDTH * 2.5);
          if (progress < 0.13) continue;
          ctx.save();
          ctx.globalAlpha = 1 - progress;
          let x = sh.x + progress * WIDTH * 1.14;
          let y = sh.y + progress * HEIGHT * 0.11;
          let grad = ctx.createLinearGradient(x, y, x + sh.len, y);
          grad.addColorStop(0, "#fff");
          grad.addColorStop(0.5, "#a7e1ff");
          grad.addColorStop(1, "#fff0");
          ctx.strokeStyle = grad;
          ctx.shadowColor = "#47ffe9";
          ctx.shadowBlur = 7;
          ctx.lineWidth = 2.1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + sh.len, y);
          ctx.stroke();
          ctx.restore();
        }
        // Nebula (top right)
        if (dataRef.current.nebula && dataRef.current.nebulaLoaded) {
          ctx.save();
          let float = Math.sin((now - dataRef.current.SPAWN) / 4500) * 18;

          let nebulaWidth = WIDTH * 0.25;
          let nebulaHeight = HEIGHT * 0.34;
          let nebulaX = WIDTH - nebulaWidth - WIDTH * 0.05;  // 5% margin from right
          let nebulaY = HEIGHT * 0.03 + float;               // 3% margin from top

          ctx.globalAlpha = 0.21 + 0.09 * Math.sin((now - dataRef.current.SPAWN) / 2200);
          ctx.filter = "blur(10px) brightness(1.09) saturate(1.2)";
          ctx.drawImage(dataRef.current.nebula, nebulaX, nebulaY, nebulaWidth, nebulaHeight);

          ctx.globalAlpha = 0.28 + 0.08 * Math.sin((now - dataRef.current.SPAWN) / 3400);
          ctx.filter = "blur(3.6px) brightness(1.13) saturate(1.17)";
          ctx.drawImage(dataRef.current.nebula, nebulaX + 18, nebulaY + 8, nebulaWidth * 0.55, nebulaHeight * 0.65);

          ctx.globalAlpha = 0.13 + 0.07 * Math.sin((now - dataRef.current.SPAWN) / 3900);
          ctx.filter = "blur(1.7px) brightness(1.19) saturate(1.34) hue-rotate(40deg)";
          ctx.drawImage(dataRef.current.nebula, nebulaX + 33, nebulaY + 19, nebulaWidth * 0.3, nebulaHeight * 0.28);

          ctx.restore();
        }
        // Stardust
        for (let s of dataRef.current.stardust) {
          let opacity = 0.22 + 0.78 * (0.5 + 0.5 * Math.sin((now - dataRef.current.SPAWN) * s.twinkleSpeed * 0.0008 + s.twinklePhase));
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.shadowBlur = s.blur;
          ctx.shadowColor = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = s.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // --- RIGHT: BINARY RAIN, ARC, TERMINAL ---
      if (side === "right") {
        // Binary rain
        for (let b of dataRef.current.binaryCols) {
          let t = (now - b.time) * b.speed * 0.37;
          let y = b.baseY + t;
          ctx.save();
          ctx.font = `bold ${b.fontSize}px Fira Mono, monospace`;
          ctx.globalAlpha = 0.72 + 0.26 * Math.sin(now / 300 + b.x);
          ctx.shadowBlur = 8;
          ctx.shadowColor = b.color;
          ctx.fillStyle = b.color;
          ctx.fillText(b.char, b.x, y);
          ctx.restore();
          if (y > HEIGHT + 16) {
            b.baseY = rand(-100, -40);
            b.char = Math.random() > 0.5 ? "0" : "1";
            b.time = now;
          }
        }
        // Arc (guard against undefined errors)
        if (
          dataRef.current.arc &&
          Array.isArray(dataRef.current.arc.points) &&
          dataRef.current.arc.points.length > 1
        ) {
          let t = ((now - dataRef.current.arc.t0) % dataRef.current.arc.duration) / dataRef.current.arc.duration;
          ctx.save();
          ctx.globalAlpha = 0.84;
          ctx.lineWidth = 6.5;
          ctx.shadowBlur = 18;
          ctx.shadowColor = "#47ffe9";
          ctx.strokeStyle = "#47ffe9";
          ctx.beginPath();
          for (let i = 0; i < dataRef.current.arc.points.length; ++i) {
            let pt = dataRef.current.arc.points[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x + rand(-3, 3), pt.y + rand(-5, 5));
          }
          ctx.stroke();
          // Spark
          if (t < 0.97) {
            let seg = Math.floor(t * (dataRef.current.arc.points.length - 1));
            let pt1 = dataRef.current.arc.points[seg];
            let pt2 = dataRef.current.arc.points[seg + 1];
            if (pt1 && pt2) {
              let progress = (t * (dataRef.current.arc.points.length - 1)) % 1;
              let sx = pt1.x + (pt2.x - pt1.x) * progress + rand(-8, 8);
              let sy = pt1.y + (pt2.y - pt1.y) * progress + rand(-8, 8);
              ctx.save();
              ctx.globalAlpha = 0.8;
              ctx.shadowBlur = 22;
              ctx.shadowColor = "#fff";
              ctx.beginPath();
              ctx.arc(sx, sy, 11 + rand(0, 6), 0, Math.PI * 2);
              ctx.fillStyle = "#fff";
              ctx.fill();
              ctx.restore();
            }
          }
          ctx.restore();
          // Reset arc if complete
          if (t > 0.98) {
            const WIDTH = sizeRef.current.width;
            const HEIGHT = sizeRef.current.height;
            dataRef.current.arc.points = dataRef.current.randomTreePath(WIDTH, HEIGHT);
            dataRef.current.arc.t0 = now;
          }
        }
        // Terminal
        if (dataRef.current.terminal) {
          for (let i = 0; i < dataRef.current.terminal.lines.length; ++i) {
            let line = dataRef.current.terminal.lines[i];
            let elapsed = (now - line.start) * 0.12;
            let displayText = line.msg.slice(0, Math.floor(elapsed / 5));
            ctx.save();
            ctx.font = `bold ${line.fontSize}px Fira Mono, monospace`;
            ctx.shadowColor = line.color;
            ctx.shadowBlur = line.isError ? 11 : 6;
            ctx.globalAlpha = line.opacity * (1.0 - 0.11 * Math.sin(now / 230 + i));
            ctx.fillStyle = line.color;
            ctx.filter = line.isError
              ? "blur(1.1px) brightness(1.09)"
              : "brightness(1.04)";
            ctx.fillText(displayText, line.x, line.y);
            // Blinking cursor
            if ((Math.floor(now / 480) % 2 === 0) && displayText.length < line.msg.length) {
              ctx.save();
              ctx.globalAlpha = 0.82;
              ctx.fillStyle = line.color;
              ctx.fillRect(line.x + ctx.measureText(displayText).width + 2, line.y - line.fontSize + 5, line.cursorBlock ? 14 : 2.7, line.fontSize - 7);
              ctx.restore();
            }
            ctx.restore();
            // scanline flicker
            ctx.save();
            ctx.globalAlpha = 0.12 + 0.10 * Math.sin(now / 110 + line.scanlinePhase);
            ctx.fillStyle = "#fff";
            ctx.fillRect(line.x, line.y - 2, WIDTH * 0.28, 2.3);
            ctx.restore();
            // Refill line when done
            if (displayText.length >= line.msg.length && now - line.start > 1450 + rand(0, 700)) {
              dataRef.current.terminal.lines[i] = dataRef.current.genTerminalLine(WIDTH, HEIGHT);
            }
          }
        }
      }

      if (running) requestAnimationFrame(draw);
    }

    let raf = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
    // eslint-disable-next-line
  }, [side, nebulaImg, dpr]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: side === "left" ? 0 : "50vw",
        top: 0,
        pointerEvents: "none",
        zIndex: 10,
        display: "block",
      }}
      width={sizeRef.current.width * dpr}
      height={sizeRef.current.height * dpr}
      aria-hidden="true"
    />
  );
}
