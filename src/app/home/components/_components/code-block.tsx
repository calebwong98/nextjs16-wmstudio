"use client";

/**
 * CodeBlock Component
 *
 * Displays code snippets with syntax highlighting appearance
 * and a copy-to-clipboard button. Uses a simple dark theme
 * that works in both light and dark modes.
 */

import { useState, useCallback } from "react";

interface CodeBlockProps {
  /** The code to display */
  code: string;
  /** Programming language for syntax hints */
  language?: string;
  /** Optional title shown above the code */
  title?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [code]);

  const lines = code.split("\n");

  return (
    <div className="rounded-xl border bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-zinc-700" />
          </div>
          {title && (
            <span className="text-sm text-zinc-400 font-mono">{title}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <CheckIcon className="size-3.5" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="size-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-zinc-600 w-8 flex-shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Copy icon
 */
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
    </svg>
  );
}

/**
 * Check icon for copied state
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
