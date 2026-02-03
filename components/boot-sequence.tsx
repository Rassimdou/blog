"use client";

import { useEffect, useState, useCallback } from "react";

const bootLines = [
  { text: "INITIALIZING SYSTEM...", delay: 0 },
  { text: "[OK] Loading kernel modules", delay: 200 },
  { text: "[OK] Mounting encrypted filesystem", delay: 400 },
  { text: "[OK] Starting network services", delay: 600 },
  { text: "[OK] Establishing secure connection", delay: 800 },
  { text: "[OK] Loading vulnerability database", delay: 1000 },
  { text: "[OK] Initializing exploit frameworks", delay: 1200 },
  { text: "", delay: 1400 },
  { text: "SYSTEM READY", delay: 1600 },
  { text: "", delay: 1800 },
  { text: "Welcome, operator.", delay: 2000 },
];

const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

function MatrixRain() {
  const [columns, setColumns] = useState<{ chars: string[]; speed: number; x: number }[]>([]);

  useEffect(() => {
    const cols = [];
    const numCols = Math.floor(window.innerWidth / 20);
    for (let i = 0; i < numCols; i++) {
      const chars = [];
      const length = Math.floor(Math.random() * 20) + 10;
      for (let j = 0; j < length; j++) {
        chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
      }
      cols.push({
        chars,
        speed: Math.random() * 2 + 1,
        x: i * 20,
      });
    }
    setColumns(cols);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute top-0 text-primary text-xs font-mono leading-5 animate-matrix-fall"
          style={{
            left: col.x,
            animationDuration: `${col.speed * 5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {col.chars.map((char, j) => (
            <div
              key={j}
              style={{
                opacity: 1 - j / col.chars.length,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 text-cyan-400 animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 text-red-400 animate-glitch-2"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSkull, setShowSkull] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, bootLines[visibleLines]?.delay ? 200 : 200);
      return () => clearTimeout(timer);
    } else {
      const skullTimer = setTimeout(() => setShowSkull(true), 300);
      const completeTimer = setTimeout(handleComplete, 2000);
      return () => {
        clearTimeout(skullTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [visibleLines, handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      <MatrixRain />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] animate-scanlines" />

      {/* CRT flicker */}
      <div className="absolute inset-0 pointer-events-none animate-crt-flicker" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* ASCII skull that appears at the end */}
        {showSkull && (
          <div className="mb-8 flex justify-center animate-fade-scale-in">
            <pre className="text-primary text-xs sm:text-sm leading-none">
              {`         _nnnn_
        dGGGGMMb
       @p~qp~~qMb
       M|@||@) M|
       @,----.JM|
      JS^\\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\\dS"qML
 |    \`.       | \`' \\Zq
_)      \\.___.,|     .'
\\____   )MMMMMP|   .'
     \`-'       \`--' 
`}
            </pre>
          </div>
        )}

        {/* Boot log */}
        <div className="font-mono text-sm sm:text-base space-y-1">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`animate-type-in ${line.text.startsWith("[OK]")
                  ? "text-primary"
                  : line.text === "SYSTEM READY"
                    ? "text-foreground font-bold"
                    : line.text === "Welcome, operator."
                      ? ""
                      : "text-muted-foreground"
                }`}
            >
              {line.text === "Welcome, operator." ? (
                <GlitchText text={line.text} className="text-primary text-xl sm:text-2xl font-bold" />
              ) : (
                line.text
              )}
            </div>
          ))}
          {visibleLines < bootLines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink" />
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{
              width: `${(visibleLines / bootLines.length) * 100}%`,
            }}
          />
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleComplete}
          className="mt-6 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {">"} Skip intro [SPACE]
        </button>
      </div>
    </div >
  );
}
