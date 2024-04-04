import HomePage from "@/components/custom/home/home-page";
import Navbar from "@/components/custom/navbar/right-navbar";

export default function Landing() {
  return (
    <div className="bg-blue-400 h-full w-full overflow-hidden">
      <div className="flex justify-end m-2">
        <Navbar />
      </div>
      <HomePage />
    </div>
  );
}
