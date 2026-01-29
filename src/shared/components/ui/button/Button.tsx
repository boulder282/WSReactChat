import React from "react";
import "./Button.css";

type ButtonVariant = "blue" | "green" | "purple" | "red" | "gray" | "outline";

type ButtonSize = "small" | "medium" | "large"; // ← added

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize; // ← new prop
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = "blue",
  size = "medium", // default = medium
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`chat-button ${variant} ${size} ${fullWidth ? "full-width" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
