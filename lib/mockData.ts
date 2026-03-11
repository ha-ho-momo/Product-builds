export const mockOrder = {
  id: "ORD-2024-001",
  plan: "Premium",
  items: [
    { name: "Premium Subscription", description: "1 year access", price: 99.99 },
    { name: "Priority Support", description: "24/7 support", price: 19.99 },
  ],
  subtotal: 119.98,
  tax: 12.00,
  total: 131.98,
  currency: "USD",
};

export const mockUser = {
  name: "Nguyen Van A",
  email: "user@example.com",
  tier: "premium",
};

export const mockErrorMessages = {
  crash: "Màn hình thanh toán gặp lỗi không mong muốn. Chúng tôi đã ghi nhận sự cố này.",
  cardDeclined: "Thẻ của bạn bị từ chối. Vui lòng kiểm tra lại thông tin thẻ.",
  networkError: "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
};
