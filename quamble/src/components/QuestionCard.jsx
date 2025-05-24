import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { runConfettiEffect } from "../script/confettiEffect"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const QuestionCard = ({
	question,
	options,
	currentQuestion,
	totalQuestions,
	onAnswerChange,
	onNext,
	quizId,
	theme,
	startTime,
	allUserResponses = [],
}) => {
	const [selectedOption, setSelectedOption] = useState("")
	const [timeLeft, setTimeLeft] = useState(30)
	const [showModal, setShowModal] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()
	const { getAuthToken } = useAuth()

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	useEffect(() => {
		setSelectedOption("") // Reset selected option when question changes
		setTimeLeft(10) // Reset timer for each question

		let timerExpired = false // Flag to ensure `onNext` is called only once
		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1 && !timerExpired) {
					clearInterval(timer)
					timerExpired = true // Set the flag to true to prevent repeated calls
					onNext() // Automatically move to the next question when timer ends
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => {
			clearInterval(timer)
			timerExpired = true // Prevent `onNext` call if the component unmounts or re-renders
		}
	}, [question, onNext]) // Add `question` and `onNext` as dependencies

	const handleOptionChange = option => {
		setSelectedOption(option)
		onAnswerChange(option)
	}

	const handleSubmit = () => {
		setShowModal(true)
	}

	const handleConfirmSubmit = async () => {
		setShowModal(false)
		setIsSubmitting(true)

		try {
			const token = getAuthToken()
			const endTime = new Date().toISOString()

			// Submit quiz using the /submit_quiz API endpoint
			const response = await axios.post(
				`${API_BASE_URL}/submit_quiz`,
				{
					quiz_id: quizId,
					user_response: allUserResponses,
					theme: theme,
					start_time: startTime,
					end_time: endTime,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data && response.data.status === "success") {
				// If submission was successful, run confetti effect and navigate to results
				runConfettiEffect()
				navigate("/aichallenge/result", {
					state: {
						quizResult: response.data,
						userResponses: allUserResponses,
					},
				})
			} else {
				console.error("Quiz submission failed:", response.data)
				alert("Failed to submit quiz. Please try again.")
			}
		} catch (error) {
			console.error("Error submitting quiz:", error)
			alert(
				"An error occurred while submitting your quiz. Please try again."
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="py-20">
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
						<label
							key={index}
							className="flex items-center space-x-2 border-gray-400 border-2 p-3 rounded-xl">
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
							disabled={isSubmitting}>
							Next
						</button>
					) : (
						<button
							onClick={handleSubmit}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
							disabled={isSubmitting}>
							Submit
						</button>
					)}
				</div>

				{/* Confirmation Modal */}
				{showModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white p-5 rounded-lg shadow-lg">
							<p className="mb-4 text-gray-700">
								Are you sure you want to submit the quiz?
							</p>
							<div className="flex justify-end space-x-2">
								<button
									onClick={() => setShowModal(false)}
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
									disabled={isSubmitting}>
									Cancel
								</button>
								<button
									onClick={handleConfirmSubmit}
									className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
									disabled={isSubmitting}>
									{isSubmitting ? "Submitting..." : "Confirm"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default QuestionCard
