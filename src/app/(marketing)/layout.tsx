"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
// import { ThemeProvider } from "next-themes";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { AddressProvider } from "@/context/AddressContext";
import { Navbar } from "@/components";

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
      <div>
        <Navbar />
        {children}
        <Abstraxion onClose={() => setShow(false)} />
      </div>
    </AddressProvider>
  );
}
