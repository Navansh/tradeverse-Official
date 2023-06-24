import { MyProfile, Navbar, Sidebar } from "@/components";
import { useContractContext } from "@/context/ContractProvider";
import React from "react";

const PersonalProfile = () => {
  const { storeDetail } = useContractContext();
  console.log(storeDetail);
  return (
    <>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="mx-[40px]">
          {storeDetail.length === 0 && (
            <div className="min-h-screen w-full flex mx-[157px] items-center justify-center">
              <div className="min-w-[776px] min-h-[447px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[24.33px] rounded-[40px] space-y-[16px]">
                <h1>No Store been Created</h1>
              </div>
            </div>
          )}
          <MyProfile />
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
