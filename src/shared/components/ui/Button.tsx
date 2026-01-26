type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "blue" | "green" | "purple" | "red" | "gray";
  fullWidth?: boolean;
  isDisabled?: boolean;
};

const variantClasses = {
  blue: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
  green:
    "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
  purple:
    "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
  red: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
  gray: "px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition",
};
const isDisabledClasses = {
  "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100": true,
};

export function Button({
  children,
  onClick,
  variant = "blue",
  fullWidth = false,
  isDisabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        px-6 py-3 rounded-xl font-medium transition-all
        ${fullWidth ? "w-full" : ""}
        hover:scale-105 active:scale-95
        ${variantClasses[variant]}
        ${isDisabled ? Object.keys(isDisabledClasses).join(" ") : ""}
      `}
    >
      {children}
    </button>
  );
}
