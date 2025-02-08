"use client";
// import { AnimationContainer } from "@/components";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-screen min-w-full border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 max-w-md">
              Make a difference by supporting initiatives you believe in, contribute through Seeder rounds to bring impactful ideas to life.
            </p>
            <Link href="/post">
              <button className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2">
                Post your product
              </button>
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="https://telegram.org" className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.35c.212-.19-.043-.295-.324-.295l-5.97.94L5.85 9.966c-.65-.206-.66-.65.135-.965l14.012-5.397c.538-.196 1.006.128.897.617z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-6 md:text-right">
            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-2">Contact us</h3>
              <a href="mailto:admin@seeder.com" className="text-gray-600 hover:text-gray-900">
                admin@seeder.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700">
                Privacy policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">© Seedr 2025 · All Rights Reserved</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>by</span>
            <Link href="/" className="flex items-center gap-1">
              <span className="font-medium">Cyro Studios</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;