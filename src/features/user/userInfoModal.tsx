import { Avatar } from "@mui/material";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  isConnected?: boolean;
}

const UserInfoModal = ({ open, onClose, isConnected }: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="
            w-full max-w-md
            bg-[#17212b]
            rounded-2xl
            px-4 pb-4 pt-4
            shadow-xl
          "
        >
          <div className="flex flex-col items-center text-center mb-5">
            <Avatar
              style={{ height: 100, width: 100 }}
              src={localStorage.getItem("userAvatar") ?? ""}
            />

            <h2 className="text-base font-semibold text-white">Username</h2>

            <p className="text-sm text-gray-400">
              {isConnected ? "online" : "offline"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <button className="tg-action">✏️ Edit profile</button>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="
              w-full mt-3 py-2
              text-sm
              text-gray-400
              hover:text-white
              transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfoModal;
