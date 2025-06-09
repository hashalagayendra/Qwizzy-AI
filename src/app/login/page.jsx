"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import HomeHeadder from "../components/HomeHeadder";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function page() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [role, setrole] = useState("student");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormessege_haddler, seterrormessege_haddler] = useState(0);

  if (error && !errormessege_haddler) {
    toast.error(error);
    seterrormessege_haddler(1);
  }

  function haddlelogin() {
    try {
      signIn("credentials", {
        email: email,
        password: password,

        callbackUrl: "/form",
      });
    } catch (e) {
      console.log("login faild" + e);
    }
  }

  useEffect(() => {
    console.log(`email is ${email}  password is ${password} `);
  }, [email, password]);

  return (
    <div>
      <HomeHeadder></HomeHeadder>
      <Toaster position="top-right"></Toaster>
      <div className=" w-full ]  flex  items-center flex-col justify-center gap-5 px-5  mt-8 ">
        <h1 className="text-4xl text-primary">Log In</h1>

        <div className="actual_form w-full max-w-xl py-5 outline-2 outline-primary rounded  flex flex-col items-center justify-center px-10  ">
          <h1 className="text-2xl mb-5 text-primary">
            {role === "student" ? "Student Login" : "Teacher Login"}
          </h1>
          <div className="w-full flex  h-12 outline-2 outline-primary rounded mb-10 ">
            <div
              onClick={() => {
                setrole("student");
              }}
              className={`w-1/2 h-full flex items-center text-primary  bg-primary/0 ${
                role === "student" && "bg-primary/100 text-white"
              } justify-center transition-all duration-500 cursor-pointer `}
            >
              <h1>Login As a Student</h1>
            </div>
            <div
              onClick={() => {
                setrole("teacher");
              }}
              className={`w-1/2 h-full flex items-center justify-center bg-primary/0  ${
                role === "teacher" && "bg-primary/100 text-white"
              }  transition-all duration-500 cursor-pointer `}
            >
              <h1>Login As a Teacher</h1>
            </div>
          </div>

          <div
            onClick={() => signIn("google", { callbackUrl: "/form" })}
            className="w-full py-3 outline-2 outline-primary rounded mb-7 text-center cursor-pointer"
          >
            Login With Google
          </div>

          <div className="w-full">
            <div className="w-full mb-5">
              <h1>Email</h1>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="text"
                className="appearance-none border-none outline-2 outline-primary bg-transparent  focus:ring-0 w-full h-9 rounded text-primary"
              ></input>
            </div>
            <div className="w-full">
              <h1>Password</h1>
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                className="appearance-none border-none outline-2 outline-primary bg-transparent  focus:ring-0 w-full h-9 rounded text-primary"
              ></input>
            </div>
            <div
              onClick={() => {
                haddlelogin();
              }}
              className="w-40 text-center justify-self-center py-2 bg-primary rounded mt-8 cursor-pointer "
            >
              <h1 className="text-lg text-white">Login</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

{
  /* <div className="   w-full md:max-w-4xl lg:max-w-6xl outline-2 outline-primary flex flex-col items-center rounded">
         
          <div className=" make_extra_div w-full h-full flex justify-center py-7 px-5 "></div>
        </div> */
}
