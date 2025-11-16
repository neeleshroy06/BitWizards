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
          alt="BitWizards Logo"
          className="w-60 m-0 h-60 mb-5"
        />
        <h1 className={`font-bold text-3xl ${pixelFont.className} text-white`}>
          BitWizards
        </h1>
        <p
          className={`font-bold text-xl text-amber-400 ${pixelFont.className} `}
        >
          Learn the magic of CS!
        </p>
        <Link href="/home">
          <Button
            className={`font-bold text-l ${pixelFont.className}`}
            variant="secondary"
          >
            Join The Adventure
          </Button>
        </Link>
      </div>
    </div>
  );
}
