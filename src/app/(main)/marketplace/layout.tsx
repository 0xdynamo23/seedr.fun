"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import CustomSidebar from "@/components/dashboard/Sidebar";
import { cn } from "@/utils";
// import { ThemeProvider } from "next-themes";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { AddressProvider } from "@/context/AddressContext";

// Custom hook for consuming the context


export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

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

  return (
    <AddressProvider value={{ bech32Address, isConnected, isConnecting }}>
      <div
        className={cn(
          "flex flex-col md:flex-row bg-[#0A0A0A] dark:bg-neutral-800 w-screen flex-1",
          "h-screen"
        )}
      >
        <CustomSidebar open={open} setOpen={setOpen} />

        <div className="flex flex-1 h-screen w-full">
          <div className="h-screen dark:border-neutral-700 bg-[#0A0A0A] dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
           
           <div className="hidden md:block">
            <div className="flex pt-3 pb-1 px-8 justify-end">
              <Button
                fullWidth
                onClick={() => {
                  setShow(true);
                }}
                structure="outlined"
                style={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "16px",
                  width: "150px",
                  height: "38px",
                  fontStyle: "poppins",
                  borderImageSource:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 100%)",
                  background:
                    "radial-gradient(68.04% 300.23% at 30.28% 22.92%, #F9C61F 0%, #F85507 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                {bech32Address ? (
                  <div className="flex items-center justify-center">
                    Disconnect
                  </div>
                ) : (
                  "Connect"
                )}
              </Button>
            </div>
            </div>

            {children}

            <Abstraxion onClose={() => setShow(false)} />
          </div>
        </div>
      </div>
    </AddressProvider>
  );
}
