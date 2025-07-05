import React, { useState } from "react";
import useGlobalStore from "@/lib/store";
import { Trash } from "lucide-react";
import { X } from "lucide-react";

function MCQ_QuestionCreator({ index, each_question }) {
  const { AllQuestions, setAllQuestions } = useGlobalStore();

  const handleAnswerChange = (index, idx, value) => {
    const tempAllQuestions = [...AllQuestions];
    tempAllQuestions[index].Answers[idx].Answer_Description = value;
    setAllQuestions(tempAllQuestions);
  };

  const haddleMakeCorrectAnswer = (index, idx) => {
    const tempAllQuestions = [...AllQuestions];
    tempAllQuestions[index].Answers = tempAllQuestions[index].Answers.map(
      (answer) => ({
        ...answer,
        Correct: false,
      })
    );

    // console.log("before", tempAllQuestions[index].Answers);

    tempAllQuestions[index].Answers[idx].Correct = true;

    setAllQuestions(tempAllQuestions);
  };

  const SetQuestionName = (index, value) => {
    const tempAllQuestions = [...AllQuestions];
    tempAllQuestions[index].Question_Description = value;
    setAllQuestions(tempAllQuestions);
  };

  const add_New_Answer = (index) => {
    const tempAllQuestions = [...AllQuestions];
    tempAllQuestions[index].Answers.push({
      Answer_Description: "",
      Correct: false,
    });
    setAllQuestions(tempAllQuestions);
  };

  const Delete_Answer = (main_index, idx) => {
    const tempAllQuestions = [...AllQuestions];
    const updatedAnswers = tempAllQuestions[main_index].Answers.filter(
      (_, index) => index !== idx
    );
    tempAllQuestions[main_index].Answers = updatedAnswers;
    setAllQuestions(tempAllQuestions);
  };

  const delete_Question = (Main_index) => {
    const tempAllQuestions = [...AllQuestions];
    const updated_AllQuestions = tempAllQuestions.filter(
      (each, index) => Main_index !== index
    );
    setAllQuestions(updated_AllQuestions);
  };
  return (
    <div className="relative bg-black/30 rounded-xl  p-6 border border-white/20 w-full mx-auto z-30">
      {/* Delete Icon */}
      <button
        onClick={() => {
          delete_Question(index);
        }}
        className="absolute bg-red-600/30 top-0 right-0 px-2 py-2 rounded-sm border-none cursor-pointer"
        title="Delete"
        type="button"
      >
        <Trash className="text-white"></Trash>
      </button>
      <div className="mb-4">
        <h1 className="text-white font-semibold mb-2">Question {index + 1}</h1>
        <label className="block text-white  mb-1"></label>
        <textarea
          rows="2"
          value={each_question.Question_Description}
          placeholder="Add Question"
          type="text"
          onChange={(e) => SetQuestionName(index, e.target.value)}
          className="w-full p-2  rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
        />
      </div>
      {each_question?.Answers &&
        each_question.Answers.map((ans, idx) => (
          <div key={idx} className="mb-3 flex flex-col ">
            <h1 className="text-white "> Answers {idx + 1}</h1>
            <div className="flex items-center gap-3 ">
              <input
                type="text"
                value={ans.Answer_Description}
                placeholder="Add Answer"
                onChange={(e) => handleAnswerChange(index, idx, e.target.value)}
                className="flex-1 p-2 rounded-md border border-gray-300 text-base  bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/*true answer select box  */}
              <div
                onClick={() => {
                  haddleMakeCorrectAnswer(index, idx);
                }}
                className={`w-7 h-7   ${
                  ans.Correct ? "bg-green-300" : "bg-red-100"
                } `}
              ></div>
              <div
                onClick={() => {
                  Delete_Answer(index, idx);
                }}
                className={`w-7 h-7   `}
              >
                <X className="text-white"></X>
              </div>

              {/* <input
              type="checkbox"
              checked={correct[idx]}
              onChange={() => handleCorrectChange(idx)}
              className="w-7 h-7 bg-white/20 "
            /> */}
            </div>
          </div>
        ))}
      <div className=" h-10 w-full bg-amber-600 flex justify-center">
        {/* add answer box */}
        <div
          onClick={() => {
            add_New_Answer(index);
          }}
          className=" p-2 w-full flex
           rounded-md border border-gray-300 text-base  bg-white/20 text-white justify-center items-center"
        >
          Add New Answer
        </div>
      </div>
    </div>
  );
}

export default MCQ_QuestionCreator;

{
  /* <div className="mb-4">
        <label className="block text-white font-medium mb-1">Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-black"
        />
      </div>
      {answers.map((ans, idx) => (
        <div key={idx} className="mb-3 flex flex-col ">
          <label className="text-white w-[70px]">Answers</label>
          <div className="flex items-center ">
            <input
              type="text"
              value={ans}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              className="flex-1 p-2 rounded-md border border-gray-300 text-base mr-3 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="checkbox"
              checked={correct[idx]}
              onChange={() => handleCorrectChange(idx)}
              className="w-7 h-7 accent-blue-500"
            />
          </div>
        </div>
      ))} */
}
