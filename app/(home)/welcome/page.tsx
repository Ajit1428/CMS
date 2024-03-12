import { UserButton } from "@clerk/nextjs";
import React from "react";

const WelcomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      WelcomePage
    </div>
  );
};

export default WelcomePage;
