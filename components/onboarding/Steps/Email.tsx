import FormField from "@/components/FormField";
import React from "react";

interface Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
}

const Email = ({
  email,
  setEmail,
  confirmPassword,
  password,
  setConfirmPassword,
  setPassword,
}: Props) => {
  return (
    <>
      <FormField
        title="Enter your Email address *"
        type="text"
        isInput
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        title="Enter password *"
        type="password"
        isInput
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />

      <FormField title="Confirm password *" type="password" isInput 
          value={confirmPassword}
          handleChange={(e) => setConfirmPassword(e.target.value)} />
    </>
  );
};

export default Email;
