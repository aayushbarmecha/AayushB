"use client";

import { useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ children }: { children: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative my-6">
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-white/10"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} className="overflow-x-auto rounded-xl border border-black/5 bg-[#0d1117] p-4 text-sm leading-relaxed dark:border-white/5">
        {children}
      </pre>
    </div>
  );
}
