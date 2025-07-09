"use client";
import React, { useEffect, useState } from "react";
import HomeHeadder from "@/app/components/HomeHeadder";
import { Toaster } from "react-hot-toast";
import dashPIC from "@/assest/dashpic.jpeg";
import PaperCard from "../components/PaperCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [paperContainer, setpaperContainer] = useState();
  const [Dashboard_Paper_Menu, setDashboard_Paper_Menu] = useState(1);
  const [loading, setLoading] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const fetchPapersCreatedByUserId = async () => {
    setLoading(1);
    try {
      const response = await axios.post("/api/paper", {
        method: "Get_All_Papers_Created_By_UserID",
        data: {
          userID: session.user.newID,
        },
      });

      // Extract the paper list from the response
      const papers = response.data.data;
      setpaperContainer(papers);
      console.log("Fetched Papers:", papers);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }

    setLoading(0);
  };

  useEffect(() => {
    console.log(session);

    fetchPapersCreatedByUserId();
  }, [session]);

  const Get_Assigned_Papers_For_LogIn_Users = async () => {
    setLoading(1);
    try {
      const response = await axios.post("/api/paper", {
        method: "Get_Assigned_Papers_For_LogIn_Users",
        data: {
          userID: session.user.newID,
        },
      });

      // Extract the paper list from the response
      const papers = response.data.data;
      setpaperContainer(papers);
      console.log("Fetched Papers:", papers);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
    setLoading(0);
  };

  const Get_Answerd_Papers_For_LogIn_Users = async () => {
    setLoading(1);
    try {
      const response = await axios.post("/api/paper", {
        method: "Get_Answerd_Papers_For_LogIn_Users",
        data: {
          userID: session.user.newID,
        },
      });

      // Extract the paper list from the response
      const papers = response.data.data;
      setpaperContainer(papers);
      console.log("Fetched Papers:", papers);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
    setLoading(0);
  };

  return (
    <div className="relative min-h-screen ">
      <Toaster position="top-right" />
      <div className="absolute top-0 left-0 z-50 w-full">
        <HomeHeadder />
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={dashPIC.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Main dashboard content */}
      <div className=" flex w-full min-h-screen   pt-16">
        <div className="flex xl:flex-row flex-col max-xl:flex-col-reverse  gap-2 xl:gap-12 bg-black/60 backdrop-blur-md w-full h-full  min-h-screen  p-0 m-0 -mt-16 justify-end items-start pt-16">
          {/* My Papers Section */}
          <div className="flex flex-col w-full h-full  lg:pt-10 pt-2 px-10 ">
            <h2 className="text-3xl font-semibold text-white mb-6">
              My Papers
            </h2>
            {/* Tabs */}
            <div className="flex flex-row gap-8 mb-6 ">
              <button
                onClick={() => {
                  fetchPapersCreatedByUserId();
                  setDashboard_Paper_Menu(1);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 1
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300"
                } hover:text-white   pb-2 font-medium transition-all duration-200`}
              >
                Created Papers
              </button>
              <button
                onClick={() => {
                  Get_Answerd_Papers_For_LogIn_Users();
                  setDashboard_Paper_Menu(2);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 2
                    ? "text-white  border-b-2 border-white"
                    : "text-gray-300"
                } hover:text-white  pb-2 font-medium transition-all duration-200`}
              >
                Answered Papers
              </button>
              <button
                onClick={() => {
                  Get_Assigned_Papers_For_LogIn_Users();
                  setDashboard_Paper_Menu(3);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 3
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300"
                } hover:text-white   pb-2 font-medium transition-all duration-200`}
              >
                Assigned Papers For you
              </button>
            </div>
            {/* Papers Grid */}
            <div className="grid justify-center relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 h-full w-full   ">
              {/* Paper Card 1 */}
              {paperContainer && !loading
                ? paperContainer.map((each, index) => {
                    // console.log(
                    //   "questions count of " +
                    //     each.paper_name +
                    //     " " +
                    //     (each.questions?.length || 0)
                    // );
                    return (
                      <div className="">
                        <PaperCard
                          Dashboard_Paper_Menu={Dashboard_Paper_Menu}
                          marks={each.marks}
                          key={index}
                          description={each.description}
                          id={each.id}
                          paper_name={each.paper_name}
                          timeLimit={each.timeLimit}
                          questions_length={each.questions_length}
                          teachers={each.teachers_name}
                        />
                      </div>
                    );
                  })
                : null}

              {loading ? (
                <div className=" absolute top-1 -translate-x-1/2 left-1/2   w-fit h-fit ">
                  <h1 className="text-white text-center">Loading</h1>
                </div>
              ) : null}

              {paperContainer && paperContainer.length === 0 && !loading && (
                <div className=" absolute top-1 -translate-x-1/2 left-1/2   w-fit h-fit ">
                  <h1 className="text-white">No Papers</h1>
                </div>
              )}
            </div>
          </div>
          {/* Make Your Paper Section */}
          <div className="flex flex-col items-start  justify-center  h-full  lg:mt-10  mt-5 ml-10  mr-10">
            <h2 className="text-2xl font-semibold text-white mb-5">
              Make Your Paper
            </h2>
            <div
              onClick={() => {
                router.push("/create_paper/");
              }}
              className="p-[3px] hover:p-[5px] transition-all duration-300  cursor-pointer text-center justify-self-center  animate-border bg-[length:300%_300%] flex flex-col items-center justify-center rounded-2xl  w-56 h-36 xl:h-56 "
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
              }}
            >
              <div className="cursor-pointer rounded-xl bg-black hover:bg-black/80 h-full w-full flex flex-col justify-center items-center text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-white mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="text-white text-lg font-medium">
                  Create Paper
                </span>
              </div>
            </div>
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
