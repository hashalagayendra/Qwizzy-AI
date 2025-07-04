"use client";
import React from "react";
import { useState } from "react";
import HomeHeadder from "../components/HomeHeadder";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import herobg from "@/assest/hero_bg.png";
import Link from "next/link";
import loginimg from "@/assest/login.jpg";

import axios from "axios";

import { Toaster, toast } from "react-hot-toast";
import googleIcon from "@/assest/google.svg";
import { redirect } from "next/navigation";
function page() {
  const router = useRouter();
  const [email, setemail] = useState();
  const [password, setpassword] = useState("");
  const [User_name, setUser_name] = useState("");

  async function haddleregister() {
    const errors = [];
    if (!User_name) {
      errors.push("Add User Name");
    }

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }
    if (!/[a-z]/.test(password) && !/[A-Z]/.test(password)) {
      errors.push(
        "Password must contain at least one letter (uppercase or lowercase)."
      );
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (errors.length > 0) {
      errors.map((each) => {
        toast.error(each);
      });

      return;
    }

    const exsistuser = await axios.post("/api/user", {
      method: "check_user_by_email",
      data: {
        email: email,
      },
    });

    console.log(exsistuser.data.userExists);

    if (exsistuser.data.userExists) {
      toast.error("User already registered with this email.");
      return;
    }

    try {
      const response = await axios.post("/api/user", {
        method: "add_user",
        data: {
          name: User_name,
          email: email,
          password: password,
        },
      });

      console.log("response");

      toast.success("Success Registration");

      router.push("/login");
    } catch (e) {
      console.log("registation faild in catch block ", e);
    }
  }

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

      {/* Overlay and signup box */}
      <div className="flex items-center justify-center min-h-screen w-full ">
        <div className="flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs w-full h-full min-h-screen">
          <div
            className="max-w-lg w-full mt-[64px] p-[2px] rounded-xl animate-border"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
            }}
          >
            <div className="actual_form w-full max-w-lg py-5 bg-black/90 rounded-xl flex flex-col items-center justify-center px-10 ">
              <h1 className="text-4xl text-white mt-5 mb-8">Sign Up</h1>

              <div
                onClick={() => signIn("google", { callbackUrl: "/form" })}
                className="w-full py-2 bg-white/40 rounded mb-7 text-center cursor-pointer flex items-center justify-center gap-5"
              >
                <img src={googleIcon.src} alt="" className="h-8 text-white" />
                <p className="text-white">Sign Up With Google</p>
              </div>

              <div className="w-full flex items-center my-3">
                <hr className="w-full h-0.5 bg-white/40 backdrop-blur-sm" />
                <h1 className="text-white px-2 text-sm">OR</h1>
                <hr className="w-full h-0.5 bg-white/40 backdrop-blur-sm" />
              </div>

              <div className="w-full mb-5">
                <h1 className="pl-2 text-white">User Name</h1>
                <input
                  onChange={(e) => {
                    setUser_name(e.target.value);
                  }}
                  type="text"
                  className="appearance-none border-none bg-white/40 backdrop-blur-sm focus:ring-0 w-full h-9 rounded text-white px-3"
                />
              </div>

              <div className="w-full">
                <div className="w-full mb-5">
                  <h1 className="pl-2 text-white">Email</h1>
                  <input
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="email"
                    className="appearance-none bg-white/40 backdrop-blur-sm focus:ring-0 w-full h-9 rounded text-white px-3"
                  />
                </div>
                <div className="w-full">
                  <h1 className="pl-2 text-white">Password</h1>
                  <input
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    type="password"
                    className="appearance-none border-none bg-white/40 backdrop-blur-sm focus:ring-0 w-full h-9 rounded text-white px-3"
                  />
                </div>

                <div
                  onClick={() => {
                    haddleregister();
                  }}
                  className="p-[2px] mt-8 cursor-pointer text-center justify-self-center rounded-xl animate-border bg-[length:300%_300%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(270deg, #FEA0A0, #F8FFAB, #88FFAA, #8CF4FF, #9582FF, #FF82DC)",
                  }}
                >
                  <div className="cursor-pointer rounded-xl bg-black px-10 py-2 text-white">
                    <h1 className="text-lg text-white">Sign up</h1>
                  </div>
                </div>

                <Link href={"/login"}>
                  <h1 className="self-center text-center text-xs mt-5 cursor-pointer text-white">
                    Have an account? <span className="font-bold">Log in</span>
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
  /* <div className="h-full">
      <HomeHeadder></HomeHeadder>
      <Toaster position="top-right"></Toaster>
      <div className=" w-full ]  flex  items-center flex-col justify-center gap-5 px-5   h-[calc(100vh-64px)]">
        <div className="actual_form w-full max-w-lg py-5 outline-2 outline-primary rounded  flex flex-col items-center justify-center px-10  ">
          <h1 className="text-4xl text-primary mt-5 mb-8">Sign Up</h1>
         

          <div
            onClick={() => signIn("google", { callbackUrl: "/form" })}
            className="w-full py-2  bg-primary rounded mb-7 text-center cursor-pointer flex items-center justify-center gap-5 "
          >
            <img src={googleIcon.src} alt="" className=" h-8 text-amber-200" />
            <p className=" text-background">Login With Google</p>
          </div>

          <div className="w-full flex flex-col items-center my-3">
            <hr className="w-full h-0.5 bg-primary" />
            <h1 className="-translate-y-1/2 bg-background px-2 text-sm ">OR</h1>
          </div>

          <div className="w-full">
            <div className="w-full mb-5">
              <h1 className="pl-2">User Name</h1>
              <input
                onChange={(e) => {
                  setUser_name(e.target.value);
                }}
                type="text"
                className="appearance-none border-none outline-2 outline-primary bg-transparent  focus:ring-0 w-full h-9 rounded text-primary px-3"
              ></input>
            </div>
            <div className="w-full mb-5">
              <h1 className="pl-2">Email</h1>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
                className="appearance-none border-none outline-2 outline-primary bg-transparent  focus:ring-0 w-full h-9 rounded text-primary px-3"
              ></input>
            </div>
            <div className="w-full">
              <h1 className="pl-2">Password</h1>
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                className="appearance-none border-none outline-2 outline-primary bg-transparent  focus:ring-0 w-full h-9 rounded text-primary px-3"
              ></input>
            </div>
            <div
              onClick={() => {
                haddleregister();
              }}
              className="w-40 text-center justify-self-center py-2 bg-primary rounded mt-8 cursor-pointer "
            >
              <h1 className="text-lg text-background">Register</h1>
            </div>

            <h1 className="self-center text-center text-xs mt-5 cursor-pointer">
              have an account? <span className=" font-bold">Login</span>
            </h1>
          </div>
        </div>
      </div>
    </div> */
}
