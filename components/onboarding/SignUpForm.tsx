import React, { useEffect, useState } from "react";
import Button from "../Button";
import Account from "./Steps/Account";
import Email from "./Steps/Email";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useStoreContext } from "@/context/StoreContext";
import Loader from "../Loader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useAccount } from "@particle-network/connect-react-ui";
import {
  connectWallet,
  createStore,
  getAllStores,
} from "@/context/services/dataverseService";
import { useContractContext } from "@/context/ContractProvider";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

// Styles
const styles = {
  wrapper: "flex flex-col space-y-6",
};

const SignUpForm = ({ setActive }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [storeName, setStoreName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const router = useRouter();
  const account = useAccount();

  const nextStep = () => {
    if (currentStep < 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Account
            name={name}
            setName={setName}
            lastName={lastName}
            setLastName={setLastName}
            description={description}
            setDescription={setDescription}
            storeName={storeName}
            setStoreName={setStoreName}
            categories={selectedCategory}
            setCategories={setSelectedCategory}
            setLocation={setLocation}
            location={location}
          />
        );
      case 1:
        return (
          <Email
            image={image}
            setImage={setImage}
            setCoverImage={setCoverImage}
            coverImage={coverImage}
          />
        );
      default:
        return null;
    }
  };

  //const { createStore, isLoading } = useStoreContext();

  const storeData = {
    storename: storeName,
    location: location,
    category: selectedCategory,
    profileImage: image,
    coverImage: coverImage,
    description: description,
  };

  useEffect(() => {
    const tx = getAllStores();
    console.log(tx);
  }, [account]);

  const handleClick = async (e?: any) => {
    e.preventDefault();

    if (currentStep === 0) {
      if (!selectedCategory || !storeName || !description || !location)
        return toast.error("Fill every required part");

      nextStep();
    } else if (currentStep === 1) {
      // Perform validation or data handling for the Email step
      if (!image || !coverImage)
        return toast.error("Enter email and coverImage", {
          position: "bottom-right",
        });
      try {
        setIsLoading(true);
        await connectWallet();
        await createStore(storeData);
        // await createStore(
        //   storeName,
        //   selectedCategory,
        //   description,
        //   location,
        //   image,
        //   coverImage
        // );
        setIsLoading(false);
        toast.success("Congratulations 😁 store created successfully", {
          position: "bottom-left",
        });
        const docRef = await addDoc(collection(db, "Store"), {
          profile: image,
          desc: description,
          location: location,
          cover: coverImage,
          category: selectedCategory,
          storeName: storeName,
          owner: account,
        });
        console.log(docRef.id);
        router.push("/onboarding/congratulation");
      } catch (error) {
        toast.error("Huh! 😟, Creating store failed pls try again later", {
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <form id="signup">
      {isLoading && <Loader />}
      <div className={styles.wrapper}>
        {currentStep === 0 ? (
          <h1 className="text-center text-[2.5rem] font-semibold">
            Add Name and Bio
          </h1>
        ) : (
          <h1 className="text-center text-[2.5rem] font-semibold">
            Add Profile Image
          </h1>
        )}

        {renderStepComponent()}
        <Button handleClick={handleClick} isFunc title="Continue" />
        <span className="text-[14px] leading-[16px] cursor-pointer text-[#fff] text-center">
          Already have an account?{" "}
          <span onClick={() => setActive("login")} className="text-green">
            Log in
          </span>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
