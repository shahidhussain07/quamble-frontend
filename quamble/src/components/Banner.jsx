import React from "react";
// import ScoreCard from "./ScoreCard";

export default function Banner() {
  return (
    <>
      <section className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <img
          src="/assets/Banner2.png"
          alt="Banner"
          className="absolute inset-0 w-full h-screen -mt-16"
        />
      </section>
    </>
  );
}
