"use client";
import React from "react";
import Link from "next/link";
import { Trash } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import DownloadablePDF from "@/app/components/DownloadablePDF";

function PaperCard({
  description,
  id,
  paper_name,
  timeLimit,
  questions_length,
  teachers,
  marks,
  Dashboard_Paper_Menu,
  fetchPapersCreatedByUserId,
}) {
  const [mobileView, setMobileView] = useState(false);
  async function deletePaper() {
    try {
      const res = await axios.post("/api/deletepaper", {
        method: "Delete_Created_Paper",
        data: {
          paperID: id,
        },
      });
      await fetchPapersCreatedByUserId();
    } catch (error) {
      console.log("Error deleting paper:", error);
    }
  }

  console.log("selected_paper_catogory", Dashboard_Paper_Menu);

  const Get_Paper_Questionsz_and_download = async () => {
    try {
      const response = await axios.post("/api/paper", {
        method: "Get_Paper_Questions",
        data: { paperID: Number(id) },
      });
      console.log(response.data.data);
      await DownloadablePDF(response.data.data);
    } catch (error) {
      console.error("Error fetching paper data:", error);
    } finally {
    }
  };

  return (
    <div
      onClick={() => {
        setMobileView((prev) => !prev);
      }}
      className="bg-white/10 border group border-white/20 rounded-xl p-6 w-60 text-white flex flex-col justify-between shadow-md backdrop-blur-sm relative group"
    >
      <div>
        <div className="text-lg font-bold mb-2">{paper_name}</div>
        <div className="text-xs mb-4 min-h-24 ">
          {description ? description : "No description provided"}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-xs mt-4">
        <span>{questions_length} Questions</span>
        <span>{timeLimit} Min</span>
      </div>
      <div className="text-xs mt-2">Creator - {teachers}</div>

      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center  pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto gap-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300
          ${mobileView ? "max-md:pointer-events-auto max-md:opacity-100" : "max-md:pointer-events-none max-md:opacity-0"}
          
          
          `}
      >
        {Dashboard_Paper_Menu === 1 && (
          <Trash
            onClick={() => {
              deletePaper();
            }}
            className="absolute top-2 right-2 scale-90 text-red-500 cursor-pointer"
          ></Trash>
        )}

        <div
          className={` ${Dashboard_Paper_Menu === 2 ? "hidden" : ""} ${
            Dashboard_Paper_Menu === 3 ? "hidden" : ""
          } relative p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-4/5`}
        >
          <Link href={`/create_paper/${id}`}>
            <div className="block bg-black backdrop-blur-sm hover:bg-black/80 text-white w-full text-center px-4 py-2 rounded-[7px] transition-colors">
              Edit Paper
            </div>
          </Link>
        </div>
        <div
          className={` ${
            Dashboard_Paper_Menu === 2 && "hidden "
          }relative p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-4/5  `}
        >
          <Link href={`/starting/${id}`}>
            <button
              onClick={(e) => {
                // Add download logic here
                console.log("Download PDF for paper:", id);
              }}
              className="bg-black backdrop-blur-sm cursor-pointer hover:bg-black/80 text-white w-full px-4 py-2 rounded-[7px] transition-colors"
            >
              Make Answers
            </button>
          </Link>
        </div>

        <div
          className={` 
             ${Dashboard_Paper_Menu === 1 ? "hidden" : ""}   ${
               Dashboard_Paper_Menu === 3 ? "hidden" : ""
             } 
          relative p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-4/5`}
        >
          <Link href={`/answers/${id}`}>
            <button
              onClick={(e) => {
                // Add download logic here
                console.log("Download PDF for paper:", id);
              }}
              className="bg-black backdrop-blur-sm cursor-pointer hover:bg-black/80 text-white w-full px-4 py-2 rounded-[7px] transition-colors"
            >
              View Answers
            </button>
          </Link>
        </div>
        <div
          className={` ${
            Dashboard_Paper_Menu === 3 ? "hidden" : ""
          } relative p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-4/5`}
        >
          {/* <Link href={`/download_pdf/${id}`}> */}
          <button
            onClick={() => {
              // Add download logic here
              Get_Paper_Questionsz_and_download();
            }}
            className="bg-black backdrop-blur-sm cursor-pointer hover:bg-black/80 text-white w-full px-4 py-2 rounded-[7px] transition-colors"
          >
            Download PDF
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default PaperCard;
