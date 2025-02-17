"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Search, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../global/max-width-wrapper";
import MobileNavbar from "./mobile-navbar";
import AnimationContainer from "../global/animation-container";
import Image from "next/image";
import { useAbstraxionAccount, useModal, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { useRouter } from 'next/navigation';

const SUPER_ADMINS = process.env.NEXT_PUBLIC_SUPER_ADMINS?.split(",") || [];

const Navbar = () => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { logout } = useAbstraxionSigningClient();
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
  const handleWalletAction = async () => {
    if (isConnected) {
      try {
        await logout?.();
        localStorage.removeItem("xion-authz-granter-account");
        router.push('/');
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    async function createUser() {
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

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-4">
            {isConnected && (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-9 px-3 text-sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}

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
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : isConnected ? "Disconnect" : "Connect Wallet"}
                </Button>

                {/* <Link href="/profile">
                  <Button variant="ghost" className="w-10 h-10 p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600 stroke-[2.5px]" />
                  </Button>
                </Link> */}
              </>
            )}

            {!isConnected && (
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
                disabled={isConnecting}
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNavbar />
        </MaxWidthWrapper>
      </AnimationContainer>
    </header>
  );
};

export default Navbar;
