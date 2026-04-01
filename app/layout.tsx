import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chấm Điểm AI — Exam Grader",
  description: "Chấm điểm bài thi tự động bằng AI. Nhập rubric và nội dung bài thi, nhận điểm số và nhận xét chi tiết ngay lập tức.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
