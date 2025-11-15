import { Button } from "@/components/ui/button";
import { Press_Start_2P } from "next/font/google";

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
        <Button>Join The Adventure</Button>
      </div>
    </div>
  );
}
