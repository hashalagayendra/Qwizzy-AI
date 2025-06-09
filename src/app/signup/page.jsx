"use client";
import React from "react";
import { useState } from "react";
import HomeHeadder from "../components/HomeHeadder";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <div className="h-full">
      <HomeHeadder></HomeHeadder>
      <Toaster position="top-right"></Toaster>
      <div className=" w-full ]  flex  items-center flex-col justify-center gap-5 px-5   h-[calc(100vh-64px)]">
        <div className="actual_form w-full max-w-lg py-5 outline-2 outline-primary rounded  flex flex-col items-center justify-center px-10  ">
          <h1 className="text-4xl text-primary mt-5 mb-8">Sign Up</h1>
          {/* <h1 className="text-2xl mb-5 text-primary">
            {role === "student" ? "Student Login" : "Teacher Login"}
          </h1> */}
          {/* <div className="w-full flex  h-12 outline-2 outline-primary rounded mb-10 ">
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
          </div> */}

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
    </div>
  );
}

export default page;
