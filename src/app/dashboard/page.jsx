"use client";
import React, { useEffect, useState } from "react";
import HomeHeadder from "@/app/components/HomeHeadder";
import { Toaster } from "react-hot-toast";
import dashPIC from "@/assest/dashpic.jpeg";
import PaperCard from "../components/PaperCard";
import { useSession } from "next-auth/react";
import axios from "axios";

function page() {
  const { data: session, status } = useSession();
  const [paperContainer, setpaperContainer] = useState();
  const [Dashboard_Paper_Menu, setDashboard_Paper_Menu] = useState(1);
  const fetchPapersCreatedByUserId = async () => {
    setpaperContainer(null);
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
  };

  useEffect(() => {
    console.log(session);

    fetchPapersCreatedByUserId();
  }, [session]);

  const Get_Assigned_Papers_For_LogIn_Users = async () => {
    setpaperContainer(null);
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
  };

  const Get_Answerd_Papers_For_LogIn_Users = async () => {
    setpaperContainer(null);
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
        <div className="flex flex-row gap-12 bg-black/60 backdrop-blur-md w-full h-full  min-h-screen  p-0 m-0 -mt-16 items-start pt-16">
          {/* My Papers Section */}
          <div className="flex flex-col w-full h-full pt-10 px-10 ">
            <h2 className="text-3xl font-semibold text-white mb-6">
              My Papers
            </h2>
            {/* Tabs */}
            <div className="flex flex-row gap-8 mb-6 bg-amber-200">
              <button
                onClick={() => {
                  fetchPapersCreatedByUserId();
                  setDashboard_Paper_Menu(1);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 1 ? "text-white" : "text-gray-300"
                } hover:text-white  border-b-2 border-white pb-2 font-medium`}
              >
                Created Papers
              </button>
              <button
                onClick={() => {
                  Get_Answerd_Papers_For_LogIn_Users();
                  setDashboard_Paper_Menu(2);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 2 ? "text-white" : "text-gray-300"
                } hover:text-white  border-b-2 border-white pb-2 font-medium`}
              >
                Answered Papers
              </button>
              <button
                onClick={() => {
                  Get_Assigned_Papers_For_LogIn_Users();
                  setDashboard_Paper_Menu(3);
                }}
                className={` ${
                  Dashboard_Paper_Menu === 3 ? "text-white" : "text-gray-300"
                } hover:text-white  border-b-2 border-white pb-2 font-medium`}
              >
                Assigned Papers For you
              </button>
            </div>
            {/* Papers Grid */}
            <div className="grid grid-cols-2  relative xl:grid-cols-3 gap-8 h-full items-start  ">
              {/* Paper Card 1 */}
              {paperContainer ? (
                paperContainer.map((each, index) => {
                  console.log(
                    "questions count of " +
                      each.paper_name +
                      " " +
                      (each.questions?.length || 0)
                  );
                  return (
                    <PaperCard
                      key={index}
                      description={each.description}
                      id={each.id}
                      paper_name={each.paper_name}
                      timeLimit={each.timeLimit}
                      questions_length={each.questions?.length || 0}
                      teachers={each.teachers_name}
                    />
                  );
                })
              ) : (
                <div className=" absolute top-1/2 left-1/2   w-full h-full bg-green-400">
                  <h1 className="text-white">Loading</h1>
                </div>
              )}
            </div>
          </div>
          {/* Make Your Paper Section */}
          <div className="flex flex-col items-center justify-start w-72 h-full m-10">
            <h2 className="text-2xl font-semibold text-white mb-8">
              Make Your Paper
            </h2>
            <button className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-400 rounded-2xl p-8 w-56 h-56 shadow-lg border-2 border-white/20 hover:scale-105 transition-transform">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
