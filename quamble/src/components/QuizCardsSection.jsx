import React from "react";
import { Link } from "react-router-dom";

const quizCardsData = [
  {
    title: "Science",
    description:
      "The cutting-edge language model that makes interactions a breeze...",
    image: "https://www.svgrepo.com/show/530438/ddos-protection.svg",
    background: "/assets/Cards/science.jpeg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "History",
    description:
      "Simply input your subject, click the generate button...",
    image: "https://www.svgrepo.com/show/530442/port-detection.svg",
    background: "/assets/Cards/history.jpg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Geography",
    description:
      "We offer advanced customization. You can freely combine options...",
    image: "https://www.svgrepo.com/show/530444/availability.svg",
    background: "/assets/Cards/geography.png",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Music",
    description:
      "We offer a free trial service without login...",
    image: "https://www.svgrepo.com/show/530440/machine-vision.svg",
    background: "/assets/Cards/music.jpg",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Programming",
    description:
      "We offer many templates covering areas such as writing...",
    image: "https://www.svgrepo.com/show/530450/page-analysis.svg",
    background: "/assets/Cards/programming.png",
    link: "/quiz/ai-quiz",
  },
  {
    title: "Sports",
    description:
      "Our product is compatible with multiple platforms including Web...",
    image: "https://www.svgrepo.com/show/530453/mail-reception.svg",
    background: "/assets/Cards/sports.png",
    link: "/quiz/ai-quiz",
  },
];

export default function QuizCardsSection() {
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
            <Link to={card.link} >
            <li
            key={index}
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
            }}
          >
            {/* Vintage Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-white mix-blend-multiply rounded-tr-3xl rounded-bl-3xl hover:rounded-tl-3xl transition-all ease-out duration-500" />
            {/* Vintage CSS Filter */}
            {/* <div className="absolute inset-0 filter sepia-[0.6] saturate-50 contrast-90 rounded-tr-3xl rounded-bl-3xl hover:rounded-tl-3xl" /> */}
          
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
                {/* {card.description} */}
              </p>
            </div>
          </li>          
          </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
