"use client";
import dynamic from "next/dynamic";

const TinyEditor = dynamic(() => import("./TinyEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[240px] bg-gray-50 border border-gray-200 rounded animate-pulse" />
  ),
});

export default function RichTextEditor({ value, onChange, error }) {
  return (
    <div className={`rounded border ${error ? "border-red-300" : "border-gray-200"} overflow-hidden`}>
      <TinyEditor value={value} onChange={onChange} />
    </div>
  );
}
