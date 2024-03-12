"use client"

import { useRouter } from "next/navigation";

import React from "react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const onContinue = () => {
    router.push("/welcome")
  }


  return (
    <div className="h-full flex items-center text-white bg-blue-400 justify-center">
    <div className="border-solid border-2 border-yellow-400 p-6 shadow-xl w-[370px] h-[370px] gap-y-4 flex flex-col items-center justify-center">
        <h1 className="text-4x1 shadow-xl font-bold border-b-2 border-yellow-500">
          Welcome to K.B.L Securities CRM
        </h1>
        <p>
          The CRM is designed in order to minimize the communication gap between
          Kumari Bank Limited and K.B.L Securities Limited
        </p>
        <p className="text-red-500 font-bold">
          *Note: This website is confidential and can be used by staffs only*
        </p>
        <Button onClick={onContinue}>Click to continue</Button>
      </div>
    </div>
  );
};

export default HomePage;
