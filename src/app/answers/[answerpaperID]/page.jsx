"use client";
import React, { useEffect, useState } from "react";
import HomeHeadder from "@/app/components/HomeHeadder";
import { Toaster } from "react-hot-toast";
import dashPIC from "@/assest/dashpic.jpeg";
import { Check } from "lucide-react";

import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

function page() {
  const parems = useParams();
  const paperID = parems.answerpaperID;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [paperDetails, setPaperDetails] = useState();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  useEffect(() => {
    async function Get_answerd_paper_details() {
      try {
        console.log("Paper ID:", paperID);
        console.log("User ID:", session.user.newID);
        const response = await axios.post("/api/answering_papers", {
          method: "Get_answerd_paper_details",
          data: {
            userID: session.user.newID,
            paperID: Number(paperID),
            status: true,
          },
        });

        console.log("Paper with Assigning Data:", response.data.data.questions);

        // if (response.data.data.status) {
        //   console.log("already did paper");
        //   router.push("/dashboard");
        // }

        if (!response.data.data) {
          console.log("tiger push");
          router.push("/dashboard");
        }

        setPaperDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    }
    console.log(session);

    Get_answerd_paper_details();
  }, [session]);

  //   if (paperDetails) {
  //     console.log(paperDetails);
  //   }

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right"></Toaster>
      <div className="fixed top-0 backdrop-blur-3xl bg-black/80  left-0 z-50 w-full">
        <HomeHeadder></HomeHeadder>
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={dashPIC.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Overlay and signup box */}

      <div className="flex flex-col items-center  bg-black/70 backdrop-blur-xs w-full h-full px-10 min-h-screen">
        <div className="w-full max-w-3xl    mt-24 flex flex-col items-center  ">
          <h1 className="text-3xl  text-white">
            {paperDetails?.paper.paper_name}
          </h1>
          <h1 className="  text-white max-w-xl text-center ">
            {paperDetails?.paper.description}
          </h1>
          <h1 className="  text-white max-w-xl text-center mt-5 ">
            {paperDetails?.marks} Marks
          </h1>

          <div className="w-full  bg-white/30 mt-10 px-10 py-5 rounded-2xl">
            <h1 className="text-white  text-lg">1 Questions </h1>
            <h1 className="text-white mt-3">
              Which planet is known as the Red Planet?
            </h1>

            <div className="w-full flex flex-col gap-2 mt-5">
              <div className="w-full bg-white/20 py-2 px-4 rounded-lg flex justify-between text-white">
                <h1>dcd</h1>
                <Check strokeWidth={2} className="text-green-500 "></Check>
              </div>
              <div className="w-full bg-white/20 py-2 px-4 rounded-lg text-white">
                ad
              </div>
              <div className="w-full bg-white/20 py-2 px-4 rounded-lg text-white">
                ad
              </div>
              <div className="w-full bg-white/20 py-2 px-4 rounded-lg text-white">
                ad
              </div>
            </div>
          </div>

          {paperDetails?.questions.map((item, index) => (
            <div
              key={index}
              className="w-full  bg-white/30 mt-10 px-10 py-5 rounded-2xl"
            >
              <h1 className="text-white  text-lg">{index + 1} Questions </h1>
              <h1 className="text-white mt-3">{item.Question_Description}</h1>

              <div className="w-full flex flex-col gap-2 mt-5">
                {item.Answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className={`w-full ${
                      answer.select && answer.Correct
                        ? "ring-2 ring-green-500"
                        : answer.select && "ring-2 ring-red-500"
                    }  py-2 px-4 rounded-lg bg-white/20 flex justify-between text-white`}
                  >
                    <h1>{answer.Answer_Description}</h1>
                    <h1>{}</h1>
                    <Check
                      strokeWidth={2}
                      className={` ${
                        !answer.Correct && "hidden"
                      } text-green-300`}
                    ></Check>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
