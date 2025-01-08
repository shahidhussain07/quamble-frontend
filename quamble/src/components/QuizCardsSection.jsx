import React from "react";
import { Link } from "react-router-dom";

const quizCardsData = [
  {
    title: "AI Quiz",
    description:
      "The cutting-edge language model that makes interactions a breeze. With its user-friendly interface, effortlessly tap into the world of AI-generated text.",
    image: "https://www.svgrepo.com/show/530438/ddos-protection.svg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Easy to use",
    description:
      "Simply input your subject, click the generate button, and the result will appear in seconds just like magic.",
    image: "https://www.svgrepo.com/show/530442/port-detection.svg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Custom settings",
    description:
      "We offer advanced customization. You can freely combine options like roles, languages, publish, tones, lengths, and formats.",
    image: "https://www.svgrepo.com/show/530444/availability.svg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Free trial",
    description:
      "We offer a free trial service without login. We provide many payment options including pay-as-you-go and subscription.",
    image: "https://www.svgrepo.com/show/530440/machine-vision.svg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "90+ templates",
    description:
      "We offer many templates covering areas such as writing, education, lifestyle, and creativity to inspire your potential.",
    image: "https://www.svgrepo.com/show/530450/page-analysis.svg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Use Anywhere",
    description:
      "Our product is compatible with multiple platforms including Web, Chrome, Windows, and Mac, so you can use it anywhere.",
    image: "https://www.svgrepo.com/show/530453/mail-reception.svg",
    link: "/quiz/ai-quiz",
  },
];

export default function QuizCardsSection() {
  return (
    <div className="px-2 py-10">
      <div id="features" className="mx-auto max-w-6xl">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">
          Quizzes
        </p>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Quizzing has never been so fun and interactive.
        </h2>
        <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
          {quizCardsData.map((card, index) => (
            <li
              key={index}
              className="rounded-xl bg-white px-6 py-8 shadow-sm hover:shadow-2xl hover:shadow-purple-300 border border-gray-300 hover:border-purple-300 hover:bg-gradient-radial hover:from-purple-100 hover:via-purple-100 hover:to-purple-300"
            >
              <Link to={card.link}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="mx-auto h-10 w-10"
                />
                <h3 className="my-3 font-display font-medium">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                  {card.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
