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

  // Format wallet address for display
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
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
          <Link href="/" className="flex items-center space-x-2 z-10">
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

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wallet Address - Only show when connected */}
            {isConnected && bech32Address && (
              <Link 
                href="/profile" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-200 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-xs font-bold text-white">
                    {bech32Address.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {formatWalletAddress(bech32Address)}
                </span>
              </Link>
            )}

            {/* Mobile Profile Icon - Only show when connected on small screens */}
            {isConnected && bech32Address && (
              <Link 
                href="/profile" 
                className="flex sm:hidden items-center justify-center w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="text-xs font-bold text-white">
                  Profile Page
                </span>
              </Link>
            )}

            {/* Connect/Disconnect Button */}
            <button
              className="bg-gradient-to-r from-gray-800 to-black text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:from-black hover:to-gray-800 border border-gray-700"
              onClick={handleWalletAction}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : isConnected ? "Disconnect" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
