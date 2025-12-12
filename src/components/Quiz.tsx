import React from "react";
import { QuizQuestion, Option } from "../types";
import clsx from "clsx";
import { motion } from "framer-motion";
type Props = {
  questions: QuizQuestion[];
  onFinish: (scorePercent: number) => void;
};

export default function Quiz({ questions, onFinish }: Props) {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string,string>>({});

  const q = questions[index];

  function choose(option: Option) {
    setSelected(prev => ({ ...prev, [q.id]: option.id }));
  }

  function next() {
    if (index < questions.length - 1) setIndex(i => i + 1);
    else {
      let correct = 0;
      for (const qq of questions) {
        const selId = selected[qq.id];
        const chosen = qq.options.find(o => o.id === selId);
        if (chosen && chosen.correct) correct++;
      }
      const percent = Math.round((correct / questions.length) * 100);
      onFinish(percent);
    }
  }

  function prev() {
    if (index > 0) setIndex(i => i - 1);
  }

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, selected]);

  const progressPct = Math.round((Object.keys(selected).length / questions.length) * 100);

  return (
    <main className="w-[980px] bg-[var(--card)] p-12 rounded-2xl2 quiz-card relative">
      <header className="text-center mb-8">
        <h1 className="hero-title text-6xl text-[#2f6b75] font-semibold">Test Your Knowledge</h1>
        <p className="mt-3 inline-block text-sm px-4 py-2 bg-white rounded-md shadow-sm" style={{color:'var(--muted)'}}>Answer all questions to see your results</p>
      </header>

      <div className="max-w-xl mx-auto">
        <div className="progress-track mb-6">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <section aria-labelledby={`q-${q.id}`} className="mb-6">
          <div className="p-6 text-lg font-semibold rounded-md bg-gradient-to-r from-[#e4f7fa] to-[#f7feff] border border-[#dff3f6]">
            <span id={`q-${q.id}`}>{q.question}</span>
          </div>

          <ul role="list" aria-label={`Options for ${q.question}`} className="mt-6 space-y-4">
            {q.options.map((opt) => {
              const isSelected = selected[q.id] === opt.id;
              return (
                <li key={opt.id}>
                  <button
                    onClick={() => choose(opt)}
                    className={clsx(
                      "w-full text-left p-6 rounded-lg border focus:ring focus-ring transition-shadow",
                      isSelected ? "bg-[#dff6f8] border-[#bfeaf0]" : "bg-white border-[#e8f3f5]"
                    )}
                    aria-pressed={isSelected}
                  >
                    <div className="text-center font-medium text-base">{opt.text}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous question"
            className="p-3 rounded-lg focus-ring bg-white border border-[#e6f2f4] disabled:opacity-40"
          >
            ←
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-[#5f7a7f]">{Object.keys(selected).length}/{questions.length} answered</div>
            <button
              onClick={next}
              aria-label="Next question"
              className="px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold shadow-md focus-ring"
            >
              {index < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>
<motion.img
  src="/assets/paw.png"
  alt=""
  aria-hidden
  className="absolute left-6 bottom-6 w-36 h-auto pointer-events-none select-none origin-bottom"
  animate={{
    rotate: [0, -20, -35, -20, 0],        // folding inward like a cat paw
    scaleY: [1, 0.9, 0.8, 0.9, 1],        // slight squish like real movement
    y: [0, 4, 6, 4, 0],                   // small vertical dip
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatDelay: 0.5,
    ease: "easeInOut"
  }}
/>

     
    </main>
  );
}
