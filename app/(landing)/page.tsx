import HomePage from "@/components/custom/home/page";
import { ModeToggle } from "@/components/custom/modeToggle";
import Navbar from "@/components/custom/navbar/right-navbar";

export default function Home() {
  return (
    <div className="bg-blue-400 h-full w-full overflow-hidden">
      <div className="flex justify-end items-center space-x-1 px-2">
        <Navbar />
        <ModeToggle />
      </div>
      <HomePage />
    </div>
  );
}
