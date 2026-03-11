"use client";

import { useRouter } from "next/navigation";
import { mockErrorMessages } from "@/lib/mockData";

export default function ErrorState() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Đã xảy ra lỗi</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            {mockErrorMessages.crash}
          </p>
        </div>

        {/* Error code */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-left space-y-1">
          <p className="text-xs text-gray-400 font-mono">Error details</p>
          <p className="text-xs font-mono text-red-600 break-all">
            TypeError: Cannot read properties of undefined (reading &apos;paymentMethod&apos;)
          </p>
          <p className="text-xs font-mono text-gray-400">
            at PaymentScreen.tsx:42:18
          </p>
        </div>

        {/* What to do */}
        <div className="text-left space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Bạn có thể thử:</p>
          <ul className="space-y-1.5">
            {[
              "Tải lại trang và thử lại",
              "Kiểm tra kết nối internet",
              "Xóa cache trình duyệt",
              "Liên hệ support nếu vẫn gặp lỗi",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 bg-gray-100 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-600 font-medium">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Thử lại
          </button>
          <button
            onClick={() => alert("Đang kết nối với support...")}
            className="w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Liên hệ hỗ trợ
          </button>
        </div>

        <p className="text-xs text-gray-300">
          Mã lỗi: ERR_PAYMENT_CRASH_001 · {new Date().toLocaleString("vi-VN")}
        </p>
      </div>
    </div>
  );
}
