import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Challengemodel() {
	const [challengeType, setChallengeType] = useState("")
	const [userPerformance, setUserPerformance] = useState({
		correctAnswers: 0,
		totalQuestions: 0,
		averageTime: 0,
	})
	const [aiPerformance, setAiPerformance] = useState({
		correctAnswers: 0,
		totalQuestions: 0,
		averageConfidence: 0,
	})
	const [loading, setLoading] = useState(false)
	const [recentQuizzes, setRecentQuizzes] = useState([])
	const [themeLeaderboard, setThemeLeaderboard] = useState([])
	const [selectedTheme, setSelectedTheme] = useState("general")
	const [themes, setThemes] = useState([
		"general",
		"sports",
		"history",
		"science",
		"cricket",
		"programming",
	])

	const navigate = useNavigate()
	const { getAuthToken, isAuthenticated } = useAuth()

	// Challenge modes
	const challengeModes = [
		{
			id: "head-to-head",
			title: "Head-to-Head Mode",
			description:
				"Answer questions alongside AI and compete for accuracy and speed.",
			apiEndpoint: "/beat_the_ai",
		},
		{
			id: "theme-challenge",
			title: "Theme Challenge",
			description: "Test your knowledge in a specific theme against AI.",
			apiEndpoint: "/create_quiz_from_bank",
		},
		{
			id: "create-quiz",
			title: "Create Your Own Quiz",
			description: "Create your own questions and challenge others.",
			apiEndpoint: "/create_quiz_master",
		},
	]

	// Fetch user's recent quizzes and performance data
	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login")
			return
		}

		fetchUserData()
	}, [isAuthenticated, navigate])

	const fetchUserData = async () => {
		setLoading(true)
		const token = getAuthToken()

		try {
			// Fetch recent quizzes
			const recentResponse = await axios.get(
				`${API_BASE_URL}/recent_quizzes`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (recentResponse.data && recentResponse.data.quizzes) {
				setRecentQuizzes(recentResponse.data.quizzes)

				// Calculate user performance from recent quizzes
				const quizzes = recentResponse.data.quizzes
				if (quizzes.length > 0) {
					let totalCorrect = 0
					let totalTime = 0
					let quizzesWithTime = 0

					quizzes.forEach(quiz => {
						if (quiz.score !== undefined) {
							totalCorrect += parseInt(quiz.score)
						}

						if (quiz.time_taken) {
							totalTime += parseFloat(quiz.time_taken)
							quizzesWithTime++
						}
					})

					setUserPerformance({
						correctAnswers: totalCorrect,
						totalQuestions: quizzes.reduce(
							(acc, quiz) =>
								acc +
								(quiz.questions ? quiz.questions.length : 0),
							0
						),
						averageTime:
							quizzesWithTime > 0
								? (totalTime / quizzesWithTime).toFixed(1)
								: 0,
					})
				}
			}

			// Fetch theme leaderboard
			await fetchThemeLeaderboard(selectedTheme)
		} catch (error) {
			console.error("Error fetching user data:", error.response)
		} finally {
			setLoading(false)
		}
	}

	// Fetch leaderboard for selected theme
	const fetchThemeLeaderboard = async theme => {
		try {
			const token = getAuthToken()
			const formData = new FormData()
			formData.append("theme", theme)

			const response = await axios.get(
				`${API_BASE_URL}/leaderboard_theme`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data && response.data.leaderboard) {
				setThemeLeaderboard(response.data.leaderboard)

				// Set AI performance based on top scores (simulated AI performance)
				// In a real implementation, you'd get actual AI performance from the API
				const topScore = response.data.leaderboard[0]?.total_score || 0
				setAiPerformance({
					correctAnswers: Math.round(topScore * 0.9),
					totalQuestions: Math.round(topScore * 1.1),
					averageConfidence: Math.floor(85 + Math.random() * 10),
				})
			}
		} catch (error) {
			console.error("Error fetching leaderboard:", error)
		}
	}

	// Handle theme change
	const handleThemeChange = theme => {
		setSelectedTheme(theme)
		fetchThemeLeaderboard(theme)
	}

	// Start a challenge based on the selected mode
	const handleStartChallenge = async () => {
		const selectedMode =
			challengeModes.find(
				mode =>
					mode.title
						.toLowerCase()
						.includes(challengeType.toLowerCase()) ||
					mode.id.includes(challengeType.toLowerCase())
			) || challengeModes[0]

		if (selectedMode.id === "theme-challenge") {
			// Navigate to theme challenge with selected theme
			navigate(`/quiz?theme=${selectedTheme}&mode=theme-challenge`)
		} else if (selectedMode.id === "create-quiz") {
			// Navigate to create quiz page
			navigate("/create-quiz")
		} else {
			// Default: head-to-head challenge
			navigate("/aichallenge/beat-the-ai")
		}
	}

	// Handle direct selection of challenge mode
	const handleSelectChallengeMode = modeId => {
		if (modeId === "head-to-head") {
			navigate("/aichallenge/beat-the-ai")
		} else if (modeId === "theme-challenge") {
			navigate(`/quiz?theme=${selectedTheme}&mode=theme-challenge`)
		} else {
			navigate("/create-quiz")
		}
	}

	return (
		<div className="min-h-screen p-6 md:p-10 bg-gray-100 flex flex-col items-center">
			{/* Container */}
			<div className="w-full max-w-6xl space-y-6 md:space-y-8">
				{/* Title */}
				<h1 className="text-2xl md:text-3xl font-bold text-gray-800">
					Choose Your Challenge Mode
				</h1>

				{loading ? (
					<div className="flex justify-center items-center p-10">
						<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#661fff]"></div>
					</div>
				) : (
					<>
						{/* Challenge Mode Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{challengeModes.map(mode => (
								<div
									key={mode.id}
									onClick={() =>
										handleSelectChallengeMode(mode.id)
									}
									className="bg-white rounded-lg shadow p-5 flex flex-col items-start transition-all duration-300 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
									<h2 className="text-lg font-semibold mb-2 text-[#661fff]">
										{mode.title}
									</h2>
									<p className="text-sm text-gray-600">
										{mode.description}
									</p>
									<button className="mt-4 text-sm font-medium text-[#661fff] hover:underline">
										Start Now →
									</button>
								</div>
							))}
						</div>

						{/* Theme Selection */}
						<div className="bg-white rounded-lg shadow p-5">
							<h3 className="text-md font-bold text-gray-700 mb-3">
								Select Theme
							</h3>
							<div className="flex flex-wrap gap-2">
								{themes.map(theme => (
									<button
										key={theme}
										onClick={() => handleThemeChange(theme)}
										className={`px-4 py-2 rounded-full text-sm font-medium transition ${
											selectedTheme === theme
												? "bg-[#661fff] text-white"
												: "bg-gray-200 text-gray-700 hover:bg-gray-300"
										}`}>
										{theme.charAt(0).toUpperCase() +
											theme.slice(1)}
									</button>
								))}
							</div>
						</div>

						{/* Performance Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Your Performance */}
							<div className="bg-white rounded-lg shadow p-5">
								<h3 className="text-md font-bold text-gray-700 mb-3">
									Your Performance
								</h3>
								<div className="flex flex-col space-y-2">
									<p className="text-gray-600">
										<span className="font-semibold">
											Correct Answers:
										</span>
										{` ${userPerformance.correctAnswers}/${
											userPerformance.totalQuestions || 1
										}`}
									</p>
									<p className="text-gray-600">
										<span className="font-semibold">
											Average Time:
										</span>
										{` ${userPerformance.averageTime}s`}
									</p>
									<div className="mt-2 pt-2 border-t border-gray-200">
										<p className="text-sm text-gray-500">
											Accuracy Rate:{" "}
											{userPerformance.totalQuestions
												? (
														(userPerformance.correctAnswers /
															userPerformance.totalQuestions) *
														100
												  ).toFixed(1)
												: 0}
											%
										</p>
									</div>
								</div>
							</div>

							{/* AI Performance */}
							<div className="bg-white rounded-lg shadow p-5">
								<h3 className="text-md font-bold text-gray-700 mb-3">
									AI Performance
								</h3>
								<div className="flex flex-col space-y-2">
									<p className="text-gray-600">
										<span className="font-semibold">
											Correct Answers:
										</span>
										{` ${aiPerformance.correctAnswers}/${
											aiPerformance.totalQuestions || 1
										}`}
									</p>
									<p className="text-gray-600">
										<span className="font-semibold">
											Average Confidence:
										</span>
										{` ${aiPerformance.averageConfidence}%`}
									</p>
									<div className="mt-2 pt-2 border-t border-gray-200">
										<p className="text-sm text-gray-500">
											Accuracy Rate:{" "}
											{aiPerformance.totalQuestions
												? (
														(aiPerformance.correctAnswers /
															aiPerformance.totalQuestions) *
														100
												  ).toFixed(1)
												: 0}
											%
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Top Performers in Selected Theme */}
						<div className="bg-white rounded-lg shadow p-5">
							<h3 className="text-md font-bold text-gray-700 mb-3">
								Top Performers in{" "}
								{selectedTheme.charAt(0).toUpperCase() +
									selectedTheme.slice(1)}
							</h3>

							{themeLeaderboard.length > 0 ? (
								<div className="overflow-x-auto">
									<table className="min-w-full">
										<thead>
											<tr className="border-b border-gray-200">
												<th className="text-left py-2 px-3 text-sm font-medium text-gray-600">
													Rank
												</th>
												<th className="text-left py-2 px-3 text-sm font-medium text-gray-600">
													Username
												</th>
												<th className="text-right py-2 px-3 text-sm font-medium text-gray-600">
													Score
												</th>
											</tr>
										</thead>
										<tbody>
											{themeLeaderboard.map(
												(entry, index) => (
													<tr
														key={index}
														className="border-b border-gray-100">
														<td className="py-2 px-3 text-sm text-gray-800">
															{index + 1}
														</td>
														<td className="py-2 px-3 text-sm text-gray-800">
															{entry.username}
														</td>
														<td className="py-2 px-3 text-sm text-gray-800 text-right">
															{entry.total_score}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							) : (
								<p className="text-gray-500 text-sm">
									No leaderboard data available for this
									theme.
								</p>
							)}
						</div>

						{/* Quick Challenge Entry */}
						<div className="bg-white rounded-lg shadow p-5">
							<h3 className="text-md font-bold text-gray-700 mb-4">
								Quick Challenge Entry
							</h3>

							<label
								htmlFor="challengeMode"
								className="block font-medium mb-2 text-gray-700">
								Enter challenge type or select from above
							</label>

							<input
								id="challengeMode"
								type="text"
								value={challengeType}
								onChange={e => setChallengeType(e.target.value)}
								placeholder="e.g., Head-to-Head, Theme Challenge"
								className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#661fff] mb-4"
							/>

							<div className="flex space-x-4">
								<button
									className="bg-[#661fff] text-white px-5 py-2 rounded-full hover:bg-[#7a48e8] focus:outline-none focus:ring-2 focus:ring-[#661fff]"
									onClick={handleStartChallenge}>
									Start Challenge
								</button>
								<button
									className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
									onClick={() => setChallengeType("")}>
									Clear
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
