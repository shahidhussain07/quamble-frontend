import React, { useEffect, useState } from "react"
import "../styles/leaderboard.css" // Import the component-specific CSS
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function LeaderBoard() {
	const [flipped, setFlipped] = useState({})
	const [leaderboardData, setLeaderboardData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { getAuthToken, isAuthenticated } = useAuth()

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	useEffect(() => {
		if (isAuthenticated()) {
			fetchLeaderboardData()
		}
	}, [])

	const fetchLeaderboardData = async () => {
		setLoading(true)
		try {
			const token = getAuthToken()

			// Fetch all three leaderboards concurrently
			const [overallResponse, dailyResponse] = await Promise.allSettled([
				axios.get(`${API_BASE_URL}/leaderboard_overall`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				axios.get(`${API_BASE_URL}/leaderboard_daily`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			])

			const leaderboards = []

			// Process overall leaderboard
			if (
				overallResponse.status === "fulfilled" &&
				overallResponse.value.data.status === "success"
			) {
				leaderboards.push({
					title: "All Time Top 5",
					players: overallResponse.value.data.leaderboard
						.map(
							(player, index) =>
								`${player.username} (${player.total_score} pts)`
						)
						.slice(0, 5),
				})
			}

			// Process daily leaderboard
			if (
				dailyResponse.status === "fulfilled" &&
				dailyResponse.value.data.status === "success"
			) {
				leaderboards.push({
					title: "Daily Top 5",
					players:
						dailyResponse.value.data.leaderboard.length > 0
							? dailyResponse.value.data.leaderboard
									.map(
										(player, index) =>
											`${player.username} (${player.total_score} pts)`
									)
									.slice(0, 5)
							: [
									"No players today",
									"Start playing!",
									"Be the first",
									"on the board",
									"🎯",
							  ],
				})
			}

			// Add a placeholder for weekly (since API doesn't have weekly endpoint)
			leaderboards.push({
				title: "Weekly Top 5",
				players: [
					"Coming Soon!",
					"Weekly stats",
					"will be available",
					"in next update",
					"⏰",
				],
			})

			setLeaderboardData(leaderboards)
		} catch (err) {
			console.error("Error fetching leaderboard data:", err)
			setError("Failed to load leaderboard data")

			// Fallback data
			setLeaderboardData([
				{
					title: "All Time Top 5",
					players: [
						"Loading...",
						"Please wait",
						"Fetching data",
						"",
						"",
					],
				},
				{
					title: "Daily Top 5",
					players: [
						"Loading...",
						"Please wait",
						"Fetching data",
						"",
						"",
					],
				},
				{
					title: "Weekly Top 5",
					players: [
						"Coming Soon!",
						"Weekly stats",
						"will be available",
						"in next update",
						"⏰",
					],
				},
			])
		} finally {
			setLoading(false)
		}
	}

	const handleFlip = cardIndex => {
		setFlipped(prev => ({
			...prev,
			[cardIndex]: !prev[cardIndex],
		}))
	}

	if (loading) {
		return (
			<div className="py-12 sm:py-24 bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500">
				<div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
					<div className="bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-lg p-4 shadow-md mb-8">
						<h1 className="text-3xl font-bold text-purple-800">
							Leader Board
						</h1>
					</div>
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="py-12 sm:py-24 bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500">
			<div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
				<div className="bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-lg p-4 shadow-md mb-8">
					<h1 className="text-3xl font-bold text-purple-800">
						Leader Board
					</h1>
					{error && (
						<p className="text-red-600 text-sm mt-2">{error}</p>
					)}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{leaderboardData.map((card, index) => (
						<div
							key={index}
							className="leaderboard-card relative w-full h-64 cursor-pointer"
							onClick={() => handleFlip(index)}>
							<div
								className={`card-inner ${
									flipped[index] ? "flipped" : ""
								}`}>
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
									<h2 className="text-lg font-semibold mb-4">
										{card.title}
									</h2>
									<ul className="space-y-2 text-white">
										{card.players.map(
											(player, playerIndex) => (
												<li key={playerIndex}>
													{playerIndex + 1}. {player}
												</li>
											)
										)}
									</ul>
									<p className="mt-4 text-sm text-gray-200">
										Click to go back
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
