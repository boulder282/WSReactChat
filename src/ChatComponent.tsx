import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import useUserInfoStore from "./store/userInfoStore";

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

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Panel - Messages */}
        <div className="lg:col-span-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="p-2 bg-blue-900/30 rounded-lg">💬</span>
                Messages
              </h2>
              <div className="text-sm text-gray-400">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 bg-gray-900/60 rounded-xl p-4 border border-gray-700 overflow-y-auto max-h-[60vh]">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 italic">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${
                        msg.type === "system"
                          ? "bg-blue-900/20 border border-blue-800/30"
                          : "bg-gray-800/50"
                      }`}
                    >
                      {msg.type === "system" ? (
                        <div className="flex items-center gap-2 text-blue-300">
                          <span className="text-lg">⚡</span>
                          <div>
                            <p className="font-medium">System</p>
                            <p className="text-gray-300">{msg.message}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                              <span className="text-sm font-bold">
                                {msg.username?.[0]?.toUpperCase() || "U"}
                              </span>
                            </div>
                            <p className="font-bold text-gray-200">
                              {msg.username}
                            </p>
                            <span className="text-xs text-gray-500 ml-auto">
                              {msg.timestamp || "Just now"}
                            </span>
                          </div>
                          <p className="text-gray-300 ml-10">
                            {msg.text || msg.message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Input & Actions */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 h-full">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="p-2 bg-green-900/30 rounded-lg">✉️</span>
                Send Message
              </h2>

              {/* Connection Status Card */}
              <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl p-5 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-gray-300">
                    Connection
                  </label>
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
              <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl p-5 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-gray-300">
                    Your Message
                  </label>
                  <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                    {messageValue.length}/500
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <textarea
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your message here..."
                    disabled={!isConnected}
                    maxLength={500}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[120px] resize-none"
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => sendMessage(messageValue)}
                      disabled={!isConnected || !messageValue.trim()}
                      className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                        !isConnected || !messageValue.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:from-blue-700 hover:to-blue-800"
                      }`}
                    >
                      <span>📤</span>
                      Send Message
                    </button>
                    <button
                      onClick={() => setMessageValue("")}
                      className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/userinfo")}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="p-2 bg-purple-900/30 rounded-lg">👤</span>
                  Go to Profile Settings
                </button>

                <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-800/30">
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
    </div>
  );
};
