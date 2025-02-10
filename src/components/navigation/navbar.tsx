"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../global/max-width-wrapper";
import MobileNavbar from "./mobile-navbar";
import AnimationContainer from "../global/animation-container";
import Image from "next/image";
import { useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  // Abstraxion hooks
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  // Log connection state (for testing)
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);

  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 w-full z-10 select-none py-4",
        scroll && "bg-background/40 backdrop-blur-md"
      )}
    >
      <AnimationContainer reverse delay={0.1} className="size-full">
        <MaxWidthWrapper className="flex items-center justify-between px-5 bg-transparent">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icon-seedr.png"
                  alt="seedr"
                  width={38}
                  height={38}
                  className="w-8 h-8"
                />
                <span className="text-xl font-semibold text-emerald-500">
                  seedr
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center flex-1 justify-end space-x-4">
            {/* Search Bar */}
            <div className="max-w-md w-full hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search your favorite projects..."
                  className="w-full h-9 pl-9 pr-12 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent bg-white/90"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  Ctrl+K
                </span>
              </div>
            </div>

            {/* Connect Wallet Button */}
            <div className="hidden lg:block">
              <Button
                className={cn(
                  buttonVariants({
                    variant: "primary",
                    size: scroll ? "sm" : "lg",
                  }),
                  "bg-black text-white"
                )}
                style={{ width: "150px", height: "40px" }}
                onClick={() => {
                  setShow(true);
                }}
              >
                {bech32Address ? (
                  <div className="flex items-center justify-center">
                    Disconnect
                  </div>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNavbar />
          </div>
        </MaxWidthWrapper>
      </AnimationContainer>
    </header>
  );
};

export default Navbar;
