"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 1000,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <Header>
        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>
        <Footer />
      </Header>
    </>
  );
}
