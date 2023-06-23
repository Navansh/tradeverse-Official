import Link from "next/link";
import React, { useState } from "react";
import FormField from "../FormField";
import Button from "../Button";
import { useRouter } from "next/router";
import { signIn } from "@/firebase";
import { toast } from "react-toastify";

//Styles
const styles = {
  wrapper: "mt-[10%] flex flex-col space-y-8",
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const logIn = (e: any) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Pls Required Field", {
        position: "bottom-right",
      });

    signIn(email, password);
    router.push("/dashboard/feed");
  };
  return (
    <form onSubmit={logIn} id="login">
      <div className={styles.wrapper}>
        <FormField
          title="Enter Your Email"
          type="email"
          isInput
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          title="Enter your password"
          type="Password"
          isInput
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <Button isFunc title="Continue" />
        <span className="text-[#00B86B] text-center cursor-pointer">
          Forgot password
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
