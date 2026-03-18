import { mockProfileUser } from "@/lib/mockData";

type ProfileUser = typeof mockProfileUser;

function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + " ₫";
}

export default function FinancialSnapshot({ user }: { user: ProfileUser }) {
  return (
    <div className="mx-4 -mt-3 bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden">
      {/* Pink accent bar */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #D82D8B, #A91C6B)" }} />

      <div className="px-5 pt-4 pb-5">
        {/* Balance */}
        <p className="text-xs text-gray-400 font-medium mb-1">Số dư ví MoMo</p>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{formatVND(user.balance)}</p>

        {/* Points & cashback */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Điểm thưởng</p>
            <p className="text-base font-bold text-gray-800">{user.points.toLocaleString("vi-VN")}</p>
            <p className="text-[10px] text-gray-400">điểm tích lũy</p>
          </div>
          <div className="bg-pink-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Hoàn tiền chờ</p>
            <p className="text-base font-bold" style={{ color: "#D82D8B" }}>{formatVND(user.cashbackPending)}</p>
            <p className="text-[10px] text-gray-400">sẵn sàng nhận</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-2.5 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90 active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, #D82D8B, #A91C6B)" }}
          >
            Nạp tiền
          </button>
          <button
            className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-colors hover:bg-pink-50 active:scale-[0.97]"
            style={{ borderColor: "#D82D8B", color: "#D82D8B" }}
          >
            Rút tiền
          </button>
        </div>
      </div>
    </div>
  );
}
