import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-[#fdf0dc] text-gray-700 px-6 py-10 font-serif">
      {/* Header */}
      <header className="mb-10">
        <nav className="flex justify-center gap-10 mb-5">
          <a href="#" className="hover:underline">
            make Your Paper
          </a>
          <a href="#" className="hover:underline">
            Answering pre made paper
          </a>
          <a href="#" className="hover:underline">
            Dash Board
          </a>
        </nav>
        <h1 className="text-center text-3xl font-semibold">Make Your Paper</h1>
        <h2 className="text-center text-xl mt-2">Set up Paper</h2>
      </header>

      {/* Paper Setup */}
      <section className="border p-6 rounded-md max-w-4xl mx-auto mb-10 bg-white bg-opacity-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Paper Name"
            className="border p-2 rounded w-full"
          />
          <button className="border p-2 rounded bg-[#5e5140] text-white">
            Add Students
          </button>
          <textarea
            placeholder="Paper Description"
            className="border p-2 rounded w-full h-24 md:col-span-1"
          />
          <button className="border p-2 rounded bg-[#5e5140] text-white">
            Set Time
          </button>
        </div>
      </section>

      {/* Questions Section */}
      <section className="max-w-4xl mx-auto">
        <h3 className="text-center text-xl mb-4">Questions</h3>

        {/* Question Card */}
        <div className="border rounded overflow-hidden mb-10 shadow-sm bg-white bg-opacity-40">
          <div className="flex">
            <button className="flex-1 p-2 bg-[#5e5140] text-white text-center">
              MCQ Question
            </button>
            <button className="flex-1 p-2 bg-[#e6dfd2] text-center">
              Short Answer Questions
            </button>
          </div>

          <div className="p-4">
            <label className="block mb-2 font-medium">Question</label>
            <textarea
              className="border w-full p-2 rounded mb-4"
              placeholder="Write your question here"
            />

            <div>
              <label className="block mb-2 font-medium">Answers</label>
              <div className="space-y-2">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border p-2 rounded"
                  >
                    <input type="radio" name="answer" />
                    <input
                      type="text"
                      placeholder="Answer option"
                      className="flex-1 border-none focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right mt-4">
              <button className="px-4 py-1 border rounded bg-[#5e5140] text-white">
                +
              </button>
            </div>
          </div>
        </div>

        {/* Short Answer Question Card */}
        <div className="border rounded overflow-hidden mb-10 shadow-sm bg-white bg-opacity-40">
          <div className="flex">
            <button className="flex-1 p-2 bg-[#5e5140] text-white text-center">
              MCQ Question
            </button>
            <button className="flex-1 p-2 bg-[#e6dfd2] text-center">
              Short Answer Questions
            </button>
          </div>

          <div className="p-4">
            <label className="block mb-2 font-medium">Question</label>
            <textarea
              className="border w-full p-2 rounded mb-4"
              placeholder="Write your question here"
            />
          </div>
        </div>

        {/* Add Question Button */}
        <div className="text-center mb-10">
          <button className="px-6 py-2 border rounded-full bg-white shadow hover:bg-[#eee]">
            ➕ Add Question
          </button>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button className="px-6 py-2 bg-[#5e5140] text-white rounded shadow">
            Save Paper
          </button>
        </div>
      </section>
    </div>
  );
}

export default page;
