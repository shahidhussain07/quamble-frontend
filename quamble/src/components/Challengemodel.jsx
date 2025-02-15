import React, { useState } from "react";

export default function Challengemodel({
  userPerformance = { correctAnswers: 0, totalQuestions: 10, averageTime: 15 },
  aiPerformance = { correctAnswers: 0, totalQuestions: 10, averageConfidence: 92 },
}) {
     // 1. Define an array of challenge modes
  const challengeModes = [
     {
       title: "Head-to-Head Mode",
       description:
         "Answer questions alongside AI and compete for accuracy and speed.",
     },
     {
       title: "AI Evaluation Mode",
       description: "Rate AI's answers and provide constructive feedback.",
     },
     {
       title: "Creative Mode",
       description: "Create your own questions and challenge the AI.",
     },
     // Add more objects if you have additional modes
   ];


  const [challengeType, setChallengeType] = useState("");

  // Simple handler for demonstration
  const handleStartChallenge = () => {
    // For now, just log the chosen challenge type
    console.log("User wants to attempt:", challengeType);
    // You could also route to a different page, set state, etc.
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
      {/* Container */}
      <div className="w-full max-w-6xl space-y-8">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Choose Your Challenge Mode
        </h1>
        
        {/* Challenge Mode Cards */}
        {/* Challenge Mode Cards - Dynamically Created */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {challengeModes.map((mode, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-start"
            >
              <h2 className="text-lg font-semibold mb-2">{mode.title}</h2>
              <p className="text-sm text-gray-600">{mode.description}</p>
            </div>
          ))}
        </div>
        
        {/* Performance Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Your Performance */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-bold text-gray-700 mb-2">Your Performance</h3>
            <div className="flex flex-col space-y-1">
              <p className="text-gray-600">
                <span className="font-semibold">Correct Answers:</span> 
                {` ${userPerformance.correctAnswers}/${userPerformance.totalQuestions}`}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Average Time:</span> 
                {` ${userPerformance.averageTime}s`}
              </p>
            </div>
          </div>
          
          {/* AI Performance */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-bold text-gray-700 mb-2">AI Performance</h3>
            <div className="flex flex-col space-y-1">
              <p className="text-gray-600">
                <span className="font-semibold">Correct Answers:</span> 
                {` ${aiPerformance.correctAnswers}/${aiPerformance.totalQuestions}`}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Average Confidence:</span> 
                {` ${aiPerformance.averageConfidence}%`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Prompt for Challenge Type (Replaces Feedback Section) */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-md font-bold text-gray-700 mb-4">
            Enter Your Preferred Challenge Mode
          </h3>
          
          <label htmlFor="challengeMode" className="block font-medium mb-2 text-gray-700">
            Which challenge mode would you like to attempt?
          </label>
          
          <input
            id="challengeMode"
            type="text"
            value={challengeType}
            onChange={(e) => setChallengeType(e.target.value)}
            placeholder="e.g., Timed Quiz, Hard Mode, etc."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleStartChallenge}
            >
              Start Challenge
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-3xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setChallengeType("")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
