import { mockProfileUser } from "@/lib/mockData";

type ProfileUser = typeof mockProfileUser;

export default function ProfileHeader({ user }: { user: ProfileUser }) {
  return (
    <div
      className="relative px-5 pt-12 pb-6"
      style={{ background: "linear-gradient(135deg, #D82D8B 0%, #A91C6B 100%)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-white font-semibold text-base">Tôi</span>
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative p-1">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {user.notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {user.notificationCount}
              </span>
            )}
          </button>
          {/* Settings */}
          <button className="p-1">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* User info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/40">
          <span className="text-white font-bold text-lg">{user.avatar}</span>
        </div>
        {/* Name & tier */}
        <div>
          <p className="text-white font-bold text-xl leading-tight">{user.name}</p>
          <p className="text-white/70 text-sm mt-0.5">{user.phone}</p>
          <span className="inline-flex items-center gap-1 mt-1.5 bg-yellow-400/20 border border-yellow-300/40 text-yellow-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ★ {user.tier}
          </span>
        </div>
      </div>
    </div>
  );
}
