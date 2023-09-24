import ToasterContext from "./context/ToasterContext";
import ConnectKitContext from "./context/ConnectKitContext";
import WagmiContext from "./context/WagmiContext";
import "./css/style.css";

import { Bakbak_One } from "next/font/google";
import localFont from "next/font/local";
import VideoBackground from "@/components/VideoBackground";
import Cursor from "@/components/Cursor";

 const bakbak = Bakbak_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bakbak',
 });



export const metadata = {
  title: "MILK",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-bakbak antialiased relative bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat text-text tracking-tight`}
      >
       
        <WagmiContext>
          <ConnectKitContext> 
            <ToasterContext />
            <div className="relative z-0 flex w-full h-screen overflow-y-hidden backdrop-blur-sm text-text">
              {children}
            </div>
          </ConnectKitContext>
        </WagmiContext>
      </body>
    </html>
  );
}
