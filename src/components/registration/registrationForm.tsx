import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormValidation } from "../../hooks/useFormValidation";
import { setWithExpiry } from "../../functions/setWithExpiry";
import { getWithExpiry } from "../../functions/getWithExpiry";

export default function SignIn() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateForm,
  } = useFormValidation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userEmail = await getWithExpiry("userEmail");
        const userPassword = await getWithExpiry("userPassword");

        // Если пользователь уже залогинен - редирект на главную
        if (userEmail && userPassword) {
          navigate("/");
        }
        // Если не залогинен - остаемся на странице sign in
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleRedirection = () => {
    navigate("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = validateForm(emailValue, passwordValue);

    if (!validationResult.isValid) {
      return;
    }

    try {
      // Сохраняем данные асинхронно
      await setWithExpiry("userEmail", emailValue, 600000); // 10 минут
      await setWithExpiry("userPassword", passwordValue, 600000);

      console.log("Valid data:", validationResult.data);

      // Только после успешного сохранения делаем редирект
      handleRedirection();
    } catch (error) {
      console.error("Error saving credentials:", error);
      // Можно показать сообщение об ошибке пользователю
    }
  };

  // Показываем лоадер пока проверяется аутентификация
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

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
