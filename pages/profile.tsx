import { MyProfile, Navbar, Sidebar } from "@/components";
import { useContractContext } from "@/context/ContractProvider";
import React from "react";

const PersonalProfile = () => {
  const { storeDetail } = useContractContext();
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

export default PersonalProfile;
