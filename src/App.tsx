import React from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { QuizQuestion } from "./types";

const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "1. What sound does a cat make?",
    options: [
      { id: "a", text: "Bhau-Bhau" },
      { id: "b", text: "Meow-Meow", correct: true },
      { id: "c", text: "Oink-Oink" },
    ],
  },
  {
    id: "q2",
    question: "2. Which of these is a mammal?",
    options: [
      { id: "a", text: "Crocodile" },
      { id: "b", text: "Dolphin", correct: true },
      { id: "c", text: "Shark" },
    ],
  },
  {
    id: "q3",
    question: "3. Which planet is known as the red planet?",
    options: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Mars", correct: true },
      { id: "c", text: "Jupiter" },
    ],
  },
];

function App() {
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center p-12">
      {!showResult ? (
        <Quiz
          questions={QUESTIONS}
          onFinish={(s) => {
            setScore(s);
            setShowResult(true);
          }}
        />
      ) : (
        <Result score={score} total={QUESTIONS.length} onRestart={() => {
          setScore(0);
          setShowResult(false);
        }} />
      )}
    </div>
  );
}

export default App;
