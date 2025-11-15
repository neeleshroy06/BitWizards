import { Button } from "@/components/ui/button";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[url('/bg.png')] relative bg-cover">
      <div className="text-center space-y-4 flex items-center flex-col">
        <Image
          src={Logo}
          alt="BitsWizard Logo"
          className="w-70 m-0 h-70 absolute top-25"
        />
        <h1 className={`font-bold text-3xl ${pixelFont.className} text-white`}>
          BitsWizard
        </h1>
        <Link href="/home">
          <Button variant="secondary">Join The Adventure</Button>
        </Link>
      </div>
    </div>
  );
}
