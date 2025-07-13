"use client";
import React from "react";
import { CloudHail, X } from "lucide-react";
import USerSelectionUserButton from "@/app/components/USerSelectionUserButton";
import { useState } from "react";

function UserSelectionbox({
  setselectedUserID,
  selectedUserID,
  userFeachDataLoading,
  usersData,
  setshowingmenu,
  loggedInUserName,
}) {
  const [search_text, setsearch_text] = useState("");

  console.log("usersData", usersData);
  return (
    <div className="w-full max-h-3xl flex flex-col justify-start items-center bg-red  ">
      <div className="w-full  h-10 flex justify-end pr-3 mb-10 z-50">
        <X
          onClick={() => {
            setshowingmenu(false);
          }}
          className="text-white"
        ></X>
      </div>

      <div className="w-full h-10 flex justify-center items-center max-w-md -mt-10 mb-10">
        <input
          onChange={(e) => {
            setsearch_text(e.target.value);
          }}
          value={search_text}
          type="text"
          className="w-full rounded bg-white/30 text-white px-4 py-2 outline-none border-none"
          placeholder="Search users"
        />
      </div>

      <div
        onClick={() => {
          setselectedUserID([]);
        }}
        className="w-full h-10 flex justify-center items-center max-w-md mb-2"
      >
        <h1
          className={` 
            
            ${selectedUserID.length === 0 ? "bg-white/30" : "bg-white/10"}
          
          w-full   text-white px-4 py-2 outline-none mb-1 text-center rounded-md flex  justify-center h-fit`}
        >
          Select All Students
        </h1>
      </div>

      <div className=" overflow-y-scroll scroll-smooth bottom-full min-h-[180px]  max-w-md w-full ">
        {userFeachDataLoading && (
          <div className="w-full  h-[230px] flex items-center justify-center">
            <h1 className="text-white text-lg">Loading...</h1>
          </div>
        )}

        {!userFeachDataLoading &&
          usersData.map((user, index) => {
            if (user.name === loggedInUserName) {
              return null; // Skip rendering the logged-in user
            } else {
              if (
                user.name.toLowerCase().startsWith(search_text) ||
                search_text === ""
              ) {
                return (
                  <USerSelectionUserButton
                    setselectedUserID={setselectedUserID}
                    selectedUserID={selectedUserID}
                    key={index}
                    user_data={user}
                  ></USerSelectionUserButton>
                );
              }
            }
          })}
      </div>
    </div>
  );
}

export default UserSelectionbox;
