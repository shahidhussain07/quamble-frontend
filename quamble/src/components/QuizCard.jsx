import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import QuestionCard from "./QuestionCard"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const QuizCard = () => {
	const [quizQuestions, setQuizQuestions] = useState([])
	const [correctAnswers, setCorrectAnswers] = useState([])
	const [userAnswers, setUserAnswers] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState(1)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [quizId, setQuizId] = useState(null)
	const [startTime, setStartTime] = useState(null)
	const [difficulty, setDifficulty] = useState("Easy")
	const [isHeadToHead, setIsHeadToHead] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()
	const { getAuthToken, isAuthenticated } = useAuth()

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	// Extract query parameters
	const queryParams = new URLSearchParams(location.search)
	const theme = queryParams.get("theme") || "general"
	const mode = queryParams.get("mode") || "theme-challenge"
	const numQuestions = queryParams.get("numQuestions") || 5

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login")
			return
		}

		// Record the start time when the component mounts
		setStartTime(new Date().toISOString())
		setIsHeadToHead(mode === "head-to-head")

		// Initialize user answers array based on the mode
		if (mode === "head-to-head") {
			// For head-to-head, we don't know the number of questions in advance
			setUserAnswers([])
		} else {
			setUserAnswers(Array(numQuestions).fill(""))
		}

		// Fetch quiz based on the mode
		fetchQuiz()
	}, [isAuthenticated, theme, mode, numQuestions, navigate])

	const fetchQuiz = async () => {
		setLoading(true)
		setError(null)
		try {
			const token = getAuthToken()
			let response

			// Choose the appropriate API endpoint based on the mode
			if (mode === "head-to-head") {
				// Use beat_the_ai API for head-to-head mode
				response = await axios.post(
					`${API_BASE_URL}/beat_the_ai`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				// For beat_the_ai, we get one question at a time
				if (response.data && response.data.question) {
					const questionData = {
						question: response.data.question,
						options: Object.values(response.data.options || {}),
						difficulty: response.data.difficulty,
						theme: response.data.theme,
					}

					setQuizQuestions([questionData])
					setDifficulty(response.data.difficulty)
					setCorrectAnswers([]) // We don't get correct answers upfront in beat_the_ai
					setUserAnswers([""])

					// Generate a temporary quiz ID for beat_the_ai mode
					setQuizId(`beat_ai_${Date.now()}`)
				}
			} else if (mode === "theme-challenge") {
				// Use create_quiz_from_bank API for theme challenges
				response = await axios.post(
					`${API_BASE_URL}/create_quiz_from_bank`,
					{
						theme: theme,
						num_questions: numQuestions,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				// Process the response for theme challenges
				if (response.data && response.data.questions) {
					setQuizId(response.data.quiz_id)

					// Process questions - they might be question IDs or full question objects
					let processedQuestions = []

					if (Array.isArray(response.data.questions)) {
						// If questions are IDs, we need to fetch the actual questions
						// For now, assume they're already formatted
						processedQuestions = response.data.questions.map(q => {
							if (typeof q === "string") {
								try {
									return JSON.parse(q)
								} catch {
									return { question: q, options: [] }
								}
							} else if (typeof q === "object" && q.question) {
								return q
							} else {
								// If it's just an ID, create a placeholder
								return {
									question: `Question ${q}`,
									options: ["Loading..."],
									id: q,
								}
							}
						})
					}

					setQuizQuestions(processedQuestions)
					setCorrectAnswers(response.data.correct_options || [])
				}
			} else {
				// Default to create_quiz_from_bank
				response = await axios.post(
					`${API_BASE_URL}/create_quiz_from_bank`,
					{
						theme: theme,
						num_questions: numQuestions,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (response.data) {
					setQuizId(response.data.quiz_id)
					const questions = response.data.questions.map(q => {
						if (typeof q === "string") {
							try {
								return JSON.parse(q)
							} catch {
								return { question: q, options: [] }
							}
						}
						return q
					})
					setQuizQuestions(questions)
					setCorrectAnswers(response.data.correct_options || [])
				}
			}
		} catch (err) {
			console.error("Error fetching quiz:", err)
			if (err.response?.data?.error) {
				setError(err.response.data.error)
			} else {
				setError("Failed to load quiz. Please try again.")
			}
		} finally {
			setLoading(false)
		}
	}

	const fetchNextBeatTheAIQuestion = async () => {
		try {
			const token = getAuthToken()
			const response = await axios.post(
				`${API_BASE_URL}/beat_the_ai`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data && response.data.question) {
				const questionData = {
					question: response.data.question,
					options: Object.values(response.data.options || {}),
					difficulty: response.data.difficulty,
					theme: response.data.theme,
				}

				// Add the new question to the existing questions
				setQuizQuestions(prev => [...prev, questionData])
				setDifficulty(response.data.difficulty)
				setUserAnswers(prev => [...prev, ""])
				setCurrentQuestion(prev => prev + 1)
			}
		} catch (error) {
			console.error("Error fetching next question:", error)
		}
	}

	const handleAnswerChange = answer => {
		// Update the user's answer for the current question
		const updatedAnswers = [...userAnswers]
		updatedAnswers[currentQuestion - 1] = answer
		setUserAnswers(updatedAnswers)
	}

	const handleNext = () => {
		// For head-to-head mode, fetch next question dynamically
		if (isHeadToHead) {
			fetchNextBeatTheAIQuestion()
		} else {
			// Regular mode - move to next existing question
			if (currentQuestion < quizQuestions.length) {
				setCurrentQuestion(currentQuestion + 1)
			}
		}
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#661fff] mx-auto"></div>
					<p className="mt-4 text-gray-600">
						{mode === "head-to-head"
							? "Preparing AI Challenge..."
							: "Loading Quiz..."}
					</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-center max-w-md">
					<div className="text-red-500 text-xl mb-4">{error}</div>
					<button
						onClick={fetchQuiz}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
						Try Again
					</button>
				</div>
			</div>
		)
	}

	if (!quizQuestions.length) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-center">
					<div className="text-gray-500 text-xl mb-4">
						No questions available
					</div>
					<button
						onClick={() => navigate(-1)}
						className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
						Go Back
					</button>
				</div>
			</div>
		)
	}

	const currentQuestionData = quizQuestions[currentQuestion - 1]

	return (
		<div>
			{/* Show difficulty and mode info for head-to-head */}
			{isHeadToHead && (
				<div className="text-center py-4 bg-gradient-to-r from-red-500 to-purple-600 text-white">
					<h2 className="text-lg font-bold">
						🤖 Beat the AI Challenge
					</h2>
					<p className="text-sm">
						Difficulty: {difficulty} | Theme:{" "}
						{currentQuestionData?.theme || theme}
					</p>
				</div>
			)}
			<QuestionCard
				question={currentQuestionData.question}
				options={currentQuestionData.options || []}
				currentQuestion={currentQuestion}
				totalQuestions={quizQuestions.length}
				onAnswerChange={handleAnswerChange}
				onNext={handleNext}
				quizId={quizId}
				theme={theme}
				startTime={startTime}
				allUserResponses={userAnswers}
			/>
		</div>
	)
}
export default QuizCard
