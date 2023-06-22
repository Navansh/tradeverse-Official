import { MyProfile, Navbar, Sidebar } from "@/components";
import React from "react";

 const PersonalProfile = () => {
  return (
   <>
   <Navbar />
   <div className="flex items-start">
    <Sidebar />
      <div className="mx-[40px]">
        <MyProfile />
      </div>
   </div>
   </>
  );
};

export default PersonalProfile
