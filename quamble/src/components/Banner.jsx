import React from "react";
import ScoreCard from "./ScoreCard";

export default function Banner() {
  return (
    <>
      <section class="relative bg-[url('/assets/Banner.png')] bg-cover bg-center bg-no-repeat">
      {/* <div class="absolute inset-0 bg-gradient-to-l from-gray-600 via-transparen"></div> */}

        <div class="relative mx-auto max-w-screen-xl px-4 py-28 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 justify-end">
          <div class="w-full max-w-2xl text-left ltr:sm:text-left rtl:sm:text-right bg-[#f6ecc6] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 pt-6 p-10 rounded-lg border-2 shadow-[0px_0px_30px_0px_#4a5568]">
            <ScoreCard />
          </div>
        </div>
      </section>
    </>
  );
}
