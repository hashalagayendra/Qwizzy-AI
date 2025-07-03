import React from "react";
import Logo from "@/assest/logo.png";

function HomeHeadder() {
  return (
    <div className="w-full h-16  bg-black/10 backdrop-blur-2xl outline-2 outline-purple-200 flex justify-between px-1 md:px-10  items-center">
      <div>
        <div className=" h-32  ">
          <img
            src={Logo.src}
            className="object-cover object-center w-full h-full"
            alt=""
          />
        </div>
      </div>
      <div className=" flex gap-10 text-purple-100 self-center  ">
        <h1>Make Papers</h1>
        <h1>Past Papers</h1>
        <h1>Make Paperss</h1>
      </div>
      <div className="w-32 h-32"> </div>
    </div>
  );
}

export default HomeHeadder;
