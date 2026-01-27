import React from "react";
import "./input.css";
type InputVariant = "default" | "error" | "success";

type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  className?: string;
};

const Input = ({
  value,
  onChange,
  placeholder,
  disabled,
  maxLength,
  onKeyDown,
  variant = "default",
  className = "",
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      className={`chat-input ${variant} ${className}`}
    />
  );
};

export default Input;
