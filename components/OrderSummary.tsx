import { mockOrder } from "@/lib/mockData";

export default function OrderSummary() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Tóm tắt đơn hàng</h2>

      <div className="space-y-3">
        {mockOrder.items.map((item, i) => (
          <div key={i} className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-700">{item.name}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
            <span className="text-sm font-medium text-gray-700">
              ${item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tạm tính</span>
          <span>${mockOrder.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Thuế (10%)</span>
          <span>${mockOrder.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
          <span>Tổng cộng</span>
          <span>${mockOrder.total.toFixed(2)} {mockOrder.currency}</span>
        </div>
      </div>
    </div>
  );
}
