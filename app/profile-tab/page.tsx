import ProfileHeader from "@/components/profile/ProfileHeader";
import FinancialSnapshot from "@/components/profile/FinancialSnapshot";
import ActionCards from "@/components/profile/ActionCards";
import SmartShortcuts from "@/components/profile/SmartShortcuts";
import SocialProof from "@/components/profile/SocialProof";
import {
  mockProfileUser,
  mockActionCards,
  mockSmartShortcuts,
  mockSocialActivity,
} from "@/lib/mockData";

export default function ProfileTabPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-8 px-4">
      {/* Phone frame */}
      <div className="w-full max-w-[390px] bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl shadow-black/20 border border-gray-200">
        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: "844px" }}>
          {/* Status bar placeholder */}
          <div
            className="flex items-center justify-between px-6 pt-3 pb-1"
            style={{ background: "linear-gradient(135deg, #D82D8B 0%, #A91C6B 100%)" }}
          >
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
              </svg>
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="11" rx="2" stroke="currentColor" strokeWidth={2} fill="none" />
                <rect x="22" y="10" width="2" height="5" rx="1" fill="currentColor" />
                <rect x="4" y="9" width="14" height="7" rx="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Profile header */}
          <ProfileHeader user={mockProfileUser} />

          {/* Financial snapshot (overlaps header) */}
          <FinancialSnapshot user={mockProfileUser} />

          {/* Personalized action cards */}
          <ActionCards cards={mockActionCards} />

          {/* Smart shortcuts */}
          <SmartShortcuts shortcuts={mockSmartShortcuts} />

          {/* Social proof */}
          <SocialProof activities={mockSocialActivity} />

          {/* Bottom tab bar */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around">
            {[
              { label: "Trang chủ", icon: "🏠", active: false },
              { label: "Dịch vụ", icon: "⚡", active: false },
              { label: "QR", icon: "◉", active: false, qr: true },
              { label: "Ví", icon: "💳", active: false },
              { label: "Tôi", icon: "👤", active: true },
            ].map((tab) => (
              <button
                key={tab.label}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors hover:bg-gray-50"
              >
                {tab.qr ? (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg -mt-5 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #D82D8B, #A91C6B)" }}
                  >
                    {tab.icon}
                  </div>
                ) : (
                  <span className="text-lg leading-tight">{tab.icon}</span>
                )}
                <span
                  className={`text-[10px] font-medium ${tab.active ? "" : "text-gray-400"}`}
                  style={tab.active ? { color: "#D82D8B" } : {}}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
