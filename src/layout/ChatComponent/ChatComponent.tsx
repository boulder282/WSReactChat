import { useState, useCallback } from "react";
import useUserInfoStore from "../../store/userInfoStore";
import MiniLeftDrawer from "../LeftDrawer.tsx/MiniLeftDrawer";
import { useChatSocket } from "../../hooks/useChatSocket";
import "./chat.styles.css";
import Input from "@/shared/components/ui/input/Input";

export const ChatComponent = () => {
  const [messageValue, setMessageValue] = useState("");
  const { info } = useUserInfoStore();

  const { messages, isConnected, sendMessage } = useChatSocket(
    "ws://localhost:3000",
  );

  const handleSend = useCallback(() => {
    if (!messageValue.trim() || !isConnected || !info.name) return;

    sendMessage({
      text: messageValue,
      username: info.name,
      timestamp: new Date().toISOString(),
    });

    setMessageValue("");
  }, [messageValue, isConnected, sendMessage, info.name]);

  return (
    <div className="chat-root">
      <MiniLeftDrawer />

      <div className="chat-main">
        <div className="chat-header">
          <div>
            <h3 className="chat-title">Chat</h3>
            <p className="chat-status">{isConnected ? "online" : "offline"}</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">Select a chat to start messaging</div>
          )}

          {messages
            .filter((msg) => msg?.text && msg.text.trim() !== "") // safe check
            .map((msg, i) => {
              const isMine = msg.username === info.name;

              return (
                <div
                  key={i}
                  className={`chat-message ${isMine ? "chat-message--mine" : "chat-message--other"}`}
                >
                  {!isMine && (
                    <p className="chat-message-user">{msg.username}</p>
                  )}
                  <p>{msg.text}</p>
                </div>
              );
            })}
        </div>

        <div className="chat-input-wrapper">
          <div className="chat-input-row">
            <Input
              value={messageValue}
              onChange={(e) => setMessageValue(e)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!isConnected}
              placeholder={isConnected ? "Write a message..." : "Connecting..."}
            />

            <button
              onClick={handleSend}
              disabled={!isConnected}
              className="chat-send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
