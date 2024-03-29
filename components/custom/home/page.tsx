"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const onContinue = () => {
    router.push("/admin/dashboard")
  }


  return (
    <div className="h-full flex items-center bg-blue-400 justify-center">
      <div className="dark:text-black border-solid border-2 rounded-xl bg-gradient-to-br mb-[100px] from-white from-40% to-yellow-200 overflow-hidden border-yellow-400 p-4 shadow-xl w-[370px] gap-y-6 flex flex-col items-center text-start justify-center">
        <Image alt="home_logo" width={300} height={100} src="/logo.png" />
        <h1 className="text-4x1 shadow-xl font-bold border-b-2 border-yellow-500">
          Welcome to K.B.L Securities Limited CMS
        </h1>
        <p>
          The Customer Management System (CMS) is designed in order to minimize the communication gap between
          Kumari Bank Limited and K.B.L Securities Limited.
        </p>
        <p className="text-red-500 font-bold">
          *Note: This website is confidential and can be used only by the staffs*
        </p>
        <Button onClick={onContinue} className="mb-6 rounded-full" >Click to continue</Button>
      </div>
    </div>
  );
};

export default HomePage;
