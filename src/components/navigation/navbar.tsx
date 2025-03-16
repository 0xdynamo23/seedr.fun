"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAbstraxionAccount, useModal, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { logout } = useAbstraxionSigningClient();
  const [, setShow] = useModal();

  // Track scroll position to apply glassy effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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

  return (
    <header 
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/40 backdrop-blur-md' 
          : 'bg-white/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
          </Link>

          {/* Connect/Disconnect Button */}
          <button
            className="bg-black text-white px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-gray-800"
            onClick={handleWalletAction}
            disabled={isConnecting}
            style={{ minWidth: "150px" }}
          >
            {isConnecting ? 'Connecting...' : isConnected ? "Disconnect" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
