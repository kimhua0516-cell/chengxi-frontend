import { useEffect, useRef, useState } from 'react';
import './ChatDemo.css';

const SCRIPT = [
  { from: 'user', text: '你好，我的订单还没发货，能查一下吗？' },
  { from: 'bot', text: '当然可以～已经为您查到订单 #10248，预计明天上午发出 📦' },
  { from: 'user', text: '好的，发货后能通知我吗？' },
  { from: 'bot', text: '没问题，发货后会第一时间短信通知您，还有什么可以帮您？' },
];

export default function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function play() {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const isBot = SCRIPT[i].from === 'bot';
        if (isBot) {
          setTyping(true);
          await wait(900);
          if (cancelled) return;
          setTyping(false);
        } else {
          await wait(500);
        }
        setVisibleCount(i + 1);
        await wait(1000);
      }
      await wait(1800);
      if (!cancelled) {
        setVisibleCount(0);
        play();
      }
    }

    play();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="chat-demo" ref={containerRef}>
      <div className="chat-demo-header">
        <span className="chat-demo-dot" />
        <div>
          <p className="chat-demo-title">晨曦 AI 客服</p>
          <p className="chat-demo-status">在线 · 平均响应 2 秒</p>
        </div>
      </div>
      <div className="chat-demo-body">
        {SCRIPT.slice(0, visibleCount).map((m, i) => (
          <div key={i} className={`chat-bubble chat-bubble-${m.from}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="chat-bubble chat-bubble-bot chat-bubble-typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
