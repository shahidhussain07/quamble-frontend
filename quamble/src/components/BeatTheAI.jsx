import { Link } from "react-router-dom"

// Beat the AI Special Card Component
const BeatTheAICard = () => {
	const handleBeatTheAI = () => {
		return `/quiz/ai-quiz?mode=head-to-head`
	}

	return (
		<div className="mt-8 flex justify-center">
			<Link to={handleBeatTheAI()}>
				<div className="relative cursor-pointer flex flex-col justify-between min-h-32 w-80 rounded-tr-3xl rounded-bl-3xl hover:scale-105 transition-all ease-in-out duration-500 hover:shadow-2xl hover:shadow-black hover:rounded-tl-3xl hover:rounded-br-3xl bg-gradient-to-r from-red-600 to-purple-600">
					<div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-tr-3xl rounded-bl-3xl hover:rounded-tl-3xl transition-all ease-out duration-500" />
					<div className="relative block px-6 py-4 text-center">
						<h3 className="text-2xl font-bold text-white mb-2">
							🤖 Beat the AI
						</h3>
						<p className="text-sm text-white">
							Challenge our AI with increasing difficulty!
						</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default BeatTheAICard
