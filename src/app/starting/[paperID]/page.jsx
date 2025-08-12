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

import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
function page() {
  const Router = useRouter();
  const param = useParams();
  const [openQuizTab, setOpenQuizTab] = useState(false);
  // const [paper_with_Assigning_data, setpaper_with_Assigning_data] = useState();
  // const [questions, setQuestions] = useState();
  const [paperDetails, setPaperDetails] = useState();
  const [selectedQuestionindex, setselectedQuestionindex] = useState(0);
  const [marks, setMarks] = useState();
  const [loading, setLoading] = useState(true);
  const [model, setmodel] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [paperStatus, setPaperStatus] = useState(false);
  const [reseteble, setReseteble] = useState(false);
  const [currentUserPapersIds, setCurrentUserPapersIds] = useState([]);

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
    setLoading(true);
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

      if (response.data.data.status) {
        console.log("already did paper");
        setPaperStatus(true);
      }

      if (!response.data.data) {
        console.log("tiger push");
        Router.push("/dashboard");
      }

      setPaperDetails(response.data.data.paper);
      setSecondsLeft(response.data.data.paper.timeLimit * 60);
      setMarks(response.data.data.marks);
      // setQuestions(response.data.data.paper.questions);

      // Extract the paper list from the response
      console.log("tiger push");
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
    setLoading(false);
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

    let totalMarks = 0;

    await paperDetails.questions.forEach((question) => {
      // console.log("asdadadad", question);
      question.Answers.forEach((answer) => {
        console.log("asdadadad", answer);
        if (answer.select && answer.Correct) {
          console.log("Correct answer selected");

          totalMarks += 1;
        }
      });
      // setMarks(totalMarks);
    });

    console.log("totalMarks is ", totalMarks);

    await Upload_Marks(totalMarks);
  };

  async function Upload_Marks(totalMarks) {
    try {
      const response = await axios.post("/api/answering_papers", {
        method: "setMarks",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
          marks: totalMarks, // Assuming marks is the total marks calculated
        },
      });

      // Extract the paper list from the response
      Router.push(`/answers/${paperID}`);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  }

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  async function find_Is_resetable() {
    try {
      const creator_ID = await axios.post("/api/cheack_Resetable", {
        method: "cheack_Resetable",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
        },
      });

      console.log("creator_ID", creator_ID.data.data);
      console.log(
        "is resetable",
        creator_ID.data.data.paper.userId === session.user.newID
      );
      setReseteble(creator_ID.data.data.paper.userId === session.user.newID);
    } catch (error) {
      console.error("Error resetting answers:", error);
    }
  }

  async function reset_answers() {
    try {
      const res = await axios.post("/api/cheack_Resetable", {
        method: "reset_answers_and_marks_status",
        data: {
          userID: session.user.newID,
          paperID: Number(paperID),
        },
      });
      console.log("reset res", res);
    } catch (error) {
      console.error("Error resetting answers:", error);
    }
  }

  // async function reset_answers() {
  //   try {

  //   } catch (error) {
  //     console.error("Error resetting answers:", error);
  //   }
  // }

  async function get_papers_IDs_by_userId() {
    try {
      const response = await axios.post("/api/paper", {
        method: "get_papers_IDs_by_userId",
        data: {
          userID: session.user.newID,
        },
      });

      setCurrentUserPapersIds(response.data.data);

      console.log("Papers IDs:", response.data.data);
    } catch (error) {
      console.error("Error fetching papers IDs:", error);
    }
  }

  useEffect(() => {
    get_paper_with_Assigning_data();
    find_Is_resetable();
    get_papers_IDs_by_userId();
  }, [session?.user?.newID, paperID]);

  useEffect(() => {
    let timer;

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      uploadPaper();
    }

    return () => clearInterval(timer); // cleanup
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    console.log("pa", paperDetails);
  }, [paperDetails]);

  // useEffect(() => {
  //   console.log("mark is ,", marks);
  // }, [marks]);

  //  useEffect(() => {
  //   get_paper_with_Assigning_data();
  // }, []);

  useEffect(() => {
    console.log("session is", session);
  }, [session]);

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right"></Toaster>
      {/* <div className="absolute bg-black top-0 left-0 z-50 w-full">
        <HomeHeadder></HomeHeadder>
      </div> */}

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
          }   justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen  text-center text-white pt-16 overflow-x-hidden`}
        >
          <div
            className={`px-4 ${
              model && "max-md:max-w-xl"
            }  h-[calc(100vh-4rem)]  fixed bottom-5 right-0   pt-8 flex
            ${!openQuizTab && "hidden"}
            
            `}
          >
            <div className="w-fit   rounded-md h-full flex  items-center justify-center">
              <div
                onClick={() => {
                  setmodel((pre) => !pre);
                }}
                className=" ring-2 ring-white cursor-pointer rounded-md px-1 py-2  bg-gray-900 md:px-3 md:py-5"
              >
                <ChevronLeft
                  className={`text-white  scale-75 md:scale-150  ${
                    model && "rotate-180"
                  }`}
                ></ChevronLeft>
              </div>
            </div>
            {/* side bar ------------------------------------------------------------------------------ */}
            {paperDetails?.questions.length > 0 && model && (
              <div
                className={`h-full  md:w-lg  ml-3  flex flex-col  ${
                  paperDetails?.questions.length > 0 && model
                    ? " pointer-events-auto opacity-100 "
                    : "opacity-0 pointer-events-none "
                } duration-300 transition-all  bg-gray-900 backdrop-blur-3xl rounded-lg ring-2 ring-white`}
              >
                <div className=" flex justify-center items-center rounded-md w-full  px-7 bg-white/10 py-3">
                  <h1 className="w-full text-xl  max-md:text-lg text-center">
                    Question Numbers
                  </h1>
                </div>
                <div className="w-full relative flex items-start flex-col px-5 ">
                  {/* <h1 className="text-xl">{paperDetails.paper_name}</h1>
                      <h1>{paperDetails.description}</h1> */}
                </div>

                <div className="w-full h-full  gap-5  px-4 py-3   ">
                  <div className="flex flex-wrap gap-3  w-full h-fit">
                    {paperDetails?.questions.length > 0 &&
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
                          className={`w-12 h-9 flex justify-center items-center cursor-pointer rounded-md flex-shrink-0 ${
                            selectedQuestionindex === index
                              ? "bg-white/50"
                              : "bg-white/20"
                          }
                        ${
                          item && item.Answers.some((each) => each.select)
                            ? "ring-2 ring-white"
                            : ""
                        }
                          `}
                        >
                          <h1>{index + 1}</h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={` w-full h-[calc(100vh-4rem)]  pb-5 flex   justify-center`}
          >
            {" "}
            {/* paper starting tab */}
            {!paperStatus && !openQuizTab && (
              <div className="mt-12 ">
                <h1 className="text-5xl font-bold">
                  {paperDetails?.paper_name}
                </h1>

                <h1 className="text-2xl my-4 font-bold">
                  {paperDetails?.questions?.length || "No"} Questions
                </h1>

                <p className="mt-4 max-w-xl text-lg justify-self-center">
                  {paperDetails?.description}
                </p>
                {paperDetails?.timeLimit && (
                  <p className="mt-8 text-2xl">
                    {paperDetails?.timeLimit} Minutes
                  </p>
                )}

                <button
                  onClick={() => {
                    if (paperDetails?.questions.length > 0) {
                      StartPaper();
                      setOpenQuizTab(true);
                      setIsRunning(true);
                    } else {
                      toast.error("No Questions Added", {
                        duration: 2000,
                      });
                      Router.push("/create_paper/" + paperID);
                    }
                  }}
                  className={`mt-12 rounded-md border cursor-pointer border-gray-300 px-10 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-black ${
                    currentUserPapersIds.includes(paperDetails?.id) ? "" : ""
                  }`}
                >
                  {paperDetails?.questions.length > 0
                    ? "Start Paper"
                    : currentUserPapersIds.includes(paperDetails?.id)
                      ? "Add Questions"
                      : ""}
                </button>
              </div>
            )}
            {paperStatus && (
              <div>
                <h1 className="md:text-2xl text-md mt-5">
                  You have already completed this paper
                </h1>

                <div className="mt-12 ">
                  <h1 className=" text-2xl md:text-5xl font-bold">
                    {paperDetails?.paper_name}
                  </h1>

                  <h1 className="md:text-2xl text-md my-4 font-bold">
                    {paperDetails?.questions?.length || "No"} Questions
                  </h1>

                  <p className="mt-4 max-w-xl text-lg justify-self-center">
                    {paperDetails?.description}
                  </p>
                  <p className="mt-8 md:text-2xl text-lg ">
                    {marks ? marks : "0"} Marks
                  </p>
                </div>
                <div
                  onClick={() => {
                    Router.push(`/answers/${paperID}`);
                  }}
                  className="max-w-fit justify-self-center cursor-pointer mt-12 rounded-md border border-gray-300 px-10 py-3 text:md md:text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
                >
                  View Your Answers
                </div>
                {reseteble && (
                  <div
                    onClick={async () => {
                      if (reseteble) {
                        await reset_answers();
                        window.location.reload();
                      }
                    }}
                    className="max-w-fit justify-self-center mt-6 cursor-pointer rounded-md border border-gray-300 px-10 py-3 text:md md:text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
                  >
                    Reset Paper Answer
                  </div>
                )}
              </div>
            )}
            {openQuizTab && (
              <div
                className={`flex max-md:justify-center  w-full min-h-full  h-full items-start  px-5  xl:pl-20 xl:pr-10     ${
                  model ? "md:justify-start" : "justify-center"
                }  `}
              >
                {paperDetails?.questions.length > 0 ? (
                  <div className="w-2xl h-full flex flex-col   items-center">
                    <h1 className="text-3xl mt-5 font-bold">
                      {paperDetails?.paper_name}
                    </h1>
                    <h1 className="text-2xl my-3 font-bold">
                      {formatTime()} minutes left
                    </h1>
                    <EachQuestionInAnwerPage
                      Upload_Marks={Upload_Marks}
                      uploadPaper={uploadPaper}
                      setPaperDetails={setPaperDetails}
                      question_index={selectedQuestionindex}
                      paperQuestions={paperDetails && paperDetails.questions} //questionn array
                      setselectedQuestionindex={setselectedQuestionindex}
                    ></EachQuestionInAnwerPage>{" "}
                  </div>
                ) : loading ? (
                  <div className="w-full h-full flex  justify-center items-center">
                    <h1 className="text-2xl">Loading</h1>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col gap-4  justify-center items-center">
                    <h1 className="text-xl">NO Questions Added </h1>
                    <Link href="/dashboard">
                      <h1 className="text-xl w-fit px-4 py-2 rounded-md bg-white/30">
                        Go to DashBoard{" "}
                      </h1>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
