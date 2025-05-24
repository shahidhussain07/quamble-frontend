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

		// Initialize user answers array based on the number of questions
		setUserAnswers(Array(parseInt(numQuestions)).fill(""))

		// Fetch quiz based on the mode
		fetchQuiz()
	}, [isAuthenticated, theme, mode, numQuestions, navigate])

	const fetchQuiz = async () => {
		setLoading(true)
		try {
			const token = getAuthToken()
			let response

			// Choose the appropriate API endpoint based on the mode
			if (mode === "theme-challenge") {
				// Use create_quiz_from_bank API for theme challenges
				response = await axios.post(
					`${API_BASE_URL}/create_quiz_from_bank`,
					{
						theme,
						num_questions: numQuestions,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
			} else if (mode === "head-to-head") {
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
			} else {
				// Default to create_quiz_from_bank
				response = await axios.post(
					`${API_BASE_URL}/create_quiz_from_bank`,
					{
						theme,
						num_questions: numQuestions,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
			}

			// Process the response
			if (response.data) {
				setQuizId(response.data.quiz_id)

				// Process questions
				const questions = response.data.questions.map(q => {
					// Handle both string and object formats
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
		} catch (err) {
			console.error("Error fetching quiz:", err)
			setError("Failed to load quiz. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	const handleAnswerChange = answer => {
		// Update the user's answer for the current question
		const updatedAnswers = [...userAnswers]
		updatedAnswers[currentQuestion - 1] = answer
		setUserAnswers(updatedAnswers)
	}

	const handleNext = () => {
		// Move to the next question
		if (currentQuestion < quizQuestions.length) {
			setCurrentQuestion(currentQuestion + 1)
		}
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#661fff]"></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-red-500 text-xl">{error}</div>
			</div>
		)
	}

	if (!quizQuestions.length) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-gray-500 text-xl">
					No questions available
				</div>
			</div>
		)
	}

	const currentQuestionData = quizQuestions[currentQuestion - 1]

	return (
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
	)
}
export default QuizCard
