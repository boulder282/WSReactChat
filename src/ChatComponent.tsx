import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import useUserInfoStore from "./store/userInfoStore";
import { Button } from "./components/ui/Button";
import Input from "./components/ui/Input";
import MainNavigation from "./components/LeftSideBar/Chats/Settings/MiniLeftDrawer";
import MiniLeftDrawer from "./components/LeftSideBar/Chats/Settings/MiniLeftDrawer";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const [messageValue, setMessageValue] = useState(""); // Исправлено название и инициализация
  const navigate = useNavigate();
  const { info } = useUserInfoStore();

  useEffect(() => {
    // Подключаемся к WebSocket серверу
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event: { data: string }) => {
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
        username: info.name,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-xl font-bold">C</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Chat Room</h1>
            <p className="text-gray-400">Real-time messaging</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Connection Status</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></div>
              <p className="font-semibold">
                {isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <MiniLeftDrawer />

      {/* Right Panel - Input & Actions */}
      <div className="card lg:col-span-3">
        <div className="card">
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="p-2 bg-green-900/30 rounded-lg">✉️</span>
              Send Message
            </h2>

            {/* Connection Status Card */}
            <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-300">Connection</label>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    isConnected
                      ? "bg-green-900/30 text-green-300"
                      : "bg-red-900/30 text-red-300"
                  }`}
                >
                  {isConnected ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-full h-2 rounded-full ${
                    isConnected ? "bg-green-500/30" : "bg-red-500/30"
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isConnected ? "w-full bg-green-500" : "w-1/4 bg-red-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-300">
                  Your Message
                </label>
                <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                  {messageValue.length}/500
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <Input
                  value={messageValue}
                  onChange={setMessageValue}
                  placeholder="Type your message..."
                  disabled={!isConnected}
                  onKeyDown={handleKeyDown}
                  variant="default"
                ></Input>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => sendMessage(messageValue)}
                    variant="blue"
                    isDisabled={!isConnected || !messageValue.trim()}
                  >
                    📤 Send Message
                  </Button>
                  <Button
                    variant="gray"
                    onClick={() => sendMessage(messageValue)}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} variant="purple" fullWidth>
                👤 Go to Profile Settings
              </Button>

              <div className="card">
                <p className="text-sm text-gray-300 mb-2">💡 Quick Tip</p>
                <p className="text-xs text-gray-400">
                  Press{" "}
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">
                    Enter
                  </kbd>{" "}
                  to send,{" "}
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">
                    Shift+Enter
                  </kbd>{" "}
                  for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
