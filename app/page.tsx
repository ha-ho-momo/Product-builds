import PaymentForm from "@/components/PaymentForm";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-1">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Bảo mật · SSL Encrypted
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Nâng cấp lên Premium</h1>
          <p className="text-gray-500 text-sm">Hoàn tất thanh toán để kích hoạt tài khoản của bạn</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8">
          <PaymentForm />
        </div>
      </div>
    </main>
  );
}
