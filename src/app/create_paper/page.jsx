"use client";
import React, { Suspense, use } from "react";
import { useSession, signIn } from "next-auth/react";
import { CloudHail, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import form_bg from "@/assest/formbg.jpeg";
import HomeHeadder from "../components/HomeHeadder";
import USerSelectionUserButton from "@/app/components/USerSelectionUserButton";
import axios from "axios";
import { create } from "domain";
import Router from "next/router";
import { Toaster, toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [usersData, setusersData] = useState([]);
  const [showingmenu, setshowingmenu] = useState(false);
  const [selectedUserID, setselectedUserID] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const [typedPaperSettingData, setTypedPaperSettingData] = useState();
  const [userFeachDataLoading, setUserFeachDataLoading] = useState(false);
  const [creatingPaperLoading, setCreatingPaperLoading] = useState(false);

  async function createPaper() {
    if (!typedPaperSettingData) {
      toast.error("Please fill in the paper details.");
      return;
    }

    const { paper_name, description, time } = typedPaperSettingData;

    if (!paper_name || paper_name.trim().length === 0) {
      toast.error("Please enter a paper name.");
      return;
    }

    if (!description || description.trim().length === 0) {
      toast.error("Please enter a description.");
      return;
    }

    if (time === undefined || time === null || time <= 0) {
      toast.error("Please enter a valid time limit.");
      return;
    }

    setCreatingPaperLoading(true);
    // const newSelectedUserID = [];
    // if (selectedUserID.length === 0) {
    //   console.log("Selected User IDs: No users selected, using all users");
    //   const newSelectedUserID = usersData.map((user) => user.id);
    //   console.log("Selected User IDs:", newSelectedUserID);

    //   console.log(
    //     "Selected User IDs in newSelectedUserID section %%%%%%%%:",
    //     selectedUserID
    //   );
    // }
    try {
      const selectedIdWithCurrentuserID =
        selectedUserID.length > 0
          ? [...selectedUserID]
          : usersData.map((user) => user.id);

      // Add current user ID
      selectedIdWithCurrentuserID.push(session.user.newID);

      const res = await axios.post("/api/paper", {
        method: "add_paper",
        data: {
          paper_name: typedPaperSettingData.paper_name,
          description: typedPaperSettingData.description,
          userId: session.user.newID,
          timeLimit: typedPaperSettingData.time, // Example time limit in minutes
          assignments: selectedIdWithCurrentuserID,
          // Use selectedUserID if available, otherwise an empty array
        },
      });

      router.push(`/create_paper/${res.data.data.id}`);
    } catch (error) {
      console.error("Error creating paper:", error);
    }
    setCreatingPaperLoading(false);
  }
  useEffect(() => {
    console.log(selectedUserID);
  }, [selectedUserID]);

  useEffect(() => {
    async function FeachUsers() {
      setUserFeachDataLoading(true);
      const response = await axios.get("/api/user");
      // console.log(response.data);
      setusersData(response.data.data);

      console.log("user data is ", usersData);
      // console.log(usersData.length);
      setUserFeachDataLoading(false);
    }

    FeachUsers();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to sign-in page
      router.push("/login");
    }
    setSessionData(session);
    console.log("Session Data:", session);
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  function handleUserSelection() {}
  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right z-50" />
      <div className="absolute top-0 left-0 z-40 w-full">
        <HomeHeadder></HomeHeadder>
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={form_bg.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Overlay and form card */}
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen">
          <div
            className="max-w-3xl mt-[64px] w-full p-[2px] rounded-xl animate-border"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
            }}
          >
            <div className="flex py-8 px-6 flex-col items-center justify-center bg-black/90 w-full rounded-xl">
              <h1 className="text-3xl text-white mb-6 text-center">
                Make Your Paper
              </h1>
              <h2 className="text-lg mb-6 text-white text-center">
                {showingmenu ? "Assigned Users to Paper " : "Set up New Paper"}
              </h2>
              {!showingmenu && (
                <div className="max-w-md w-full">
                  <div className="max-w-md w-full">
                    <label className="block text-white mb-1">Paper Name</label>
                    <input
                      onChange={(e) => {
                        setTypedPaperSettingData({
                          ...typedPaperSettingData,
                          paper_name: e.target.value,
                        });
                      }}
                      type="text"
                      className="w-full rounded bg-white/30 text-white px-4 py-2 outline-none border-none"
                      placeholder=""
                    />
                  </div>
                  <div className="max-w-md w-full">
                    <label className="block text-white mb-1">Description</label>
                    <textarea
                      onChange={(e) => {
                        setTypedPaperSettingData({
                          ...typedPaperSettingData,
                          description: e.target.value,
                        });
                      }}
                      className="w-full rounded bg-white/30 text-white px-4 py-2 outline-none border-none resize-none"
                      rows={3}
                      placeholder=""
                    />
                  </div>
                  <div className="max-w-md w-full">
                    <label className="block text-white mb-1">
                      Set Time (Min)
                    </label>
                    <input
                      onChange={(e) => {
                        setTypedPaperSettingData({
                          ...typedPaperSettingData,
                          time: Number(e.target.value),
                        });
                      }}
                      type="number"
                      className="w-full rounded bg-white/30 text-white px-4 py-2 outline-none border-none"
                      placeholder=""
                    />
                  </div>
                </div>
              )}
              {/* user feching data section */}

              {showingmenu && (
                <div className="w-full max-w-md bg-red mb-6">
                  <div className="w-full  h-10 flex justify-end pr-3 ">
                    <X
                      onClick={() => {
                        setshowingmenu(false);
                      }}
                      className="text-white"
                    ></X>
                  </div>

                  <div className=" overflow-y-scroll scroll-smooth bottom-full min-h-[230px] max-h-[230px]  max-w-md w-full ">
                    {userFeachDataLoading && (
                      <div className="w-full  h-[230px] flex items-center justify-center">
                        <h1 className="text-white text-lg">Loading...</h1>
                      </div>
                    )}
                    {!userFeachDataLoading &&
                      usersData.map((user, index) => {
                        return (
                          <USerSelectionUserButton
                            setselectedUserID={setselectedUserID}
                            selectedUserID={selectedUserID}
                            key={index}
                            user_data={user}
                          ></USerSelectionUserButton>
                        );
                      })}
                  </div>
                </div>
              )}

              <div className="max-w-md w-full ">
                {!showingmenu && (
                  <label className="block text-white mb-1">Add Students</label>
                )}

                <div
                  onClick={() => {
                    if (!showingmenu) {
                      setshowingmenu(!showingmenu);
                    }

                    // if (showingmenu) {

                    // }
                  }}
                  className="w-full rounded bg-white/30 text-white px-4 py-2 outline-none border-none text-center flex items-center justify-center h-full"
                >
                  <h1>
                    {selectedUserID.length > 0 ? "Selected Users Only" : "All"}
                  </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  createPaper();
                }}
                className="p-[2px] mt-8 cursor-pointer text-center justify-self-center rounded-xl animate-border bg-[length:300%_300%]"
                style={{
                  backgroundImage:
                    "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
                }}
              >
                <div className="cursor-pointer rounded-xl bg-black px-10 py-2 text-white">
                  <h1 className="text-lg text-white">
                    {creatingPaperLoading ? "Creating..." : "Next"}
                  </h1>
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
