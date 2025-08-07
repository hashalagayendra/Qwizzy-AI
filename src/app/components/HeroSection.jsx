import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import herobg from "@/assest/hero_bg.png"; // Assuming you have a background image
function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full h-dvh flex flex-col items-center  relative">
      <div className=" flex flex-col items-start max-md:items-center justify-center bg-black/50 backdrop-blur-xs  absolute top-0 left-0  w-full h-full">
        <div className=" pl-32 flex flex-col gap-18 max-w-3xl  max-md:pl-0  max-md:text-center">
          <h1
            className="  max-md:text-center w-full text-8xl text-transparent bg-clip-text animate-gradient bg-[length:300%_300%]"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
            }}
          >
            Qwizzy AI
          </h1>
          <h1 className="text-lg text-purple-200 ">
            Whether you’re building quizzes, assignments, or full exams, our AI
            helps you generate question papers in seconds. Students can answer
            directly on the platform, with real-time tracking and grading
            support.
          </h1>

          <div className="w-full  max-md:text-center max-md:flex justify-center ">
            <div
              onClick={() => {
                router.push("/dashboard");
              }}
              className="p-[2px] w-fit rounded-xl animate-border bg-[length:300%_300%]"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
              }}
            >
              <div className="cursor-pointer rounded-xl bg-black/80 px-10 py-3 text-white">
                <h1 className="text-xl">Get Started</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src={herobg.src}
        className="  object-cover object-center w-full h-full "
        alt=""
      />
    </div>
  );
}

export default HeroSection;

//  <div className="w-full   flex flex-col  items-center gap-10 py-20 ">
//       <h1 className=" lg:text-8xl md:text-6xl text-5xl text-center md:max-w-3xl lg:max-w-5xl max-w-xl  text-primary tracking-wide">
//         Create, Assign, and Solve Question Papers Online
//       </h1>
//       <p className="text-primary text-lg md:text-xl tracking-widest text-center px-5">
//         Teachers can build and share exams, while students practice and submit
//         answers effortlessly.{" "}
//       </p>
//       <Link href={"/login"}>
//         <div className="py-5 px-9 bg-primary  rounded-lg ">
//           <h1 className="text-white md:text-xl text-lg">Get Started</h1>
//         </div>
//       </Link>
//     </div>
