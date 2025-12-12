// src/components/Quiz.tsx
import React from "react";
import { QuizQuestion, Option } from "../types";
import clsx from "clsx";
import { motion, useReducedMotion, useAnimation } from "framer-motion";
 // <-- place paw.png at src/assets/paw.png (or change path)

type Props = {
  questions: QuizQuestion[];
  onFinish: (scorePercent: number) => void;
};

export default function Quiz({ questions, onFinish }: Props) {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, string>>({});

  // Refs to read latest values from event handlers without re-attaching
  const selectedRef = React.useRef(selected);
  const indexRef = React.useRef(index);
  const questionsRef = React.useRef(questions);

  React.useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  React.useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  // Safety: empty questions guard
  if (!questions || questions.length === 0) {
    return (
      <main className="w-[980px] bg-[var(--card)] p-12 rounded-2xl2 quiz-card relative">
        <div className="text-center text-lg p-8">No questions available.</div>
      </main>
    );
  }

  const q = questions[index];

  function choose(option: Option) {
    setSelected((prev) => ({ ...prev, [q.id]: option.id }));
  }

  // compute result from a selection map and call onFinish
  function computeAndFinish(selMap: Record<string, string>) {
    const qs = questionsRef.current;
    let correct = 0;
    for (const qq of qs) {
      const selId = selMap[qq.id];
      const chosen = qq.options.find((o) => o.id === selId);
      if (chosen && chosen.correct) correct++;
    }
    const percent = Math.round((correct / qs.length) * 100);
    onFinish(percent);
  }

  // Next/Prev helpers used by UI
  function goNext() {
    if (indexRef.current < questionsRef.current.length - 1) {
      setIndex((i) => i + 1);
    } else {
      computeAndFinish(selectedRef.current);
    }
  }
  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  // Stable keyboard handler: attach once, read refs inside
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        // advance or finish
        if (indexRef.current < questionsRef.current.length - 1) {
          setIndex((i) => i + 1);
        } else {
          computeAndFinish(selectedRef.current);
        }
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // no deps — handler uses refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressPct = Math.round(
    (Object.keys(selected).length / Math.max(1, questions.length)) * 100
  );

  return (
    <main className="w-[980px] bg-[var(--card)] p-12 rounded-2xl2 quiz-card relative">
      <header className="text-center mb-8">
        <h1 className="hero-title text-6xl text-[#2f6b75] font-semibold">
          Test Your Knowledge
        </h1>
        <p
          className="mt-3 inline-block text-sm px-4 py-2 bg-white rounded-md shadow-sm"
          style={{ color: "var(--muted)" }}
        >
          Answer all questions to see your results
        </p>
      </header>

      <div className="max-w-xl mx-auto">
        <div
          className="progress-track mb-6"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPct}
        >
          <div
            className="progress-fill"
            style={{
              width: `${progressPct}%`,
              transition: "width 320ms ease",
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg,var(--accent), #86e6f6)",
            }}
          />
        </div>

        <section aria-labelledby={`q-${q.id}`} className="mb-6">
          <div className="p-6 text-lg font-semibold rounded-md bg-gradient-to-r from-[#e4f7fa] to-[#f7feff] border border-[#dff3f6]">
            <span id={`q-${q.id}`}>{q.question}</span>
          </div>

          <ul
            role="list"
            aria-label={`Options for ${q.question}`}
            className="mt-6 space-y-4"
          >
            {q.options.map((opt) => {
              const isSelected = selected[q.id] === opt.id;
              return (
                <li key={opt.id}>
                  <button
                    onClick={() => choose(opt)}
                    className={clsx(
                      "w-full text-left p-6 rounded-lg border focus:ring focus-ring transition-shadow",
                      isSelected
                        ? "bg-[#dff6f8] border-[#bfeaf0]"
                        : "bg-white border-[#e8f3f5]"
                    )}
                    aria-pressed={isSelected}
                    aria-label={opt.text}
                    type="button"
                  >
                    <div className="text-center font-medium text-base">
                      {opt.text}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous question"
            className="p-3 rounded-lg focus-ring bg-white border border-[#e6f2f4] disabled:opacity-40"
            type="button"
          >
            ←
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-[#5f7a7f]">
              {Object.keys(selected).length}/{questions.length} answered
            </div>
            <button
              onClick={goNext}
              aria-label="Next question"
              className="px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold shadow-md focus-ring"
              type="button"
            >
              {index < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>

      {/* Paw beckon wrapper with perspective for a 3D folding illusion */}
      <PawBeckon progressPct={progressPct} />
    </main>
  );
}

/* --------------------
   PawBeckon subcomponent
   - respects reduced motion
   - reacts slightly to progress to appear "more excited" as user answers
   -------------------- */
function PawBeckon({ progressPct }: { progressPct: number }) {
  const shouldReduce = useReducedMotion();
  const controls = useAnimation();

  // We'll slightly intensify the animation when the user has answered > 50%
  React.useEffect(() => {
    if (shouldReduce) {
      controls.set({ rotateX: 0, rotateY: 0, scale: 1, y: 0 });
      return;
    }

    // choose intensity based on progress
    const isExcited = progressPct >= 50;

    const rotateX = isExcited ? [0, -26, -48, -26, 0] : [0, -22, -40, -22, 0];
    const rotateY = isExcited ? [0, 8, -8, 8, 0] : [0, 6, -6, 6, 0];
    const scale = isExcited ? [1, 0.96, 0.92, 0.96, 1] : [1, 0.98, 0.94, 0.98, 1];
    const y = isExcited ? [0, 8, 16, 8, 0] : [0, 6, 12, 6, 0];
    const duration = isExcited ? 1.8 : 2.2;
    const repeatDelay = isExcited ? 0.8 : 1.0;

    controls.start({
      rotateX,
      rotateY,
      scale,
      y,
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay,
      },
    });
  }, [progressPct, shouldReduce, controls]);

  return (
    <div
      style={{
        position: "absolute",
        left: 24,
        bottom: 24,
        width: 144,
        pointerEvents: "none",
        perspective: 700,
        WebkitPerspective: 700,
      }}
      aria-hidden="true"
    >
      <motion.img
        src="/assets/paw.png"
        alt=""
        initial={shouldReduce ? { rotateX: 0, rotateY: 0, scale: 1, y: 0 } : undefined}
        animate={controls}
        style={{
          width: "100%",
          height: "auto",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transformOrigin: "50% 100%",
          WebkitTransformOrigin: "50% 100%",
          willChange: "transform",
          display: "block",
          userSelect: "none",
        }}
        draggable={false}
        onError={(e) => {
          // If image path is wrong, hide the img and render a tiny fallback box so devs can notice.
          e.currentTarget.style.display = "none";
          const parent = e.currentTarget.parentElement;
          if (parent && !parent.querySelector(".paw-fallback")) {
            const fallback = document.createElement("div");
            fallback.className = "paw-fallback";
            fallback.textContent = "paw image not found";
            Object.assign(fallback.style, {
              padding: "10px 12px",
              fontSize: "12px",
              color: "#07575B",
              borderRadius: "10px",
              background: "linear-gradient(90deg, rgba(200,240,255,0.4), rgba(240,255,250,0.4))",
            });
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
}
