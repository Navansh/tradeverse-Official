import { Button, MyProfile, Navbar, Sidebar } from "@/components";
import { useContractContext } from "@/context/ContractProvider";
import React from "react";

const PersonalProfile = () => {
  const { currentUserStore } = useContractContext();
  return (
    <>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="mx-[40px]">
          {currentUserStore.length === 0 && (
            <div className="min-h-screen w-full flex mx-[157px] items-center justify-center">
              <div className="min-w-[776px] min-h-[447px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[24.33px] rounded-[40px] space-y-[16px]">
                <h1>No Store been Created</h1>
                <Button
                  title="Create A Store"
                  isLink
                  link="/onboarding/Auth#signup"
                />
                <p className="text-[18px] font-normal mt-4 leading-[24px]">
                  If you created one, but its showing. Pls just refresh browser
                </p>
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
