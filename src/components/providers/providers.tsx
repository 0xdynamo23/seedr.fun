"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { TREASURY } from "@/utils/constants";
interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AbstraxionProvider
         config={{ ...TREASURY }} 
      >
        {children}
      </AbstraxionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
