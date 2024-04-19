import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-sky-200">
      <h1 className="text-[5rem] font-bold">Page Not Found - 404!</h1>
      <div>
        <Link href="/">
          <Button className="text-[2rem] p-[3rem] rounded-full">Go back</Button>
        </Link>
      </div>
    </div>
  );
}
