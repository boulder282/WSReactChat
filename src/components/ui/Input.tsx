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
<<<<<<<< HEAD:src/shared/components/ui/input/Input.tsx
      className={`chat-input ${variant} ${className}`}
========
      className={`
        bg-gray-800
        border
        rounded-xl
        px-4 py-3
        transition
        focus:outline-none
        focus:ring-2
        ${variantClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
>>>>>>>> main:src/components/ui/Input.tsx
    />
  );
};

export default Input;
