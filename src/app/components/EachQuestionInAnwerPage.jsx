import React from "react";
import { FaTrash } from "react-icons/fa";

function EachQuestionInAnwerPage({
  question_index,
  paperQuestions,
  setPaperDetails,
  uploadPaper,
  setselectedQuestionindex,
  Upload_Marks,
}) {
  //   const handleAnswerTextChange = (index, value) => {
  //     const newAnswers = [...question.answers];
  //     newAnswers[index].text = value;
  //     onAnswersChange(newAnswers);
  //   };

  //   const handleCorrectAnswerChange = (index) => {
  //     const newAnswers = question.answers.map((ans, i) => ({
  //       ...ans,
  //       isCorrect: i === index,
  //     }));
  //     onAnswersChange(newAnswers);
  //   };

  function mark_answer(answerindex) {
    const newanswers = paperQuestions?.[question_index]?.Answers?.map(
      (answer) => ({
        ...answer,
        select: false,
      })
    );

    newanswers[answerindex].select = true;

    const updated_answers = (paperQuestions[question_index].Answers =
      newanswers);

    setPaperDetails((prevDetails) => ({
      ...prevDetails,
      questions: prevDetails.questions.map((q, i) =>
        i === question_index ? { ...q, Answers: updated_answers } : q
      ),
    }));

    console.log(paperQuestions);
  }

  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-white font-sans w-full  max-w-xl my-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Question {question_index + 1}</h2>
      </div>

      <div className="flex justify-start">
        {paperQuestions?.[Number(question_index)] ? (
          <h1>{paperQuestions[Number(question_index)].Question_Description}</h1>
        ) : (
          <h1>Loading question...</h1>
        )}
      </div>

      <div className="mt-6">
        {paperQuestions &&
          paperQuestions[question_index].Answers.map((answer, index) => (
            <div
              onClick={() => {
                mark_answer(index);
              }}
              key={index}
              className="flex items-center mb-4"
            >
              <div
                className={`flex justify-start  w-full p-3  rounded-md border border-gray-500 ${
                  answer.select === true ? "bg-white/20" : " bg-gray-700/30"
                }  text-white`}
              >
                <h1 className="mr-4 text-sm">{index + 1}</h1>
                <h1 className="text-start">{answer.Answer_Description}</h1>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full h-10 flex justify-end mt-10 items-center">
        <div
          onClick={() => {
            if (question_index === paperQuestions.length - 1) {
              // Submit the answers
              console.log("Submitting answers...");
              uploadPaper();

              // Add your submission logic here
            } else {
              setselectedQuestionindex((prevIndex) => prevIndex + 1);
            }
          }}
          className="w-fit px-5 rounded-md h-full hover:ring-2 hover:ring-white bg-gray-400/30 flex justify-end items-center"
        >
          <h1>
            {question_index === paperQuestions.length - 1
              ? "Submit Answers"
              : "Next"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default EachQuestionInAnwerPage;
