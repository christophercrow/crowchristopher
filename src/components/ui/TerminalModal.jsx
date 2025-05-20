import React, { useRef, useState, useEffect } from "react";

// YOUR CUSTOM NEOFETCH (edit for your latest info!)
const MY_NEOFETCH = [
  "                 _      chris@bashywashy",
  "   ____  _ __ __| |     ---------------------------",
  "  / _  || '__/ _` |    Astrophysics · Python · ML",
  " | (_| || | | (_| |    Linux | Docker | Ansible | SQL",
  "  \\__,_||_|  \\__,_|   Observational Astronomy · Data Science",
  "",
  "  Project:  github.com/crowchristopher",
  "  Shell:    bash",
  "  Editor:   VS Code, Vim",
  "  OS:       Parrot Security Linux",
  "  Python:   3.12.x",
  "  Machine:  Intel i5-13600KF · RTX 3070 LHR",
  "  Favorite tools: ",
  "    - Jupyter · PyTorch · TensorFlow · OpenFOAM",
  "    - React · FastAPI · PostgreSQL",
  "",
  "  Skills:",
  "    · Stellar Evolution  · Data Pipelines",
  "    · Observational Analysis  · DevOps",
  "",
  "  Colors:",
  "",
  "<COLORS>"
];
const COLOR_BLOCKS = [
  "#444444", "#ff5555", "#41b6ff", "#faff80", "#bd93f9", "#7ef9b6", "#ff79c6", "#ffffff"
];

function TerminalPrompt({ user = "chris", host = "bashywashy", dir = "~", retcode }) {
  return (
    <span>
      <span style={{ color: "#00ff66" }}>{user}</span>
      <span style={{ color: "#bbbbbb" }}>@</span>
      <span style={{ color: "#41b6ff" }}>{host}</span>
      <span style={{ color: "#bbbbbb" }}>:</span>
      <span style={{ color: "#44e058" }}> {dir}</span>
      <span style={{ color: "#bbbbbb" }}>{retcode !== undefined ? ` [$?=${retcode}]` : ""}</span>
      <span style={{ color: "#fa5656" }}> $</span>
    </span>
  );
}

// Filesystem simulation (expandable!)
const INIT_FS = {
  "~": {
    type: "dir",
    children: {
      "github": {
        type: "dir",
        children: {
          "portfolio": {
            type: "dir",
            children: {
              "crowchristopher": {
                type: "dir",
                children: {}
              }
            }
          }
        }
      }
    }
  },
  "README.txt": { type: "file", content: "Welcome to your simulated home directory." }
};

const PROJECTS = [
  "linux-server-hardening",
  "ansible-automation",
  "dockerized-infrastructure",
  "system-monitoring-stack"
];

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cd",
  "clear",
  "pwd",
  "cat",
  "echo",
  "mkdir"
];

function findPath(fs, cwd, path) {
  let curr = fs;
  let segments = path.startsWith("/") ? path.slice(1).split("/") : cwd.split("/").concat(path.split("/"));
  let filtered = segments.filter(Boolean);
  for (let seg of filtered) {
    if (curr[seg] && curr[seg].type === "dir") curr = curr[seg].children;
    else if (curr[seg] && curr[seg].type === "file") return curr[seg];
    else return null;
  }
  return curr;
}

