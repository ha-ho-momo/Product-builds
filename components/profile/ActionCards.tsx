import { mockActionCards } from "@/lib/mockData";

type ActionCard = (typeof mockActionCards)[number];

const CARD_CONFIG = {
  bill: {
    icon: "⚡",
    ctaLabel: "Thanh toán ngay",
    iconBg: "bg-amber-50",
  },
  cashback: {
    icon: "💰",
    ctaLabel: "Nhận ngay",
    iconBg: "bg-green-50",
  },
  offer: {
    icon: "🎁",
    ctaLabel: "Xem ưu đãi",
    iconBg: "bg-purple-50",
  },
};

function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + " ₫";
}

function ActionCard({ card }: { card: ActionCard }) {
  const config = CARD_CONFIG[card.type];
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center text-xl shrink-0`}>
          {config.icon}
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900">{card.title}</p>
            {card.urgent && (
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight">
                SẮP ĐẾN HẠN
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{card.description}</p>
          {card.amount && (
            <p className="text-base font-bold text-gray-900 mt-1">{formatVND(card.amount)}</p>
          )}
          {card.dueDate && (
            <p className="text-xs text-red-500 font-medium mt-0.5">Hạn: {card.dueDate}</p>
          )}
        </div>
        {/* CTA */}
        <button
          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-xl text-white transition-opacity hover:opacity-90 active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #D82D8B, #A91C6B)" }}
        >
          {config.ctaLabel}
        </button>
      </div>
    </div>
  );
}

export default function ActionCards({ cards }: { cards: typeof mockActionCards }) {
  return (
    <div className="px-4 mt-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Dành cho bạn</h2>
        <button className="text-xs font-medium" style={{ color: "#D82D8B" }}>
          Xem tất cả →
        </button>
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <ActionCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
