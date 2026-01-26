export function SignInHeader() {
  return (
    <div className="px-8 py-6 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-lg font-bold">🔒</span>
          </div>
          <p className="text-sm text-gray-400">Sign in to continue</p>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
  );
}
