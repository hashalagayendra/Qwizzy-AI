import React from "react";
import Link from "next/link";
function HeroSection() {
  return (
    <div className="w-full   flex flex-col  items-center gap-10 py-20 ">
      <h1 className=" lg:text-8xl md:text-6xl text-5xl text-center md:max-w-3xl lg:max-w-5xl max-w-xl  text-primary tracking-wide">
        Create, Assign, and Solve Question Papers Online
      </h1>
      <p className="text-primary text-lg md:text-xl tracking-widest text-center px-5">
        Teachers can build and share exams, while students practice and submit
        answers effortlessly.{" "}
      </p>
      <Link href={"/login"}>
        <div className="py-5 px-9 bg-primary  rounded-lg ">
          <h1 className="text-white md:text-xl text-lg">Get Started</h1>
        </div>
      </Link>
    </div>
  );
}

export default HeroSection;
