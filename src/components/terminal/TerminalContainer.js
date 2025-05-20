import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Dummy command logic: Implement a more complete shell-like logic as you wish!
export default function TerminalContainer({ onClose }) {
  const [lines, setLines] = useState([
    "[robinj@bashywashy]─[~/github/portfolio/crowchristopher]",
    "$ ",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function handleInput(e) {
    if (e.key === "Enter") {
      setLines((prev) => [
        ...prev,
        "$ " + input,
        "[robinj@bashywashy]─[~/github/portfolio/crowchristopher]",
        "$ ",
      ]);
      setInput("");
    }
  }

  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 24 }}
      style={{
        background: "#181a1d",
        color: "#34fa33",
        borderTop: "5px solid #34fa33",
        borderRadius: "18px 18px 0 0",
        width: "97vw",
        height: "420px",
        margin: "0 auto",
        boxShadow: "0 -2px 24px #000d",
        overflow: "hidden",
        zIndex: 1003,
        position: "relative",
      }}
    >
      <div
        style={{
          height: "40px",
          width: "100%",
          background: "#252525",
          borderRadius: "18px 18px 0 0",
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
          padding: "0 1.6rem",
        }}
      >
        <span style={{ width: 15, height: 15, background: "#ee4d3a", borderRadius: "50%", display: "inline-block", marginRight: 4 }} />
        <span style={{ width: 15, height: 15, background: "#fbbd04", borderRadius: "50%", display: "inline-block", marginRight: 4 }} />
        <span style={{ width: 15, height: 15, background: "#28b940", borderRadius: "50%", display: "inline-block", marginRight: 16 }} />
        <span
          onClick={onClose}
          style={{
            color: "#fff",
            marginLeft: "auto",
            fontWeight: 900,
            fontSize: 22,
            cursor: "pointer",
            userSelect: "none",
          }}
        >×</span>
      </div>
      <div
        style={{
          padding: "22px 30px",
          fontFamily: "Fira Mono, monospace",
          fontSize: "1.15rem",
          color: "#34fa33",
          height: "calc(100% - 40px)",
          overflowY: "auto",
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        <input
          style={{
            background: "none",
            border: "none",
            outline: "none",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "inherit",
            width: "60vw",
            marginTop: 5,
          }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInput}
          autoFocus
        />
        <div ref={endRef} />
      </div>
    </motion.div>
  );
}
