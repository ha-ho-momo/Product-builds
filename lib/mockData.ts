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

// Profile Tab (Traffic Hub) mock data
export const mockProfileUser = {
  name: "Nguyễn Văn A",
  phone: "0901 234 567",
  tier: "MoMo Gold",
  avatar: "NVA",
  balance: 2_450_000,
  points: 1_250,
  cashbackPending: 85_000,
  notificationCount: 3,
};

export const mockActionCards = [
  {
    id: 1,
    type: "bill" as const,
    title: "Tiền điện tháng 3",
    amount: 450_000,
    dueDate: "25/03",
    description: "EVN HCMC - Sắp đến hạn",
    urgent: true,
  },
  {
    id: 2,
    type: "cashback" as const,
    title: "Hoàn tiền chưa nhận",
    amount: 85_000,
    description: "Từ 5 giao dịch tuần trước",
    urgent: false,
  },
  {
    id: 3,
    type: "offer" as const,
    title: "Ưu đãi dành riêng cho bạn",
    amount: null,
    description: "Mua sắm tại Lazada hoàn 15%",
    urgent: false,
  },
];

export const mockSmartShortcuts = [
  { id: 1, name: "Đầu tư", description: "Sinh lời từ 6.5%/năm", friendCount: 12 },
  { id: 2, name: "Tiết kiệm", description: "Gửi linh hoạt, rút bất kỳ", friendCount: 8 },
  { id: 3, name: "Bảo hiểm", description: "Bảo vệ sức khỏe từ 15K/ngày", friendCount: 5 },
];

export const mockSocialActivity = [
  { id: 1, friend: "Trần Minh", avatar: "TM", action: "vừa đầu tư vào", feature: "MoMo Fund", timeAgo: "2 phút trước" },
  { id: 2, friend: "Lê Thu Hà", avatar: "LH", action: "nhận hoàn tiền từ", feature: "MoMo Pay", timeAgo: "1 giờ trước" },
  { id: 3, friend: "Phạm Dũng", avatar: "PD", action: "mua bảo hiểm", feature: "MoMo Shield", timeAgo: "3 giờ trước" },
];
