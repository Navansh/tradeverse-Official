import React from "react";

const MissionStatement = () => {
  const statement = [
    {
      title: "Mission",
      description:
        "Our mission is to empower individuals around the world to unleash their entrepreneurial spirit and create thriving businesses. We provide a decentralized marketplace that fosters meaningful connections between buyers and sellers, revolutionizing the way commerce is conducted. Through innovative technologies, seamless experiences, and a global community, we aim to inspire creativity, support economic growth, and shape the future of decentralized e-commerce.",
    },
    {
      title: "Vision",
      description:
        "Our vision is to be the leading decentralized marketplace, where individuals can seamlessly connect, transact, and thrive in a trusted and vibrant community. We envision a future where traditional barriers are eliminated, empowering sellers to showcase their unique products and buyers to discover and access a diverse range of offerings. By prioritizing convenience, security, and authenticity, we strive to redefine the e-commerce landscape and create a sustainable platform that empowers both entrepreneurs and consumers worldwide.",
    },
  ];
  return (
    <div className="w-full flex flex-wrap items-start lg:pl-[80px]  border-b-4 border-[#fff] pb-24 space-x-[40px] ">
      {statement.map((item, i) => (
        <div key={i} className="flex flex-col items-start mt-9 justify-center space-y-[16px]">
          <h2 className="text-[40px] font-bold leading-[48px]">{item.title}</h2>
          <p className="text-[16px] leading-[24px] w-[620px]  font-normal">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MissionStatement;
