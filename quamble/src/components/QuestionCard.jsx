import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { runConfettiEffect } from '../script/confettiEffect';

const QuestionCard = ({ question, options, currentQuestion, totalQuestions, onAnswerChange, onNext, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSelectedOption(''); // Reset selected option when question changes
    setTimeLeft(10); // Reset timer for each question

    let timerExpired = false; // Flag to ensure `onNext` is called only once
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && !timerExpired) {
          clearInterval(timer);
          timerExpired = true; // Set the flag to true to prevent repeated calls
          onNext(); // Automatically move to the next question when timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      timerExpired = true; // Prevent `onNext` call if the component unmounts or re-renders
    };
  }, [question, onNext]); // Add `question` and `onNext` as dependencies

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAnswerChange(option);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowModal(false);
    runConfettiEffect(); // Run the confetti effect when quiz is submitted
    onSubmit(); // Call the onSubmit function to finalize quiz submission
  };

  return (
    <div className='py-20'>
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-5 m-7 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Question {currentQuestion} of {totalQuestions}
        </div>
        <div className="text-red-500 font-bold">
          {timeLeft}s left
        </div>
      </div>

      {/* Question */}
      <div className="mb-4 text-gray-700">
        <p>{question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-6 flex flex-col gap-1">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 border-gray-400 border-2 p-3 rounded-xl">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="form-radio text-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end">
        {currentQuestion < totalQuestions ? (
          <button
            onClick={onNext}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <Link to="/aichallenge/result">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </Link>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="mb-4 text-gray-700">Are you sure you want to submit the quiz?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default QuestionCard;
