import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function TerminalFramer({
  initialText = [],
  terminalBackgroundColor = '#000',
  headerBackgroundColor   = '#222',
  textColor               = { default: '#0f0', accent: '#0f0' },
  font                    = { fontFamily:'monospace', fontSize:13 },
  inputStartCharacter     = '$',
  lineMarginBottom        = 4,
}) {
  const [lines, setLines] = useState(
    initialText.map(l => ({ ...l, currentText:'', isStreaming: true }))
  );
  const [input, setInput] = useState('');
  const contentRef = useRef(null);

  // auto-scroll
  useEffect(() => {
    contentRef.current?.scrollTo(0, contentRef.current.scrollHeight);
  }, [lines]);

  // stream a single line
  const streamLine = async (text, idx, delay=0) => {
    if (delay) await new Promise(r=>setTimeout(r, delay*1000));
    for (let i=0; i<=text.length; i++) {
      setLines(ls => ls.map((l,j)=> j===idx
        ? { ...l, currentText: text.slice(0,i) }
        : l));
      await new Promise(r=>setTimeout(r, 20));
    }
  };

  // on mount, stream all initialText
  useEffect(() => {
    (async()=>{
      for (let i=0; i<initialText.length; i++) {
        const { text, delay=0 } = initialText[i];
        await streamLine(text, i, delay);
      }
    })();
  }, []);

  // handle enter
  const onKeyDown = e => {
    if (e.key === 'Enter') {
      // preserve the entered command
      setLines(ls => [
        ...ls,
        { text:`${inputStartCharacter} ${input}`, currentText:`${inputStartCharacter} ${input}`, isStreaming:false },
        { text:'', currentText:'', isStreaming:false }
      ]);
      setInput('');
    }
  };

  return (
    <Wrapper style={{ backgroundColor: terminalBackgroundColor, fontFamily: font.fontFamily, fontSize: font.fontSize }}>
      <Header style={{ backgroundColor: headerBackgroundColor }}>
        <Circle color="#ff5f56" />
        <Circle color="#ffbd2e" />
        <Circle color="#27c93f" />
      </Header>
      <Content ref={contentRef}>
        {lines.map((l,i) => (
          <Line
            key={i}
            style={{
              marginBottom: lineMarginBottom,
              color: l.color || (l.text.startsWith(inputStartCharacter) ? textColor.accent : textColor.default)
            }}
          >
            {l.currentText}
          </Line>
        ))}
        <InputRow>
          <Prompt style={{ color: textColor.accent }}>{inputStartCharacter}</Prompt>
          <Input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </InputRow>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;
const Circle = styled.div`
  width: 12px;
  height:12px;
  border-radius:50%;
  background:${p => p.color};
  margin-right:6px;
`;
const Content = styled.div`
  flex:1;
  overflow-y:auto;
  padding:8px;
`;
const Line = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;
const InputRow = styled.div`
  display: flex;
  align-items: center;
`;
const Prompt = styled.span`
  margin-right:8px;
`;
const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  flex:1;
`;
