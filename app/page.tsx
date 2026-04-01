"use client";

import { useState, useRef } from "react";

type InputTab = "text" | "image";

interface ExamImage {
  base64: string;
  type: string;
  name: string;
  previewUrl: string;
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct = (score / total) * 100;
  const color =
    pct >= 80
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : pct >= 60
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-red-600 bg-red-50 border-red-200";
  const label = pct >= 80 ? "Xuất sắc" : pct >= 60 ? "Đạt" : "Cần cải thiện";

  return (
    <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${color}`}>
      <div className="text-center">
        <div className="text-5xl font-bold leading-none">{score}</div>
        <div className="text-sm opacity-70 mt-1">/ {total}</div>
      </div>
      <div>
        <div className="font-semibold text-lg">{label}</div>
        <div className="text-sm opacity-70">{pct.toFixed(0)}%</div>
      </div>
    </div>
  );
}

function ResultDisplay({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const scoreMatch = text.match(/SCORE:\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+)/i);
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
  const total = scoreMatch ? parseFloat(scoreMatch[2]) : null;

  const commentsPart = text.replace(/SCORE:\s*[\d.]+\s*\/\s*\d+/i, "").trim();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="font-semibold text-gray-900 text-lg mb-5">Kết Quả Chấm Điểm</h2>

      {score !== null && total !== null && (
        <div className="mb-6">
          <ScoreBadge score={score} total={total} />
        </div>
      )}

      {commentsPart ? (
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
          {commentsPart}
        </div>
      ) : isStreaming ? (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="ml-1">Đang phân tích bài thi...</span>
        </div>
      ) : null}
    </div>
  );
}

export default function GradingPage() {
  const [rubric, setRubric] = useState("");
  const [maxScore, setMaxScore] = useState(10);
  const [examText, setExamText] = useState("");
  const [examImage, setExamImage] = useState<ExamImage | null>(null);
  const [inputTab, setInputTab] = useState<InputTab>("text");
  const [result, setResult] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setExamImage({
        base64,
        type: file.type,
        name: file.name,
        previewUrl: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGrade = async () => {
    if (!rubric.trim()) {
      setError("Vui lòng nhập rubric chấm điểm.");
      return;
    }
    if (inputTab === "text" && !examText.trim()) {
      setError("Vui lòng nhập nội dung bài thi.");
      return;
    }
    if (inputTab === "image" && !examImage) {
      setError("Vui lòng tải lên ảnh bài thi.");
      return;
    }

    setError("");
    setResult("");
    setIsGrading(true);

    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rubric,
          maxScore,
          examText: inputTab === "text" ? examText : "",
          examImageBase64: inputTab === "image" ? examImage?.base64 : null,
          examImageType: inputTab === "image" ? examImage?.type : null,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Có lỗi xảy ra khi chấm điểm.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("Không thể đọc kết quả.");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResult((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi không xác định.");
    } finally {
      setIsGrading(false);
    }
  };

  const handleReset = () => {
    setResult("");
    setError("");
    setRubric("");
    setExamText("");
    setExamImage(null);
    setMaxScore(10);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center pt-10 mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Powered by Claude AI
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Chấm Điểm Bài Thi AI</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Nhập rubric và nội dung bài thi — AI sẽ chấm điểm và nhận xét chi tiết ngay lập tức.
          </p>
        </div>

        {/* Input grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Rubric panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                1
              </div>
              <h2 className="font-semibold text-gray-900">Rubric Chấm Điểm</h2>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Thang điểm tối đa:
              </label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(Math.max(1, Number(e.target.value)))}
                min={1}
                max={1000}
                className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-center focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <span className="text-sm text-gray-400">điểm</span>
            </div>

            <textarea
              value={rubric}
              onChange={(e) => setRubric(e.target.value)}
              placeholder={`Nhập tiêu chí chấm điểm (rubric)...\n\nVí dụ:\n- Nêu đúng định nghĩa: 2 điểm\n- Phân tích 3 khía cạnh: 4 điểm\n- Ví dụ minh họa phù hợp: 2 điểm\n- Kết luận rõ ràng: 2 điểm`}
              rows={11}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder-gray-300"
            />
          </div>

          {/* Exam content panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h2 className="font-semibold text-gray-900">Nội Dung Bài Thi</h2>
            </div>

            {/* Tab */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
              {(["text", "image"] as InputTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInputTab(tab)}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                    inputTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "text" ? "Nhập văn bản" : "Tải ảnh lên"}
                </button>
              ))}
            </div>

            {inputTab === "text" ? (
              <textarea
                value={examText}
                onChange={(e) => setExamText(e.target.value)}
                placeholder="Dán hoặc nhập nội dung bài thi vào đây..."
                rows={11}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder-gray-300"
              />
            ) : (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    examImage
                      ? "border-indigo-300 bg-indigo-50/50"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }`}
                >
                  {examImage ? (
                    <>
                      <div className="text-2xl mb-1">✓</div>
                      <div className="text-indigo-700 font-medium text-sm truncate max-w-xs mx-auto">
                        {examImage.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Nhấp để thay đổi</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-3">📷</div>
                      <div className="font-medium text-gray-700 mb-1 text-sm">
                        Tải ảnh bài thi lên
                      </div>
                      <div className="text-xs text-gray-400">PNG, JPG, WEBP, GIF</div>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {examImage && (
                  <img
                    src={examImage.previewUrl}
                    alt="Preview bài thi"
                    className="mt-3 rounded-xl max-h-44 object-contain w-full border border-gray-100 bg-gray-50"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleGrade}
            disabled={isGrading}
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-300 text-white font-semibold rounded-2xl transition-colors text-base"
          >
            {isGrading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Đang chấm điểm...
              </span>
            ) : (
              "Chấm điểm ngay"
            )}
          </button>
          {(result || rubric || examText || examImage) && !isGrading && (
            <button
              onClick={handleReset}
              className="px-5 py-4 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-2xl transition-colors text-sm"
            >
              Làm mới
            </button>
          )}
        </div>

        {/* Result */}
        {(result || isGrading) && (
          <ResultDisplay text={result} isStreaming={isGrading} />
        )}
      </div>
    </main>
  );
}