function TerminalModal({ open, onClose, navigate }) {
  const [pos, setPos] = useState({ x: 80, y: 80 });
  const [size, setSize] = useState({ w: 730, h: 450 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ w: 0, h: 0, x: 0, y: 0 });

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [fs, setFS] = useState(INIT_FS);
  const [retcode, setRetcode] = useState(0);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const inputRef = useRef();
  const scrollRef = useRef();

  // Render neofetch
  function getNeofetchBlock() {
    return [
      ...MY_NEOFETCH.map((line, idx) => {
        if (line === "<COLORS>")
          return (
            <div key={"colorrow"}>
              {COLOR_BLOCKS.map((color, i) => (
                <span
                  key={color}
                  style={{
                    background: color,
                    display: "inline-block",
                    width: 30,
                    height: 20,
                    marginRight: 3,
                    borderRadius: 4,
                  }}
                ></span>
              ))}
            </div>
          );
        return (
          <div key={idx} style={{ color: idx <= 4 ? "#41b6ff" : "#e6e6e6" }}>{line}</div>
        );
      }),
      <br key="neobr"/>,
    ];
  }

  useEffect(() => {
    if (open) {
      setHistory(getNeofetchBlock());
      setCwd("~");
      setCmdHistory([]);
      setCmdIndex(-1);
      setFS(INIT_FS);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [open]);

  // Draggable
  useEffect(() => {
    if (!dragging) return;
    function handleMove(e) {
      setPos((prev) => ({
        x: Math.min(Math.max(prev.x + e.movementX, 0), window.innerWidth - size.w),
        y: Math.min(Math.max(prev.y + e.movementY, 0), window.innerHeight - 50),
      }));
    }
    function stopDrag() { setDragging(false); }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [dragging, size.w]);

  // Resizable
  useEffect(() => {
    if (!resizing) return;
    function handleMove(e) {
      const dx = e.clientX - sizeStart.current.x;
      const dy = e.clientY - sizeStart.current.y;
      setSize((prev) => ({
        w: Math.max(450, sizeStart.current.w + dx),
        h: Math.max(240, sizeStart.current.h + dy),
      }));
    }
    function stopResize() { setResizing(false); }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopResize);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [resizing]);

  // Scroll to bottom after new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Command handler (with simulation)
  function handleCommand(cmd) {
    let trimmed = cmd.trim();
    if (!trimmed) return;
    setCmdHistory(h => [...h, trimmed]);
    setCmdIndex(-1);
    let out = [];
    let exitCode = 0;
    // Fake parsing: handle "cd", "ls", "pwd", "cat", etc.
    if (trimmed === "help") out = [
      ...COMMANDS.map(c => c.padEnd(11) + "- " + ({
        help: "Show this help message",
        whoami: "Show your user",
        ls: "List files/directories",
        cd: "Change directory",
        clear: "Clear terminal",
        pwd: "Show working directory",
        cat: "Show file contents",
        echo: "Print text",
        mkdir: "Make new directory"
      }[c] || ""))
    ];
    else if (trimmed === "whoami") out = ["chris"];
    else if (trimmed === "pwd") out = [cwd];
    else if (trimmed.startsWith("cd")) {
      let parts = trimmed.split(/\s+/);
      if (parts.length < 2 || parts[1] === "~") {
        setCwd("~");
        out = [];
      } else if (parts[1] === "..") {
        setCwd((prev) => {
          let segs = prev.split("/").filter(Boolean);
          return segs.length <= 1 ? "~" : "/" + segs.slice(0, -1).join("/");
        });
      } else {
        let newPath = parts[1].startsWith("/") ? parts[1] : (cwd === "~" ? "/" + parts[1] : cwd + "/" + parts[1]);
        let fsPtr = findPath(fs, "", newPath);
        if (fsPtr && fsPtr.type === "dir") {
          setCwd(newPath);
        } else {
          out = [`cd: ${parts[1]}: No such directory`];
          exitCode = 1;
        }
      }
    }
    else if (trimmed === "ls") {
      let fsPtr = findPath(fs, "", cwd);
      if (fsPtr) {
        let children = fsPtr.children ? Object.keys(fsPtr.children) : [];
        out = [...children, ...PROJECTS];
      } else {
        out = ["ls: cannot access directory"];
        exitCode = 1;
      }
    }
    else if (trimmed.startsWith("cat")) {
      let parts = trimmed.split(/\s+/);
      if (parts.length < 2) {
        out = ["cat: missing file operand"];
        exitCode = 1;
      } else {
        let fsPtr = findPath(fs, cwd, parts[1]);
        if (fsPtr && fsPtr.type === "file") {
          out = [fsPtr.content];
        } else {
          out = [`cat: ${parts[1]}: No such file`];
          exitCode = 1;
        }
      }
    }    
    else if (trimmed.startsWith("echo ")) {
      out = [trimmed.slice(5)];
    }
    else if (trimmed.startsWith("mkdir ")) {
      let parts = trimmed.split(/\s+/);
      let dirName = parts[1];
      let fsPtr = findPath(fs, "", cwd);
      if (fsPtr && fsPtr.children && !fsPtr.children[dirName]) {
        fsPtr.children[dirName] = { type: "dir", children: {} };
        setFS({ ...fs });
        out = [];
      } else {
        out = [`mkdir: cannot create directory '${dirName}'`];
        exitCode = 1;
      }
    }
    else if (trimmed === "clear") {
      setHistory(getNeofetchBlock());
      setCwd("~");
      setRetcode(0);
      return;
    }
    else if (trimmed === "ls projects" || trimmed === "ls /projects" || trimmed === "ls ~/projects") {
      out = PROJECTS;
    }
    else if (PROJECTS.includes(trimmed)) {
      out = [`Switching to project: ${trimmed}`];
      setCwd("/" + trimmed);
    }
    else {
      out = [`command not found: ${trimmed}`];
      exitCode = 127;
    }

    setHistory((h) => [
      ...h,
      <span key={h.length}>
        <TerminalPrompt dir={cwd} retcode={retcode !== 0 ? retcode : undefined} />{" "}
        <span style={{ color: "#e6e6e6" }}>{cmd}</span>
      </span>,
      ...out,
    ]);
    setRetcode(exitCode);
  }

  // Command history and tab-complete
  function handleInputKey(e) {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return;
      setCmdIndex((prev) => {
        const next = prev < 0 ? cmdHistory.length - 1 : Math.max(0, prev - 1);
        setInput(cmdHistory[next] || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      if (cmdHistory.length === 0) return;
      setCmdIndex((prev) => {
        const next = prev >= cmdHistory.length - 1 ? -1 : prev + 1;
        setInput(next === -1 ? "" : cmdHistory[next] || "");
        return next;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      let candidates = [...COMMANDS, ...PROJECTS];
      let matches = candidates.filter(c => c.startsWith(input));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) {
        setHistory(h => [...h, matches.join("    ")]);
      }
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 2001,
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        background: "#191b20",
        borderRadius: "14px",
        boxShadow: "0 12px 42px #1e2127ee",
        border: "2px solid #363d44",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Window header bar (drag handle) */}
      <div
        style={{
          background: "#23262c",
          color: "#c2fabe",
          fontWeight: 800,
          fontSize: 18,
          padding: "5px 0 4px 14px",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          display: "flex",
          alignItems: "center",
          cursor: "grab",
          borderBottom: "1.5px solid #262a33",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging(true);
          dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }}
      >
        <span style={{ flex: 1 }}>bashywashy</span>
        <span
          onClick={onClose}
          title="Close terminal"
          style={{
            marginRight: 16,
            fontWeight: 900,
            color: "#fd6868",
            fontSize: 26,
            cursor: "pointer",
            borderRadius: 4,
            padding: "0 10px",
          }}
        >
          ×
        </span>
      </div>
      {/* Terminal output */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          background: "#181b1e",
          color: "#66ff33",
          fontSize: 16,
          padding: "16px 22px 7px 28px",
          overflowY: "auto",
          whiteSpace: "pre",
          fontFamily: "monospace",
          borderBottom: "1.5px solid #252a2f",
        }}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {history.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      {/* Prompt/input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
          setInput("");
        }}
        style={{
          background: "#181b1e",
          padding: "0.5em 1.2em 0.9em 1.2em",
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
        }}
      >
        <TerminalPrompt dir={cwd} retcode={retcode !== 0 ? retcode : undefined} />
        <input
          ref={inputRef}
          style={{
            flex: 1,
            marginLeft: 9,
            fontSize: 17,
            background: "none",
            color: "#faffff",
            border: "none",
            outline: "none",
            fontFamily: "monospace",
            padding: "0.16em 0.1em",
            caretColor: "#41b6ff",
            animation: "blink 1s step-end infinite",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKey}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      {/* Resize handle */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setResizing(true);
          sizeStart.current = { w: size.w, h: size.h, x: e.clientX, y: e.clientY };
        }}
        style={{
          position: "absolute",
          right: 2,
          bottom: 2,
          width: 22,
          height: 22,
          cursor: "nwse-resize",
          zIndex: 20,
          borderBottomRightRadius: 14,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <svg width="22" height="22">
          <polyline
            points="6,20 18,20 18,8"
            style={{ fill: "none", stroke: "#7ecad7", strokeWidth: 2.2 }}
          />
        </svg>
      </div>
      {/* Blinking caret (for effect, if you want) */}
      <style>
        {`
          @keyframes blink {
            0%,100% { border-right: 2.5px solid #41b6ff; }
            50% { border-right: 2.5px solid transparent; }
          }
        `}
      </style>
    </div>
  );
}

export default TerminalModal;
