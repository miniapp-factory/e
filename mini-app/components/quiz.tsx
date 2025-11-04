"use client";

import { useState } from "react";
import { Share } from "../components/share";
import { url } from "../lib/metadata";

const questions = [
  {
    question: "What is your favorite type of adventure?",
    options: [
      { label: "Exploring new lands", princess: "cinderella" },
      { label: "Discovering hidden treasures", princess: "ariel" },
      { label: "Helping others", princess: "belle" },
      { label: "Finding love", princess: "snowwhite" },
      { label: "Living in a tower", princess: "rapunzel" },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { label: "Kind and compassionate", princess: "belle" },
      { label: "Brave and adventurous", princess: "ariel" },
      { label: "Creative and artistic", princess: "rapunzel" },
      { label: "Practical and hardworking", princess: "cinderella" },
      { label: "Optimistic and friendly", princess: "snowwhite" },
    ],
  },
  {
    question: "What is your favorite pastime?",
    options: [
      { label: "Reading books", princess: "belle" },
      { label: "Swimming in the sea", princess: "ariel" },
      { label: "Painting or drawing", princess: "rapunzel" },
      { label: "Cooking and baking", princess: "cinderella" },
      { label: "Playing with friends", princess: "snowwhite" },
    ],
  },
  {
    question: "How do you handle challenges?",
    options: [
      { label: "Stay calm and find solutions", princess: "cinderella" },
      { label: "Seek help from friends", princess: "snowwhite" },
      { label: "Take a bold leap", princess: "ariel" },
      { label: "Use your creativity", princess: "rapunzel" },
      { label: "Use your knowledge", princess: "belle" },
    ],
  },
  {
    question: "What is your dream?",
    options: [
      { label: "Live happily ever after", princess: "cinderella" },
      { label: "Explore the world", princess: "ariel" },
      { label: "Create a masterpiece", princess: "rapunzel" },
      { label: "Help others", princess: "belle" },
      { label: "Find true friendship", princess: "snowwhite" },
    ],
  },
];

const princessInfo = {
  cinderella: { name: "Cinderella", image: "/cinderella.png" },
  belle: { name: "Belle", image: "/belle.png" },
  ariel: { name: "Ariel", image: "/ariel.png" },
  rapunzel: { name: "Rapunzel", image: "/rapunzel.png" },
  snowwhite: { name: "Snow White", image: "/snowwhite.png" },
};

export function Quiz() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (index: number, princess: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = princess;
    setAnswers(newAnswers);
    if (newAnswers.filter(Boolean).length === questions.length) {
      const counts: Record<string, number> = {};
      newAnswers.forEach((p) => {
        counts[p] = (counts[p] || 0) + 1;
      });
      const best = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(best);
    }
  };

  if (result) {
    const { name, image } = princessInfo[result];
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">You are most similar to {name}!</h2>
        <img src={image} alt={name} width={200} height={200} />
        <Share
          text={`I just found out I'm most similar to ${name}! Check it out: ${url}`}
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {questions.map((q, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <p className="font-medium">{q.question}</p>
          {q.options.map((opt, oIdx) => (
            <label key={oIdx} className="flex items-center gap-2">
              <input
                type="radio"
                name={`q${idx}`}
                value={opt.princess}
                checked={answers[idx] === opt.princess}
                onChange={() => handleSelect(idx, opt.princess)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
