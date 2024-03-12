import HomePage from "@/app/(home)/page";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="bg-blue-400 h-full w-full flex items-center justify-center">
      <HomePage />
    </main>
  );
}
