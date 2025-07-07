"use client";
import { use, useEffect, useState } from "react";
import React from "react";
import HomeHeadder from "@/app/components/HomeHeadder";
import { Toaster } from "react-hot-toast";
import bg from "@/assest/formbg.jpeg";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import EachQuestionInAnwerPage from "@/app/components/EachQuestionInAnwerPage";
import { useRouter } from "next/navigation";
function page() {
  const Router = useRouter();
  const param = useParams();
  const [openQuizTab, setOpenQuizTab] = useState(true);
  // const [paper_with_Assigning_data, setpaper_with_Assigning_data] = useState();
  // const [questions, setQuestions] = useState();
  const [paperDetails, setPaperDetails] = useState();
  const [selectedQuestionindex, setselectedQuestionindex] = useState(0);

  const paperID = param.paperID;
  const { data: session, status } = useSession();

  console.log("Paper ID:", paperID);

  if (status === "unauthenticated") {
    Router.push("/login");
  }
  //change status of paper to true
  async function StartPaper() {
    try {
      const response = await axios.post("/api/answering_papers", {
        method: "Start_Paper",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
        },
      });

      // Extract the paper list from the response
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  }

  async function get_paper_with_Assigning_data() {
    try {
      console.log("Paper ID:", paperID);
      console.log("User ID:", session.user.newID);
      const response = await axios.post("/api/answering_papers", {
        method: "get_paper_with_assigning_data",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
        },
      });

      console.log("Paper with Assigning Data:", response.data.data);

      setPaperDetails(response.data.data.paper);
      // setQuestions(response.data.data.paper.questions);

      // Extract the paper list from the response
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  }

  const uploadPaper = async () => {
    try {
      const response = await axios.post("/api/answering_papers", {
        method: "uploadPaper",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
          questions: paperDetails.questions,
        },
      });

      // Extract the paper list from the response
    } catch (error) {
      console.error("Error fuploadPaper:", error);
    }
  };

  useEffect(() => {
    get_paper_with_Assigning_data();
  }, [session?.user?.newID, paperID]);

  // useEffect(() => {
  //   console.log("mark is ,", marks);
  // }, [marks]);

  //  useEffect(() => {
  //   get_paper_with_Assigning_data();
  // }, []);

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right"></Toaster>
      <div className="absolute top-0 left-0 z-50 w-full">
        <HomeHeadder></HomeHeadder>
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={bg.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Overlay and signup box */}
      <div className="flex items-center justify-center min-h-screen w-full ">
        <div
          className={`flex   ${
            openQuizTab ? "justify-center" : "justify-start"
          } justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen  text-center text-white`}
        >
          <div className=" w-full h-[calc(100vh-64px)] mt-16 flex justify-center ">
            {" "}
            {/* paper starting tab */}
            {!openQuizTab && (
              <div className="mt-12 ">
                <h1 className="text-5xl font-bold">ICT Paper</h1>
                <p className="mt-4 max-w-xl text-lg justify-self-center">
                  The ICT (Information and Communication Technology) paper tests
                  a student's understanding of how computers, communication
                  systems, and digital technologies are used to store, process,
                  and share information. It usually includes questions on topics
                  like computer hardware and software,
                </p>
                <p className="mt-8 text-2xl">20 minute</p>
                <button
                  onClick={() => {
                    StartPaper();
                  }}
                  className="mt-12 rounded-md border border-gray-300 px-10 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
                >
                  Start
                </button>
              </div>
            )}
            <div className=" flex w-full h-full items-center justify-between px-20">
              {paperDetails ? (
                <EachQuestionInAnwerPage
                  uploadPaper={uploadPaper}
                  setPaperDetails={setPaperDetails}
                  question_index={selectedQuestionindex}
                  paperQuestions={paperDetails && paperDetails.questions} //questionn array
                  setselectedQuestionindex={setselectedQuestionindex}
                ></EachQuestionInAnwerPage>
              ) : (
                <div>
                  {" "}
                  <h1>Loding...</h1>
                </div>
              )}

              <div className="w-1/3 flex flex-col h-[calc(100%-40px)] py-6 bg-white/20 backdrop-blur-md rounded-lg ring-2 ring-white">
                <h1>20 minutes</h1>
                <h1>Select Questions</h1>

                <div className="w-full h-full grid grid-cols-5 gap-2 content-start items-start px-4 py-6  ">
                  {paperDetails &&
                    paperDetails.questions.map((item, index) => (
                      <div
                        onClick={() => {
                          setselectedQuestionindex(index);

                          console.log(
                            selectedQuestionindex ===
                              paperDetails.questions.length - 1
                          );
                        }}
                        key={index}
                        className={`w-16 h-10 flex justify-center items-center rounded-md ${
                          selectedQuestionindex === index
                            ? "bg-amber-300"
                            : "bg-white/20"
                        } `}
                      >
                        <h1>{index + 1}</h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
