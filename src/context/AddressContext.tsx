"use client";

import { createContext, useContext, ReactNode } from "react";

type AddressContextType = {
  bech32Address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
};

const AddressContext = createContext<AddressContextType>({
  bech32Address: null,
  isConnected: false,
  isConnecting: false,
});

export const AddressProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AddressContextType;
}) => {
  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
