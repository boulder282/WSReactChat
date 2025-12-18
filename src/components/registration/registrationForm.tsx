import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormValidation } from "../../hooks/useFormValidation";
import useUserInfoStore from "../../store/userInfoStore";

export default function SignIn() {
  const { setInfo } = useUserInfoStore();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [usernameValue, setUsernameValue] = useState<string>("");
  const navigate = useNavigate();
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateForm,
  } = useFormValidation();
  const isUsernameValid = usernameValue.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(emailValue, passwordValue);
    if (!validation.isValid) return;

    try {
      const res = await fetch("/api/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          username: usernameValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      setInfo({
        name: usernameValue,
      });
      navigate("/"); // logged in
    } catch (err) {
      console.error(err);
    }
  };

  // Показываем лоадер пока проверяется аутентификация

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-lg font-bold">🔒</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sign in to continue</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-5xl">
            {/* Right Panel - Login Form */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-xl">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Sign In</h2>
                  <p className="text-gray-400">
                    Enter your credentials to continue
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-300">
                      Username
                    </label>
                    {!isUsernameValid && usernameValue && (
                      <span className="text-xs px-3 py-1 bg-red-900/30 text-red-300 rounded-full">
                        Min 3 chars
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={usernameValue}
                      onChange={(e) => setUsernameValue(e.target.value)}
                      className={`w-full bg-gray-900 border ${
                        !isUsernameValid && usernameValue
                          ? "border-red-500/50"
                          : "border-gray-600"
                      } rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500`}
                      placeholder="your_username"
                      required
                    />
                    <div className="absolute right-4 top-4">
                      <span className="text-gray-500">👤</span>
                    </div>
                  </div>

                  {!isUsernameValid && usernameValue && (
                    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800/30">
                      <span>⚠️</span>
                      <span>Username must be at least 3 characters</span>
                    </div>
                  )}
                </div>
                {/* Email Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-300">
                      Email Address
                    </label>
                    {emailError && (
                      <span className="text-xs px-3 py-1 bg-red-900/30 text-red-300 rounded-full">
                        Invalid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className={`w-full bg-gray-900 border ${
                        emailError ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500`}
                      placeholder="your@email.com"
                      required
                    />
                    <div className="absolute right-4 top-4">
                      <span className="text-gray-500">📧</span>
                    </div>
                  </div>
                  {emailErrorMessage && (
                    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800/30">
                      <span>⚠️</span>
                      <span>{emailErrorMessage}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-300">
                      Password
                    </label>
                    {passwordError && (
                      <span className="text-xs px-3 py-1 bg-red-900/30 text-red-300 rounded-full">
                        Too short
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      className={`w-full bg-gray-900 border ${
                        passwordError ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500`}
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute right-4 top-4">
                      <span className="text-gray-500">🔑</span>
                    </div>
                  </div>
                  {passwordErrorMessage && (
                    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800/30">
                      <span>⚠️</span>
                      <span>{passwordErrorMessage}</span>
                    </div>
                  )}
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                  <span>→</span>
                  Sign In to Messenger
                </button>
              </form>

              {/* Security Badge */}
              <div className="mt-8 p-4 bg-linear-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Your data is protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
