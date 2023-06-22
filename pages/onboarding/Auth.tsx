"use client";
import { logo } from "@/assets";
import { LoginForm, SignUpForm } from "@/components";
import Image from "next/image";
import React, { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState("login");
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="min-w-[700px] min-h-[340px] my-5 bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[24.33px] rounded-[40px] space-y-[16px]">
        <Image
          src={logo}
          alt="logo"
          className="w-[80px] h-[61px] object-contain"
        />
        {active === "signup" && (
          <h2 className="text-[30px] text-center w-full leading-[40px] font-semibold">
            Signup to TradeVerse
          </h2>
        )}
        {active === "login" && (
          <h2 className="text-[30px] text-center w-full leading-[40px] font-semibold">
            Login to TradeVerse
          </h2>
        )}

        <div className="flex items-center justify-center space-x-9">
          <a href="#login">
          <button
            onClick={() => setActive("login")}
            className={`${
              active === "login"
                ? "border-b-2 w-[70px] py-4 border-[#00B86B]"
                : "border-none"
            } text-[16px] leading-[24px] text-center font-semibold`}
          >
            login
          </button>
          </a>
          <a href="#signup">
          <button
            onClick={() => setActive("signup")}
            className={`${
              active === "signup"
                ? "border-b-2 py-4 border-[#00B86B]"
                : "border-none"
            } text-[16px] leading-[24px] text-center font-semibold`}
          >
            signup
          </button>
          </a>
        </div>
        <div className=" min-w-[490px]">
          {active === "login" && <LoginForm />}
          {active === "signup" && <SignUpForm setActive={setActive} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
