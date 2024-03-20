import HomePage from "@/app/(home)/page";
import Navbar from "@/components/custom/navbar";

export default function Home() {
  return (
    <div className="bg-blue-400 h-full w-full overflow-hidden">
      <Navbar />
      <HomePage />
    </div>
  );
}
