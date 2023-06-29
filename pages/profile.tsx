import { Button, MyProfile, Navbar, Sidebar } from "@/components";
import { useContractContext } from "@/context/ContractProvider";
import { useStoreContext } from "@/context/StoreContext";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAccount } from "@particle-network/connect-react-ui";

interface Message {
  id: string;
  profile: string;
  desc: string;
  location: string;
  cover: string;
  category: string;
  storeName: string;
  owner: string;
}

const PersonalProfile = () => {
  const { userStore } = useStoreContext();
  console.log(userStore);
  return (
    <>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="mx-[40px]">
        
          <div>
              <MyProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
