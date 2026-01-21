export function SecurityBadge() {
  return (
    <div className="mt-8 p-4 bg-linear-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800/30">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-900/30 rounded-lg">
          <span className="text-xl">🛡️</span>
        </div>
        <p className="text-sm font-medium">Your data is protected</p>
      </div>
    </div>
  );
}
