"use client";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { CONTRACTS, CYRO_ID, TREASURY } from "@/utils/constants";
import type { GranteeSignerClient } from "@burnt-labs/abstraxion-core";
import { AnimationContainer } from "@/components";
import Link from "next/link";
type LibraryItem = {
  id: number;
  src: string;
  title: string;
  pages: string[];
};

type ExecuteResultOrUndefined = ExecuteResult | string | undefined;

async function read(
  client: GranteeSignerClient | undefined,
  msg: unknown,
  contract: string
) {
  if (!client) return;
  return client.queryContractSmart(contract, msg);
}

const Library = () => {
  // Abstraxion hooks
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);
  const [ownerOfCyro, setOwnerOfCyro] = useState<string | undefined>();
  const [transferTo, setTransferTo] = useState<string>("");
  const { client } = useAbstraxionSigningClient();

  // Initialize loading as true
  const [loading, setLoading] = useState(true);

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);
  const [tokens, setTokens] = useState<string[]>([]);

  const [nftData, setNftData] = useState<any[]>([]);

  const fetchNftData = async () => {
    try {
      console.log("Fetching NFT data...");

      // Create an array of promises for all token IDs
      const results = await Promise.all(
        tokens.map(async (id) => {
          console.log("Fetching NFT for token ID:", id);

          try {
            const res = await read(
              client,
              { nft_info: { token_id: id } },
              CONTRACTS.cyro
            );

            // Ensure tokenUri exists
            if (!res.token_uri) {
              console.error(`No token URI found for token ID ${id}`);
              return { token_id: id, error: "No token URI found" };
            }

            const tokenUri = res.token_uri;

            // Check if tokenUri contains the expected base URL
            const jsonString = tokenUri.split("https://cyromics.com/")[1];

            if (!jsonString) {
              console.error(`Invalid token URI format for token ID ${id}`);
              return { token_id: id, error: "Invalid token URI format" };
            }

            // Parse the JSON string
            const tokenData = JSON.parse(jsonString);

            // Ensure tokenData contains expected properties
            const { title, description, image } = tokenData;

            // Log the response for debugging
            console.log("Response for token ID:", id, res);

            // Return the structured result
            return {
              token_id: id,
              title: title || "No title available",
              description: description || "No description available",
              image: image || "No image available",
              ...res,
            };
          } catch (error) {
            console.error("Error fetching data for token ID:", id, error);
            return { token_id: id, error: "Error fetching data" };
          }
        })
      );

      // After Promise.all completes, you can use the results
      console.log("Results:", results);

      console.log("Fetched results:", results); // Log the fetched data
      setNftData(results); // Store the results in state
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const getAllTokens = async () => {
    try {
      const res = await read(
        client,
        {
          tokens: {
            owner: bech32Address,
          },
        },
        CONTRACTS.cyro
      );

      setTokens(res.tokens);
      fetchNftData();
    } catch (err) {
      console.log(err);
      setLoading(false); // Make sure to set loading to false on error
    }
  };
  useEffect(() => {
    if (!client) return;
    getAllTokens();
  }, [client]);

  useEffect(() => {
    console.log("Tokens array updated:", tokens); // Log tokens here
    if (tokens.length > 0) {
      fetchNftData(); // Call fetchNftData when tokens are available
    }
  }, [tokens]);

  return (
    <div className="pt-8 p-8 overflow-y-auto w-full mt-12 md:mt-0 h-full">
      <div>
        <p className="font-semibold text-2xl mb-8">Your Library</p>
      </div>
      {isConnected && bech32Address ? (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FE7B00]"></div>
            </div>
          ) : (
            <>
              {nftData && nftData.length > 0 ? (
                <div className="w-full h-fit">
                  <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-16 px-6 h-fit">
                    {nftData.map((item, index) => {
                      console.log("Rendering item:", item);
                      return (
                        <AnimationContainer
                          delay={index * 0.1}
                          key={item.token_id}
                        >
                          <Link href={`/marketplace/library/${item.token_id}`}>
                            <div className="cursor-pointer flex flex-col gap-3 h-full">
                              <img
                                src={item.image || "/assets/img404.png"}
                                onError={(e) =>
                                  (e.currentTarget.src = "/assets/img404.png")
                                }
                                className="w-full object-cover rounded h-full"
                                alt="Couldn't fetch the image"
                              />
                              <p className="text-xl">{item.title}</p>
                            </div>
                          </Link>
                        </AnimationContainer>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center py-32">
                  <p className="text-[#737373] font-light text-2xl text-center h-full">
                    You currently don&apos;t have any NFT
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex justify-center py-32">
          <p className="text-[#737373] font-light text-2xl text-center h-full">
            Please Connect Your Wallet to view your NFTs
          </p>
        </div>
      )}
    </div>
  );
};

export default Library;
