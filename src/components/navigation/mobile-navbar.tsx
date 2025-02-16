"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, NAV_LINKS } from "@/utils";
import { LucideIcon, Menu, X, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SUPER_ADMINS = process.env.NEXT_PUBLIC_SUPER_ADMINS?.split(",") || [];

const MobileNavbar = () => {
  const router = useRouter();
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  const [_, setShowModal] = useModal();
  const isAdmin = isConnected && SUPER_ADMINS.includes(bech32Address || "");

  const handleWalletAction = () => {
    if (isConnected) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-full sm:w-[400px] p-0 bg-white border-r border-gray-100"
        >
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="p-6 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/icon-seedr.png"
                  width={40}
                  height={40}
                  alt="Seedr"
                  className="rounded-full"
                />
                <span className="font-bold text-xl text-emerald-500">seedr</span>
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <nav className="space-y-6">
                {/* Main Links */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase text-gray-500 font-medium px-3">Main</h3>
                  <div className="space-y-1">
                    <Link href="/marketplace" className="flex items-center gap-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Marketplace</span>
                    </Link>
                    <Link href="/projects" className="flex items-center gap-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Projects</span>
                    </Link>
                  </div>
                </div>

                {/* Account Section */}
                {isConnected && (
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase text-gray-500 font-medium px-3">Account</h3>
                    <div className="space-y-1">
                      <Link href="/profile" className="flex items-center gap-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="flex items-center gap-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          <span>Admin Panel</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </nav>
            </div>

            {/* Bottom Section with Wallet */}
            <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
              <Button
                onClick={handleWalletAction}
                disabled={isConnecting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isConnected ? (
                  <>
                    <span>Disconnect Wallet</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Connect Wallet</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={href!}
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-center space-x-2 text-foreground">
          <Icon className="h-4 w-4" />
          <h6 className="text-sm !leading-none">{title}</h6>
        </div>
        <p
          title={children! as string}
          className="line-clamp-1 text-sm leading-snug text-muted-foreground"
        >
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MobileNavbar;
