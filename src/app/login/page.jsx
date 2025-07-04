"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import herobg from "@/assest/hero_bg.png";
import loginimg from "@/assest/login.jpg";

import Link from "next/link";

import HomeHeadder from "../components/HomeHeadder";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import googleIcon from "@/assest/google.svg";
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
    <div className="relative min-h-screen">
      <Toaster position="top-right"></Toaster>
      <div className="absolute top-0 left-0 z-50 w-full">
        <HomeHeadder></HomeHeadder>
      </div>

      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={loginimg.src}
          className="object-cover object-center w-full h-full"
          alt=""
        />
      </div>

      {/* Overlay and login box */}
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen">
          <div
            className="max-w-lg w-full p-[2px] mt-[64px] rounded-xl animate-border"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
            }}
          >
            <div className="actual_form w-full max-w-lg py-5 bg-black/90 rounded-xl flex flex-col items-center justify-center px-10">
              <h1 className="text-4xl text-white mt-5 mb-8">Log In</h1>

              <div
                onClick={() => signIn("google", { callbackUrl: "/form" })}
                className="w-full py-2  bg-white/40 rounded mb-7 text-center cursor-pointer flex items-center justify-center gap-5 "
              >
                <img src={googleIcon.src} alt="" className=" h-8 text-white" />
                <p className=" text-white">Login With Google</p>
              </div>

              <div className="w-full flex  items-center my-3">
                <hr className="w-full h-0.5 bg-white/40 backdrop-blur-sm" />
                <h1 className=" text-white px-2 text-sm ">OR</h1>
                <hr className="w-full h-0.5 bg-white/40 backdrop-blur-sm" />
              </div>

              <div className="w-full">
                <div className="w-full mb-5">
                  <h1 className="pl-2 text-white">Email</h1>
                  <input
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="email"
                    className="appearance-none  bg-white/40 backdrop-blur-sm  focus:ring-0 w-full h-9 rounded text-white px-3"
                  ></input>
                </div>
                <div className="w-full">
                  <h1 className="pl-2 text-white">Password</h1>
                  <input
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    type="password"
                    className="appearance-none border-none bg-white/40 backdrop-blur-sm  focus:ring-0 w-full h-9 rounded text-white px-3"
                  ></input>
                </div>

                <div
                  onClick={() => {
                    haddlelogin();
                  }}
                  className="p-[2px]  mt-8 cursor-pointer  text-center justify-self-center  rounded-xl animate-border bg-[length:300%_300%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
                  }}
                >
                  <div className="cursor-pointer rounded-xl bg-black px-10 py-2 text-white">
                    <h1 className="text-lg text-white">Login</h1>
                  </div>
                </div>

                {/* <div className="w-40 text-center justify-self-center py-2 bg-white/40 rounded mt-8 cursor-pointer "></div> */}
                <Link href={"/signup"}>
                  <h1 className="self-center text-center text-xs mt-5 cursor-pointer text-white">
                    Don't have an account?{" "}
                    <span className=" font-bold">Sign up</span>
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

{
  /* 
  <div className="actual_form w-full max-w-lg py-5  outline-2 outline-white rounded  flex flex-col items-center justify-center px-10   ">
            
          </div>
  */
}
