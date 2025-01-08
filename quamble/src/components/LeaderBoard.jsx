import React, { useState } from "react";
import "../styles/leaderboard.css"; // Import the component-specific CSS

export default function LeaderBoard() {
  const [flipped, setFlipped] = useState({});

  // Dynamic data for the cards
  const leaderboardData = [
    {
      title: "Weekly Top 5",
      players: ["Player A", "Player B", "Player C", "Player D", "Player E"],
    },
    {
      title: "Monthly Top 5",
      players: ["Player X", "Player Y", "Player Z", "Player M", "Player N"],
    },
    {
      title: "All Time Top 5",
      players: ["Champion A", "Champion B", "Champion C", "Champion D", "Champion E"],
    },
  ];

  const handleFlip = (cardIndex) => {
    setFlipped((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  return (
    <div className="py-12 sm:py-24 bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-lg p-4 shadow-md mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Leader Board</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaderboardData.map((card, index) => (
            <div
              key={index}
              className="leaderboard-card relative w-full h-64 cursor-pointer"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`card-inner ${
                  flipped[index] ? "flipped" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-[url('/assets/LBCardBG.jpg')] bg-cover bg-center rounded-lg shadow-lg p-6 pb-2 text-center flex flex-col justify-between backface-hidden">
                  <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Click to see the top players!
                  </p>
                </div>

                {/* Back Side */}
                <div className="card-back bg-gradient-to-b from-purple-800 via-purple-500 to-purple-800">
                  <h2 className="text-lg font-semibold mb-4">{card.title}</h2>
                  <ul className="space-y-2 text-white">
                    {card.players.map((player, playerIndex) => (
                      <li key={playerIndex}>
                        {playerIndex + 1}. {player}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-200">Click to go back</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
