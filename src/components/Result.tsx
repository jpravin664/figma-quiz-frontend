import React from "react";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function Result({ score, total, onRestart }: Props) {
  return (
    <div className="w-[980px] p-12 rounded-2xl2 text-center quiz-card">
      <div className="mb-12">
        <div className="inline-block px-4 py-2 bg-white rounded-md shadow-sm text-sm" style={{color:'var(--muted)'}}>Keep Learning!</div>
        <h2 className="hero-title text-4xl mt-8 text-[#2f6b75] font-semibold">Your Final score is</h2>
      </div>

      <div aria-live="polite" className="text-[120px] font-extrabold leading-none text-[#2f6b75]">
        <span>{score}</span>
        <span className="text-4xl align-top">%</span>
      </div>

      <div className="mt-10">
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-xl bg-gradient-to-b from-[#dff6fb] to-[#bfeef6] border border-[#d8f0f4] font-semibold"
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
