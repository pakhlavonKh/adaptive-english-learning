/**
 * Assessment Service
 * Consolidated question pool and assessment logic
 * Merged from client/AssesmentEngine/assesment.js and server assessment
 */

export const assessmentQuestions = {
  easy: [
    {
      type: "fill-in-the-blank",
      text: "The place where you live is called a _____.",
      options: ["house", "car", "park", "store"],
      answer: "house",
      difficulty: -2
    },
    {
      type: "fill-in-the-blank",
      text: "The color of grass is _____.",
      options: ["green", "blue", "red", "yellow"],
      answer: "green",
      difficulty: -2
    },
    {
      type: "fill-in-the-blank",
      text: "I drink _____ every morning.",
      options: ["coffee", "tea", "water", "milk"],
      answer: "coffee",
      difficulty: -1
    },
    {
      type: "multiple-choice",
      text: "Which sentence is grammatically correct?",
      options: ["They is playing", "They are playing", "They am playing", "They be playing"],
      answer: "They are playing",
      difficulty: 0
    },
    {
      type: "multiple-choice",
      text: "What is the plural of 'child'?",
      options: ["childs", "childes", "children", "childern"],
      answer: "children",
      difficulty: -1
    }
  ],
  medium: [
    {
      type: "fill-in-the-blank",
      text: "A polite greeting in English is _____.",
      options: ["Good morning", "Whatever", "Shh", "Go away"],
      answer: "Good morning",
      difficulty: 0
    },
    {
      type: "multiple-choice",
      text: "Which of the following uses 'have' correctly?",
      options: ["He have a cat", "She have books", "They have a house", "It have legs"],
      answer: "They have a house",
      difficulty: 0.5
    },
    {
      type: "multiple-choice",
      text: "What is the past tense of 'go'?",
      options: ["goes", "went", "going", "go"],
      answer: "went",
      difficulty: 0
    }
  ],
  hard: [
    {
      type: "multiple-choice",
      text: "Which sentence demonstrates the correct use of subjunctive mood?",
      options: [
        "If I am you, I would go there",
        "If I were you, I would go there",
        "If I was you, I would have gone",
        "If I am been you, I would go"
      ],
      answer: "If I were you, I would go there",
      difficulty: 2
    },
    {
      type: "essay",
      text: "Explain the difference between 'effect' and 'affect' with examples.",
      answer: "affect is a verb (to influence), effect is a noun (result)",
      difficulty: 1.5
    },
    {
      type: "multiple-choice",
      text: "Which phrase is an example of alliteration?",
      options: [
        "The bright sun shone",
        "Peter Piper picked a peck of pickled peppers",
        "The dog barked loudly",
        "She ran very fast"
      ],
      answer: "Peter Piper picked a peck of pickled peppers",
      difficulty: 1.5
    }
  ]
};

/**
 * Get questions by difficulty level
 */
export const getQuestionsByDifficulty = (difficulty) => {
  if (difficulty < -1) return assessmentQuestions.easy;
  if (difficulty < 1) return assessmentQuestions.medium;
  return assessmentQuestions.hard;
};

/**
 * Get a random question from difficulty level
 */
export const getRandomQuestion = (difficulty) => {
  const questions = getQuestionsByDifficulty(difficulty);
  return questions[Math.floor(Math.random() * questions.length)];
};

/**
 * Evaluate answer (for offline/cached assessments)
 */
export const evaluateAnswer = (questionId, userAnswer, correctAnswer) => {
  const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  return {
    isCorrect,
    feedback: isCorrect ? "Correct! Great job!" : `The correct answer is: ${correctAnswer}`,
    timestamp: new Date()
  };
};
