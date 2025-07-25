"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import useGlobalStore from "@/lib/store";
import Loading_Ai from "@/app/components/Loading_Ai";
import pdfToText from "react-pdftotext";

function AiGenarator({ setaitab, aitab, scrollToBottomSmoothly }) {
  const [response, setresponse] = useState(false);
  const { AllQuestions, setAllQuestions } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [short_description, setshort_description] = useState([]);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [pdfText, setPdfText] = useState("");
  const [uploadedPdfName, setUploadedPdfName] = useState("");
  const prompt = `imaging you are the teacher and genarate Generate ${numberOfQuestions} questions based on the following description: ${description} ${(pdfText && "and reading these contents that extract from the user uploaded pdf", pdfText)}  . each quention has ${numberOfAnswers} Anwers. but the question must be in json formated questions array like this " Generated_Questions: [
  {
    "Answers": [
      {
        "Correct": false,
        "Answer_Description": "answer 1"
      },
      {
        "Correct": false,
        "Answer_Description": "answer 2"
      }
    ],
    "Questions_No": 1,
    "Question_Description": "make some question ",
    short_description: " make some text to describe the question"
  }
]" Genarate only json format and do not add any other text. if you have some trobble acording to the prompt, the short_description: shows the poblem. `;

  async function handleGenerateQuestions() {
    console.log("Generating questions with prompt:");
    try {
      setLoading(true);
      const response = await axios.post("/api/geminai", {
        method: "text_only",
        data: {
          prompt: prompt,
        },
      });

      if (response.data && response.data.data) {
        console.log("Generated Questions:", response.data.data);

        // Step 1: Remove the Markdown-style code block
        const cleaned = response.data.data.replace(/```json|```/g, "").trim();

        // Step 2: Extract the JSON part (optional)
        const jsonStart = cleaned.indexOf("{");
        const jsonString = cleaned.slice(jsonStart);

        // Step 3: Parse to object
        const parsed = JSON.parse(jsonString);
        console.log(parsed.Generated_Questions);

        const temp_AllQuestions = [
          ...AllQuestions,
          ...parsed.Generated_Questions,
        ];

        // console.log("temp_AllQuestions:", temp_AllQuestions);
        setAllQuestions(temp_AllQuestions);
        console.log("nowAllQuestions:", AllQuestions);

        // console.log("Parsed Data:", data);
        // Handle the generated questions here
        setshort_description(
          parsed.Generated_Questions.map((each) => each.short_description)
        );
        setDescription("");
        setNumberOfQuestions(1);
      } else {
        console.error("No data received from AI API");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
    }
    setLoading(false);
    setresponse(true);

    scrollToBottomSmoothly();
  }

  async function handlePdf(e) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      try {
        console.log(file);
        setUploadedPdfName(file.name);
        const text = await pdfToText(file);
        setPdfText(text);
        console.log("PDF text extracted successfully:", text);
      } catch (err) {
        console.log("Failed to read the PDF file.");
      }
    } else {
      console.log("Please upload a valid PDF file.");
    }
  }

  return (
    <div
      className={`fixed   ${
        aitab ? "" : " max-xl:hidden "
      }   w-full max-md:w-[calc(100vw-15px)] max-w-md top-10 right-0 max-md:right-2 p-[2px] h-[calc(100vh-80px)] mt-8 rounded-xl animate-border bg-[length:300%_300%]  z-50`}
      style={{
        backgroundImage:
          "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
      }}
    >
      <div
        onClick={() => {
          setaitab(false);
        }}
        className="w-full  absolute top-5 right-5 text-white h-10 bg-red flex justify-end"
      >
        <X className="text-white xl:hidden"></X>
      </div>
      <div className="h-full w-full  px-10 py-2 bg-black/90 flex flex-col justify-between items-center text-white rounded-xl">
        <div className="w-full  text-center text-2xl mt-10 ">
          {" "}
          {response ? "About Questions" : "Genarate With AI"}
        </div>

        {!loading && !response && (
          <div className="w-full   flex flex-col items-center h-full justify-start">
            <div className="w-full  flex flex-col  mt-10">
              <h1 className="">Question Description</h1>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="w-full bg-white/20 h-40 rounded-md ring-1 ring-white px-4 py-2"
              ></textarea>
            </div>
            <div className="w-full  flex  items-center justify-between mt-5">
              <h1 className="">Number of Questions</h1>
              <input
                value={numberOfQuestions}
                onChange={(e) => {
                  setNumberOfQuestions(e.target.value);
                }}
                type="number"
                className="bg-white/20 h-8 w-8 rounded-md text-center ring-1 ring-white p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="w-full  flex  items-center justify-between mt-5">
              <h1 className="">Number of Answers </h1>
              <input
                value={numberOfAnswers}
                onChange={(e) => {
                  setNumberOfAnswers(e.target.value);
                }}
                type="number"
                className="bg-white/20 h-8 w-8 rounded-md text-center ring-1 ring-white p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="w-full  flex  items-center justify-between mt-5">
              <label className="bg-white/20 h-8 w-full rounded-md text-center ring-1 ring-white p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                <span className="text-sm ">
                  {pdfText ? "PDF Uploaded :" + uploadedPdfName : "Upload PDF"}
                </span>

                <input
                  onChange={(e) => {
                    handlePdf(e);
                  }}
                  placeholder="fdgf"
                  accept="application/pdf"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {response && (
          <div className="w-full  flex flex-col gap-7  h-full overflow-y-scroll items-start justify-start mt-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/90 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
            {short_description &&
              short_description.map((each, index) => (
                <div className="flex flex-col items-start">
                  {" "}
                  <h1>
                    {AllQuestions.length - short_description.length + index + 1}{" "}
                    Question
                  </h1>{" "}
                  <h1 className="mt-2">{each}</h1>
                </div>
              ))}
          </div>
        )}

        {loading && <Loading_Ai></Loading_Ai>}

        <div className="w-full  flex mb-10   justify-center mt-10">
          <div
            onClick={() => {
              if (response) {
                setresponse(false);
              } else {
                handleGenerateQuestions();
              }
            }}
            className="p-[2px] mt-1 cursor-pointer text-center justify-self-center rounded-xl animate-border bg-[length:300%_300%]"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
            }}
          >
            <div className="cursor-pointer rounded-xl bg-black px-10 py-2 text-white">
              <h1 className="text-lg text-white">
                {response ? "New Question" : "Genarate Questions"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiGenarator;
