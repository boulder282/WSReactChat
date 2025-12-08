import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const [messageValue, setMessageValue] = useState(""); // Исправлено название и инициализация
  const navigate = useNavigate();

  useEffect(() => {
    // Подключаемся к WebSocket серверу
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Очистка при размонтировании
    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return; // Не отправляем пустые сообщения

    if (ws.current && isConnected) {
      const message = {
        text: text,
        username: "User",
        timestamp: new Date().toISOString(),
      };
      ws.current.send(JSON.stringify(message));
      setMessageValue(""); // Очищаем поле ввода после отправки
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && messageValue.trim()) {
      sendMessage(messageValue);
    }
  };

  return (
    <div>
      <div>Status: {isConnected ? "Connected" : "Disconnected"}</div>

      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === "system" ? (
              <div>System: {msg.message}</div>
            ) : (
              <div>
                {msg.username}: {msg.text || msg.message}
              </div>
            )}
          </div>
        ))}
      </div>

      <input
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write your message"
        disabled={!isConnected}
      />

      <button
        onClick={() => sendMessage(messageValue)}
        disabled={!isConnected || !messageValue.trim()}
      >
        Send Message
      </button>
      <button
        onClick={() => {
          navigate("/userinfo");
        }}
      >
        navigate to user info page
      </button>
    </div>
  );
};
