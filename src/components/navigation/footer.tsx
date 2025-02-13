"use client";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";

const Footer = () => {
  const { isConnected } = useAbstraxionAccount(); // Check if the wallet is connected

  return (
    <MaxWidthWrapper>
      <footer className="w-full border-t border-gray-100 bg-white">
        <div className="max-w-6x2 mx-auto px-6 py-12 flex flex-col gap-8 lg:flex-row lg:justify-between">
          {/* Left Section */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <p className="text-gray-600 max-w-md">
              Make a difference by supporting initiatives you believe in, contribute through Seeder rounds to bring impactful ideas to life.
            </p>

            {/* Show only if wallet is connected */}
            {isConnected && (
              <Link href="/form">
                <button className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2">
                  Post your product
                </button>
              </Link>
            )}

            <div className="flex justify-center lg:justify-start items-center gap-4 mt-2">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="https://telegram.org" className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-6 text-center lg:text-right">
            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-2">Contact us</h3>
              <a href="mailto:admin@seeder.com" className="text-gray-600 hover:text-gray-900 font-bold">
                admin@seeder.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700">Privacy policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 pb-8 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center px-6">
          <p className="text-sm text-gray-500 px-40">© Seedr 2025 · All Rights Reserved</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 px-40">
            <span>Made with</span>
            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>by</span>
            <Link href="/" className="flex items-center gap-1">
              <Image src="/icons/logo1.png" alt="Cyro Studios" width={20} height={20} className="rounded-full" />
              <span className="font-extrabold">Cyro Studios</span>
            </Link>
          </div>
        </div>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
