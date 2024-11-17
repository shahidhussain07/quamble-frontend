import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
  },
  {
    question: 'How many continents are there on Earth?',
    options: ['Seven', 'Six', 'Five', 'Eight'],
  },
  {
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
  },
  {
    question: 'Which year did the Titanic sink?',
    options: ['1912', '1905', '1921', '1899'],
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Diamond', 'Gold', 'Iron', 'Granite'],
  },
  {
    question: 'Who is known as the father of modern physics?',
    options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Niels Bohr'],
  },
  {
    question: 'What is the smallest country in the world by area?',
    options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
  },
];


const QuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleAnswerChange = (answer) => {
    console.log(`Selected answer: ${answer}`);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, quizQuestions.length));
  };

  const handleSubmit = () => {
    console.log('Quiz submitted');
  };

  return (
    <QuestionCard
      question={quizQuestions[currentQuestion - 1].question}
      options={quizQuestions[currentQuestion - 1].options}
      currentQuestion={currentQuestion}
      totalQuestions={quizQuestions.length}
      onAnswerChange={handleAnswerChange}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSubmit={handleSubmit}
    />
  );
};

export default QuizCard;
