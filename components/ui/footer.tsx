import { FaPaperPlane, FaTwitter } from "react-icons/fa";
import Logo from "./logo";
import { ProjectName, telegramUrl, twitterUrl } from "@/utils/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky top-full">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        {/* Blocks */}
          {/* 1st block */}
          <div className="order-1 sm:col-span-12 lg:col-span-4 lg:order-none">
            <div className="flex flex-row justify-between w-full h-full">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                <div className="">
                  <Logo />
                </div>
                <div className="text-sm text-slate-300">
                  © {ProjectName} <span className="text-slate-500">-</span> All
                  rights reserved.
                </div>
              </div>
              {/* Social links */}
               <ul className="flex items-center justify-center gap-2">
                <li>
                  <Link
                    className="flex items-center justify-center transition duration-300 ease-in-out text-text hover:text-primary/80 hover:scale-105"
                    href={twitterUrl}
                    target="_blank"
                    aria-label="Twitter"
                  >
                   <FaTwitter size={24} />
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-center transition duration-300 ease-in-out text-text hover:text-primary/80 hover:scale-105"
                    href={telegramUrl}
                    target="_blank"
                    aria-label="Dev.to"
                  >
                    <FaPaperPlane size={24} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </footer>
  );
}
