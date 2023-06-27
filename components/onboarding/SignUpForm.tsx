import React, { useState } from "react";
import Button from "../Button";
import Account from "./Steps/Account";
import Email from "./Steps/Email";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { auth, signUp } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContractContext } from "@/context/ContractProvider";
import { useStoreContext } from "@/context/StoreContext";
import Loader from "../Loader";
import { useAccount, useAccountInfo } from "@particle-network/connect-react-ui";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

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
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            password={password}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
          />
        );
      default:
        return null;
    }
  };

  const { createStore, isLoading } = useStoreContext();

  const handleClick = async (e?: any) => {
    e.preventDefault();
    if (currentStep === 0) {
      if (!name || !lastName || !selectedCategory || !storeName || !description)
        return toast.error("Fill every required part");
  
      try {
        await createStore(
          storeName,
          selectedCategory,
          name,
          lastName,
          description,
          location
        );
        nextStep();
      } catch (error) {
        // Handle the error here, e.g., show an error toast
        toast.error("Failed to create store");
      }
    } else if (currentStep === 1) {
      // Perform validation or data handling for the Email step
      if (!email || !password)
        return toast.error("Enter email and password", {
          position: "bottom-right",
        });
      if (password !== confirmPassword)
        return toast.error("Password doesn't match", {
          position: "bottom-right",
        });
  
      signUp(email, password);
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          router.push("/profile");
        }
      });
  
      router.push("/dashboard/feed");
    }
  };

  const { connectId } = useAccountInfo();

  return (
    <form id="signup">
      {isLoading && <Loader />}
      <div className={styles.wrapper}>
        {renderStepComponent()}
        <Button handleClick={handleClick} isFunc title="Set up Store" />
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
