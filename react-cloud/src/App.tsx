import { useEffect, useState, useRef } from "react";

const CLOUD_WS_URL = "wss://faltu-6x11.onrender.com"; // your cloud WS

export default function CloudApp() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  // WebSocket type added
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(CLOUD_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => console.log("🌍 Cloud React connected to Cloud WS");

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, "Cloud Received: " + event.data]);
    };

    ws.onclose = () => console.log("Cloud WS closed");
    ws.onerror = (err) => console.log("Cloud WS error:", err);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
      setMessages((prev) => [...prev, "Cloud Sent: " + text]);
      setText("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌍 Cloud WebSocket App</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </div>
  );
}
