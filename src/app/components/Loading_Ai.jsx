import { Loader } from "lucide-react";
import React from "react";

function Loading_Ai() {
  return (
    <div
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeInUp 0.5s ease-out forwards`,
        animationDelay: `${100}ms`,
      }}
      className="flex items-center justify-center h-screen"
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Loader className="animate-spin text-blue-500" size={48} />
        </div>
        <p className="text-lg font-semibold text-gray-700">
          Generating questions...
        </p>
        <p className="text-sm text-gray-500">
          Please wait a moment, we are preparing your questions.
        </p>
      </div>
    </div>
  );
}

export default Loading_Ai;
