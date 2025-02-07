'use client'
import React, {useState} from "react";
import BentoGrid from "../componenets/BentoGrid";
import ProfileForm from "../componenets/ProfileForm";

const page = () => {
  const [name, setName] = useState("Your Name")
  const [gitFeilds, setgitFeilds] = useState<object | null>(null);
  const [allFeilds, setallFeilds] = useState<object | null>(null);
  const handleChange = (val:string)=>{
        setName(val);
  }
  const handleGitChange = (val:object)=>{
        setgitFeilds(val);
  }
  const handleFeildChange = (val:object)=>{
      setallFeilds(val);
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="lg:flex md:flex">
        <div className="lg:w-1/3 md:w-1/4  lg:block bg-[#1E1E2F] text-white  h-screen p-4">
          <ProfileForm handleChange = {handleChange} handleGitChange={handleGitChange} handleFeildChange={handleFeildChange}/>
        </div>
        {/* <div className="lg:hidden bg-black text-white p-8 m-2">
      <ProfileForm />
    </div> */}
        <div className="w-full">
          <BentoGrid fullname = {name} gitValues = {gitFeilds} allFeilds={allFeilds}/>
        </div>
      </div>
    </>
  );
};

export default page;
