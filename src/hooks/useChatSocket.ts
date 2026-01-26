// hooks/useChatSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";

export interface ChatMessage {
  text: string;
  username: string;
  timestamp: string;
}

export const useChatSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setIsConnected(true);

    ws.current.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => setIsConnected(false);

    return () => ws.current?.close();
  }, [url]);

  const sendMessage = useCallback((message: ChatMessage) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    ws.current.send(JSON.stringify(message));
  }, []);

  return { messages, isConnected, sendMessage };
};
