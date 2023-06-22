import FormField from "@/components/FormField";
import { category } from "@/constant";
import React from "react";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  storeName: string;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>
  location: string
}

const Account = ({
  categories,
  description,
  lastName,
  name,
  setCategories,
  setDescription,
  setLastName,
  setName,
  setStoreName,
  storeName,
  location,
  setLocation
}: Props) => {
  return (
    <>
      <div className="flex items-center space-x-6">
        <FormField
          title="Enter your first name *"
          type="text"
          isInput
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormField
          title="Enter your last name *"
          type="text"
          isInput
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-6">
        <FormField
          title="Enter your Shop name *"
          type="text"
          isInput
          value={storeName}
          handleChange={(e) => setStoreName(e.target.value)}
        />
        <FormField
          title="What do you want to sell *"
          type="select"
          isCategory
          item={category}
          handleChange={(e) => setCategories(e.target.value)}
        />
      </div>
      <FormField
        title="Location *"
        type="text"
        isInput
        value={location}
        handleChange={(e) => setLocation(e.target.value)}
      />
      <FormField
        title="Description *"
        type="textarea"
        isTextArea
        value={description}
        handleChange={(e) => setDescription(e.target.value)}
      />
    </>
  );
};

export default Account;
