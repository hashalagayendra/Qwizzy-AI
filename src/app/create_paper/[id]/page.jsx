"use client";
import React, { use, useState } from "react";
import { useParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import HomeHeadder from "@/app/components/HomeHeadder";
import formbg from "@/assest/formbg.jpeg";
import MCQ_QuestionCreator from "@/app/components/MCQ_QuestionCreator";
import useGlobalStore from "@/lib/store";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const router = useRouter();
  const params = useParams();
  const paper_id = params.id;
  // const [sessionData, setSessionData] = useState(null);
  const { data: session, status } = useSession();
  const path = usePathname();
  const { AllQuestions, setAllQuestions } = useGlobalStore();
  const [userpapers, setuserpapers] = useState();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    // setSessionData(session);
    console.log("Session Data:", session);
  }, [status]);

  useEffect(() => {
    const getPaperIdsByUser = async () => {
      try {
        console.log("running inside user checking function");
        const response = await axios.post("/api/paper", {
          method: "get_papers_IDs_by_userId",
          data: {
            userID: session.user.newID,
          },
        });

        const paperIds = response.data.data;

        console.log("Paper IDs:", paperIds);

        if (paperIds.includes(Number(paper_id))) {
          console.log("include paper for this user");
        } else {
          console.log("not include paper for this user");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching paper IDs:", error);
      }
    };

    getPaperIdsByUser();
    // setAllQuestions([
    //   {
    //     Questions_No: 1,
    //     Question_Description: "What is ICT",
    //     Answers: [
    //       {
    //         Answer_Description: "1st answer",
    //         Correct: false,
    //       },
    //       {
    //         Answer_Description: "2nd answer",
    //         Correct: false,
    //       },
    //       {
    //         Answer_Description: "3nd answer",
    //         Correct: false,
    //       },
    //       {
    //         Answer_Description: "4nd answer",
    //         Correct: true,
    //       },
    //     ],
    //   },
    //   {
    //     Questions_No: 2,
    //     Question_Description: "What is a computer?",
    //     Answers: [
    //       { Answer_Description: "CPU", Correct: false },
    //       {
    //         Answer_Description: "Monitor",
    //         Correct: false,
    //       },
    //     ],
    //   },
    // ]);
  }, [setAllQuestions, session]);

  useEffect(() => {
    // get paper question when load
    const Get_Paper_Questions = async () => {
      try {
        console.log("running inside paper question feactin");
        const response = await axios.post("/api/paper", {
          method: "Get_Paper_Questions",
          data: {
            paperID: Number(paper_id),
          },
        });

        const feached_Questions = response.data.data.questions;

        setAllQuestions(feached_Questions);

        console.log("Paper questionss:", feached_Questions);
      } catch (error) {
        console.error("Error fetching paper Questionss:", error);
      }
    };
    Get_Paper_Questions();
  }, []);

  useEffect(() => {
    console.log(AllQuestions);
    console.log("page params id" + paper_id);
  }, [AllQuestions]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const add_New_question = () => {
    console.log("tiger");
    const new_Question = {
      Questions_No: 1,
      Question_Description: "",
      Answers: [],
    };

    const temp_AllQuestions = [...AllQuestions, new_Question];
    setAllQuestions(temp_AllQuestions);
  };

  const upload_Paper = async () => {
    if (!AllQuestions) {
      return;
    }
    const upload_data = {
      method: "add_questions",
      data: {
        paperId: Number(paper_id),
        questions: AllQuestions,
      },
    };

    const response = await axios.post(`/api/paper/`, upload_data);
    if (response.status === 200) {
      console.log("Paper created successfully:", response.data);
      // Optionally, redirect or show a success message
      router.push("/dashboard");
    } else {
      console.error("Error creating paper:", response.data);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right"></Toaster>
      <div
        className={` ${
          path.startsWith("/paper")
            ? "sticky bg-black"
            : "absolute bg-transparent"
        }   top-0 left-0 z-50 w-full `}
      >
        <HomeHeadder></HomeHeadder>
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={formbg.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Overlay and login box */}
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex  items-start justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen">
          {/* question make box */}
          <div className="min-h-screen  flex bg-green-500 flex-col w-4/6 items-center ">
            <h1 className="text-2xl text-white mt-4">Make Your Paper</h1>
            {/* actual tranparent box for question making */}
            <div className="bg-white/10  w-4/5  rounded-lg  px-10 mt-4 flex flex-col items-center gap-6 pb-6">
              <h1 className="text-white text-xl mt-4">Add Questions</h1>

              {AllQuestions &&
                AllQuestions.map((each_question, index) => {
                  return (
                    <MCQ_QuestionCreator
                      key={index}
                      index={index}
                      each_question={each_question}
                    ></MCQ_QuestionCreator>
                  );
                })}

              {/* add new question button */}
              <div
                onClick={() => {
                  add_New_question();
                }}
                className="w-full  py-2 bg-white/20 rounded-md flex flex-col items-center cursor-pointer "
              >
                <div className="flex gap-3">
                  <Plus className="text-white "></Plus>
                  <h1 className="text-white">Add New Question</h1>
                </div>
              </div>
            </div>

            <div
              className="p-[2px] mt-8 cursor-pointer text-center justify-self-center rounded-xl animate-border bg-[length:300%_300%] mb-5"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
              }}
            >
              <div
                onClick={() => {
                  upload_Paper();
                }}
                className="cursor-pointer rounded-xl bg-black px-10 py-2 text-white"
              >
                <h1 className="text-lg text-white">Create Paper</h1>
              </div>
            </div>
          </div>

          {/* ai integrating box */}
          <div className=" sticky top-0  min-h-screen p-4 w-2/6 bg-red-400 z-50 rounded-lg shadow-lg flex items-center justify-center">
            {/* <div className="sticky top-16 w-full h-[calc(100vh-50px)] ring-2 ring-amber-200">
              sd
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
