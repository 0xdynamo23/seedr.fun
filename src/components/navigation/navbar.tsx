"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../global/max-width-wrapper";
// import MobileNavbar from "./mobile-navbar";
import AnimationContainer from "../global/animation-container";
import Image from "next/image";
import { useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";

const SUPER_ADMINS = process.env.NEXT_PUBLIC_SUPER_ADMINS?.split(",") || [];

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const [, setShow] = useModal();

  const isAdmin = bech32Address && SUPER_ADMINS.includes(bech32Address);

  // Navbar transparency effect on scroll
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

  // Handle wallet connect/disconnect
  const handleWalletAction = () => {
    if (isConnected) {
      console.log(
        "Wallet already connected. Handle disconnect manually if needed."
      );
    } else {
      setShow(true); // Open the wallet connection modal
    }
  };

  useEffect(() => {
    async function createUser () {
      const res = await fetch("/api/upload/user", {
        method: "POST",
        body: JSON.stringify({
          address: localStorage.getItem("xion-authz-granter-account")
        })
      });
    }

    if (isConnected) {
      console.log("Create User!");
      if (!localStorage.getItem("xion-authz-granter-account"))
        return;

      createUser();
      
    }
  }, [isConnected]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 w-full z-10 select-none py-4 transition-all",
        scroll && "bg-background/40 backdrop-blur-md"
      )}
    >
      <AnimationContainer reverse delay={0.1} className="size-full">
        <MaxWidthWrapper className="flex items-center justify-between px-5 bg-transparent">
          {/* Logo */}
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

          <div className="flex items-center space-x-4">
            {/* Admin Panel Button (Only for Super Admins) */}
            {isAdmin && (
              <Link href="/admin">
                <Button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Admin Panel
                </Button>
              </Link>
            )}

            {/* Connect Wallet Button */}
            <Button
              className={cn(
                buttonVariants({
                  variant: "primary",
                  size: scroll ? "sm" : "lg",
                }),
                "bg-black text-white"
              )}
              style={{ width: "150px", height: "40px" }}
              onClick={handleWalletAction}
            >
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
          </div>
        </MaxWidthWrapper>
      </AnimationContainer>
    </header>
  );
};

export default Navbar;
