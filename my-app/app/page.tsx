import { Button } from "@/components/ui/button";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className={`font-bold text-3xl ${pixelFont.className}`}>
          BitsWizard
        </h1>
        <Link href="/home">
          <Button>Join The Adventure</Button>
        </Link>
      </div>
    </div>
  );
}
