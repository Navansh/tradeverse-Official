import { support } from "@/assets";
import Image from "next/image";
import React from "react";
import FormField from "./FormField";
import Button from "./Button";

const Contact = () => {
  return (
    <div className="max-w-[1280px] lg:h-[657px] h-auto bg-[#1C2631] mx-[80px] my-[80px] grid md:grid-cols-2 space-x-[80px] grid-cols-1 p-[80px] rounded-[8px]">
      <div className="flex-col inline-flex space-y-[16px] md:items-start items-center md:text-start">
        <Image
          src={support}
          alt="plug"
          className="w-[79.66px] h-[80px] object-cover"
        />
        <h1 className="w-[191] text-[40px] text-green leading-[48.66px] font-bold">
          Contact Us
        </h1>
        <p className="w-[400px] text-[16px] leading-[24px] font-normal">
          We understand the importance of providing exceptional customer support
          and fostering meaningful engagement with our community. That`s why we
          highly recommend adding a Feedback box to enhance your experience on
          TradeVerse. Enjoy real-time support, instant answers to your
          questions, and seamless communication with our team.
        </p>
      </div>

      <form
        action=""
        className="w-[540px] space-y-[24px] px-4 py-2.5 h-[497px]"
      >
        <FormField title="Name" isInput />
        <FormField title="Email" isInput />
        <FormField title="Message" isTextArea />
        <div className="mt-[16px] flex items-center min-w-full">
          <Button title="Send Message" isFunc />
        </div>
      </form>
    </div>
  );
};

export default Contact;
