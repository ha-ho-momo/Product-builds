import { mockSocialActivity } from "@/lib/mockData";

const AVATAR_COLORS = ["bg-blue-400", "bg-violet-400", "bg-teal-400", "bg-orange-400"];

export default function SocialProof({ activities }: { activities: typeof mockSocialActivity }) {
  return (
    <div className="px-4 mt-5 mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Bạn bè của bạn</h2>
        <button className="text-xs font-medium" style={{ color: "#D82D8B" }}>
          Xem thêm →
        </button>
      </div>

      {/* Activity feed */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 px-4 py-3.5 ${index < activities.length - 1 ? "border-b border-gray-50" : ""}`}
          >
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {activity.avatar}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 leading-snug">
                <span className="font-semibold text-gray-900">{activity.friend}</span>
                {" "}{activity.action}{" "}
                <span
                  className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: "#D82D8B" }}
                >
                  {activity.feature}
                </span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{activity.timeAgo}</p>
            </div>
          </div>
        ))}

        {/* Footer nudge */}
        <div className="px-4 py-3 bg-pink-50 border-t border-pink-100">
          <p className="text-xs text-center" style={{ color: "#A91C6B" }}>
            🔥 <strong>12 bạn bè</strong> đã thực hiện giao dịch tuần này
          </p>
        </div>
      </div>
    </div>
  );
}
