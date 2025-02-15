import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa"; // Example icons
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // For check and X icons

export default function ResultPage() {
  // ----------------------------
  // Mock quiz result data
  // ----------------------------
  const quizResult = {
    performance: "Excellent Performance!",
    title: "Machine Learning Fundamentals Quiz",
    completedDate: "March 12, 2024",
    score: "5/10",
    accuracy: "50%",
    timeTaken: "12:45",
    ranking: "Top 15%",
  };

  // ----------------------------
  // Mock question review data
  // ----------------------------
  const questionReview = [
    {
      id: 1,
      status: "correct", // or "incorrect"
      question:
        "What is the primary difference between supervised and unsupervised learning?",
      yourAnswer:
        "Supervised learning requires labeled data, while unsupervised learning doesn't",
      correctAnswer: null, // if user got it correct, otherwise a string
      explanation:
        "Supervised learning uses labeled training data to make predictions, while unsupervised learning finds patterns in unlabeled data.",
    },
    {
      id: 2,
      status: "incorrect",
      question: "Which algorithm is commonly used for classification tasks?",
      yourAnswer: "K-means clustering",
      correctAnswer: "Random Forest",
      explanation:
        "Random Forest is a popular supervised learning algorithm for classification tasks, while K-means is used for clustering.",
    },
    // Add more questions as needed
  ];

  // ----------------------------
  // Mock recommended quizzes data
  // ----------------------------
  const recommendedQuizzes = [
    {
      title: "Advanced Machine Learning Concepts",
      category: "AI & ML",
      difficulty: "Advanced",
      participants: 1234,
    },
    {
      title: "Neural Networks Fundamentals",
      category: "Deep Learning",
      difficulty: "Intermediate",
      participants: 890,
    },
  ];

  // ----------------------------
  // Rating & Feedback state
  // ----------------------------
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = () => {
    // In a real app, you'd submit to an API or store the feedback
    console.log("Submitted rating:", rating);
    console.log("Submitted feedback:", feedback);
    // Reset or show a success message, etc.
  };

  // A simple helper to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          type="button"
          key={i}
          onClick={() => setRating(i)}
          className={`mx-1 text-2xl ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Top Section / Header */}
      <div className="bg-blue-600 text-white text-center rounded-xl p-6 md:p-8 mb-6">
        <FaTrophy className="text-6xl text-white mx-auto" />
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          {quizResult.performance}
        </h1>
        <p className="text-lg mb-2">{quizResult.title}</p>
        <p className="text-sm text-gray-300 font-medium ">Completed on {quizResult.completedDate}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Score</p>
          <p className="text-xl font-semibold text-gray-800">
            {quizResult.score}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Accuracy</p>
          <p className="text-xl font-semibold text-gray-800">
            {quizResult.accuracy}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Time Taken</p>
          <p className="text-xl font-semibold text-gray-800">
            {quizResult.timeTaken}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Ranking</p>
          <p className="text-xl font-semibold text-gray-800">
            {quizResult.ranking}
          </p>
        </div>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Question Review
        </h2>
        {questionReview.map((q) => (
          <div
            key={q.id}
            className={`mb-4 p-4 rounded-xl ${
              q.status === "correct" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {/* Question Header with Check/X icon */}
            <div className="flex items-center mb-2">
              {q.status === "correct" ? (
                <HiCheckCircle className="text-green-500 text-2xl mr-2" />
              ) : (
                <HiXCircle className="text-red-500 text-2xl mr-2" />
              )}
              <h3 className="font-semibold text-gray-800">
                Question {q.id}
              </h3>
            </div>

            {/* Question text */}
            <p className="font-medium text-gray-900 mb-2">{q.question}</p>

            {/* Your Answer */}
            <p
              className={`p-2 rounded-md mb-2 ${
                q.status === "correct"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <strong>Your Answer:</strong> {q.yourAnswer}
            </p>

            {/* Correct Answer (only if incorrect) */}
            {q.status === "incorrect" && (
              <p className="bg-blue-50 text-blue-800 p-2 rounded-md mb-2">
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
            )}

            {/* Explanation */}
            <p className="bg-gray-100 text-gray-700 p-2 rounded-md">
              <strong>Explanation:</strong> {q.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Recommended Quizzes */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recommended Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedQuizzes.map((quiz, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold text-gray-800">
                  {quiz.title}
                </h3>
                {/* Difficulty Badge */}
                <span className="text-sm px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                  {quiz.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
               <div>
                    <p className="text-gray-500 text-sm mb-2">{quiz.category}</p>
                    <p className="text-gray-500 text-sm mt-2">
                         {quiz.participants} participants
                    </p>
               </div>
               <button className="mt-3 bg-blue-600 text-white px-3 py-1 text-md rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Start Quiz
               </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500">
          Share Results
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500">
          Retake Quiz
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500">
          Explore More
        </button>
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Your Feedback</h2>
        <p className="text-gray-500 mb-3">Rate this quiz</p>

        {/* Star Rating */}
        <div className="flex items-center mb-4">{renderStars()}</div>

        {/* Feedback Textarea */}
        <textarea
          rows={4}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Share your thoughts about this quiz..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          onClick={handleSubmitFeedback}
          className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
