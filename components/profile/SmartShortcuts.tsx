import { mockSmartShortcuts } from "@/lib/mockData";

const SHORTCUT_ICONS: Record<string, string> = {
  "Đầu tư": "📈",
  "Tiết kiệm": "🏦",
  "Bảo hiểm": "🛡️",
};

export default function SmartShortcuts({ shortcuts }: { shortcuts: typeof mockSmartShortcuts }) {
  return (
    <div className="px-4 mt-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Khám phá thêm</h2>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Dành riêng cho bạn</span>
      </div>

      {/* Shortcut list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.id}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left active:bg-gray-100"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-xl shrink-0">
              {SHORTCUT_ICONS[shortcut.name] ?? "✨"}
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{shortcut.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{shortcut.description}</p>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: "#D82D8B" }}>
                {shortcut.friendCount} bạn bè đang dùng
              </p>
            </div>
            {/* Arrow */}
            <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
