"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OrderSummary from "./OrderSummary";
import { mockUser } from "@/lib/mockData";

type FormState = "idle" | "loading" | "success";

export default function PaymentForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>("idle");

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.cardName.trim()) newErrors.cardName = "Vui lòng nhập tên chủ thẻ";
    if (form.cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Số thẻ phải có 16 chữ số";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      newErrors.expiry = "Định dạng MM/YY không hợp lệ";
    if (form.cvv.length !== 3) newErrors.cvv = "CVV phải có 3 chữ số";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setState("loading");
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Thanh toán thành công!</h2>
        <p className="text-gray-500 text-sm">Cảm ơn bạn đã nâng cấp lên Premium.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Form */}
      <div className="space-y-6">
        {/* User info */}
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          <div className="w-9 h-9 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
            {mockUser.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{mockUser.name}</p>
            <p className="text-xs text-gray-400">{mockUser.email}</p>
          </div>
          <span className="ml-auto text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
            Premium
          </span>
        </div>

        {/* Payment form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên chủ thẻ
            </label>
            <input
              type="text"
              name="cardName"
              value={form.cardName}
              onChange={handleChange}
              placeholder="NGUYEN VAN A"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.cardName ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.cardName && (
              <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số thẻ
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.cardNumber ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs font-mono">
                VISA
              </span>
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hết hạn
              </label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.expiry ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.expiry && (
                <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="•••"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.cvv ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.cvv && (
                <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state === "loading" ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Đang xử lý...
              </>
            ) : (
              "Thanh toán ngay"
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Thanh toán được bảo mật bởi SSL 256-bit
          </div>
        </form>

        {/* Simulate error button */}
        <div className="border-t border-dashed border-gray-200 pt-4">
          <p className="text-xs text-gray-400 mb-2 text-center">Dev tools</p>
          <button
            onClick={() => router.push("/error-state")}
            className="w-full py-2 border border-red-200 text-red-400 text-xs rounded-lg hover:bg-red-50 transition-colors"
          >
            Simulate crash → Error screen
          </button>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div>
        <OrderSummary />
      </div>
    </div>
  );
}
