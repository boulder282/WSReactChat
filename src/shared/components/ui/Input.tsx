import React from "react";

type InputVariant = "default" | "error" | "success";

const variantClasses: Record<InputVariant, string> = {
  default: "border-gray-600 focus:ring-blue-500",
  error: "border-red-600 focus:ring-red-500",
  success: "border-green-600 focus:ring-green-500",
};

type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
};

const Input = ({
  value,
  onChange,
  placeholder,
  disabled,
  maxLength,
  onKeyDown,
  variant = "default",
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      className={`
        w-full
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
    />
  );
};

export default Input;
