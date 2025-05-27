import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const defaultQuizCardsData = [
	{
		title: "Science",
		description:
			"The cutting-edge language model that makes interactions a breeze...",
		image: "https://www.svgrepo.com/show/530438/ddos-protection.svg",
		background: "/assets/Cards/science.jpeg",
	},
	{
		title: "History",
		description: "Simply input your subject, click the generate button...",
		image: "https://www.svgrepo.com/show/530442/port-detection.svg",
		background: "/assets/Cards/history.jpg",
	},
	{
		title: "Geography",
		description:
			"We offer advanced customization. You can freely combine options...",
		image: "https://www.svgrepo.com/show/530444/availability.svg",
		background: "/assets/Cards/geography.png",
	},
	{
		title: "Music",
		description: "We offer a free trial service without login...",
		image: "https://www.svgrepo.com/show/530440/machine-vision.svg",
		background: "/assets/Cards/music.jpg",
	},
	{
		title: "Programming",
		description:
			"We offer many templates covering areas such as writing...",
		image: "https://www.svgrepo.com/show/530450/page-analysis.svg",
		background: "/assets/Cards/programming.png",
	},
	{
		title: "Sports",
		description:
			"Our product is compatible with multiple platforms including Web...",
		image: "https://www.svgrepo.com/show/530453/mail-reception.svg",
		background: "/assets/Cards/sports.png",
	},
]

export default function QuizCardsSection() {
	const [quizCardsData, setQuizCardsData] = useState(defaultQuizCardsData)
	const [loading, setLoading] = useState(false)
	const { getAuthToken, isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated()) {
			fetchAvailableThemes()
		}
	}, [])

	const fetchAvailableThemes = async () => {
		setLoading(true)
		try {
			const token = getAuthToken()

			// Since there's no specific endpoint to get all themes,
			// we'll try to get theme-specific leaderboards to see what themes are available
			// For now, we'll use the default themes and make them dynamic with question counts

			// You could potentially call multiple theme-specific endpoints here
			// or add a new API endpoint to get all available themes

			setQuizCardsData(defaultQuizCardsData)
		} catch (error) {
			console.error("Error fetching themes:", error)
			// Keep default data on error
		} finally {
			setLoading(false)
		}
	}

	const handleQuizNavigation = theme => {
		// Create dynamic link with theme parameter
		return `/quiz/ai-quiz?theme=${theme}&mode=theme-challenge&numQuestions=5`
	}

	return (
		<div className="px-2 py-10 pb-20">
			<div id="features" className="mx-auto max-w-6xl">
				<p className="text-center text-base font-semibold leading-7 text-primary-500">
					Quizzes
				</p>
				<h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
					Quizzing has never been so fun and interactive.
				</h2>

				<ul className="mt-16 grid grid-cols-1 gap-6 text-slate-700 md:grid-cols-3">
					{quizCardsData.map((card, index) => (
						<Link key={index} to={handleQuizNavigation(card.theme)}>
							<li
								className={`
                  relative 
                  cursor-pointer
                  flex flex-col justify-between
                  min-h-48
                  rounded-tr-3xl rounded-bl-3xl 
                  hover:scale-105 
                  transition-all
                  ease-in-out 
                  duration-500 
                  hover:shadow-2xl 
                  hover:shadow-black 
                  hover:rounded-tl-3xl 
                  hover:rounded-br-3xl
                `}
								style={{
									backgroundImage: `url(${card.background})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}>
								{/* Vintage Overlay */}
								<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-white mix-blend-multiply rounded-tr-3xl rounded-bl-3xl hover:rounded-tl-3xl transition-all ease-out duration-500" />

								<div className="relative block px-6 py-3 mt-auto">
									<div className="flex gap-2 items-center">
										<img
											src={card.image}
											alt={card.title}
											className="h-7 w-7"
										/>
										<h3 className="my-3 font-display font-medium text-white">
											{card.title}
										</h3>
									</div>
									<p className="mt-1.5 text-sm leading-6 text-white">
										{card.description}
									</p>
								</div>
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	)
}
