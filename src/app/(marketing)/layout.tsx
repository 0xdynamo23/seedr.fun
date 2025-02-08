import React from "react";
import { Footer, Navbar } from "@/components";
import { GoogleAnalytics } from '@next/third-parties/google'

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <>
      <GoogleAnalytics gaId="G-4KGSP3415V" />
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <main className="flex-grow mx-auto w-full relative z-0">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MarketingLayout;