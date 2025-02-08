"use client";
import React, { useState, useEffect } from "react";
import ImageSlider from "@/components/home/ImageSlider";
import Image from "next/image";
import Link from "next/link";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { CONTRACTS, CYRO_ID, TREASURY } from "@/utils/constants";
import type { GranteeSignerClient } from "@burnt-labs/abstraxion-core";
import { AnimationContainer } from "@/components";

const Home = () => {
  const minting_soon = [
    {
      id: 1,
      title: "Blaise in Portugal...",
      img: "/assets/home/Portugal.jpeg",
    },
    {
      id: 4,
      title: "Blaise in Turkey...",
      img: "/assets/home/Turkey.jpeg",
    },
    {
      id: 5,
      title: "Blaise in China...",
      img: "/assets/home/China.jpeg",
    },

    {
      id: 2,
      title: "Blaise in India...",
      img: "/assets/home/India.jpeg",
    },
    {
      id: 6,
      title: "Blaise in Nigeria...",
      img: "/assets/home/Nigeria.jpeg",
    },
    {
      id: 7,
      title: "Blaise in UAE...",
      img: "/assets/home/UAE.jpeg",
    },
    {
      id: 8,
      title: "Blaise in Bangladesh...",
      img: "/assets/home/Bangladesh.jpeg",
    },
  ];

  type ExecuteResultOrUndefined = ExecuteResult | string | undefined;

  async function read(
    client: GranteeSignerClient | undefined,
    msg: unknown,
    contract: string
  ) {
    if (!client) return;
    return client.queryContractSmart(contract, msg);
  }

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
          all_tokens: {
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
    <div className="overflow-y-scroll pt-8 p-4 w-full ">
      {/* Slider */}
      <div className="w-full">
        <ImageSlider />
      </div>

      {/* Trending Now */}
      <div className="w-full my-4">
        <div>
          <p className="font-semibold text-xl mb-4">Trending Now</p>
        </div>
        <div className="w-full overflow-x-scroll">
          <div className="flex gap-8 overflow-x-scroll">
            {loading ? (
              <div className="flex justify-center items-center w-full h-[60vh]">
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
                          <>
                          { item.token_id!=='11233005' && 
                            <AnimationContainer delay={index * 0.1}>
                            <Link href={`/marketplace/nft/${item.token_id}`}>
                              <div
                                key={item.token_id}
                                className="cursor-pointer flex flex-col gap-3 h-full"
                              >
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
                           }
                          </>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Minting Soon */}
      <div className="w-full">
        <div>
          <p className="font-semibold text-xl mb-4">Minting Soon</p>
        </div>
        <div className="w-full overflow-x-scroll">
          <div className="flex gap-8 overflow-x-scroll">
            {minting_soon.map((comic) => (
              <div key={comic.id} className="flex-shrink-0 w-1/3 md:w-1/4">
                <div className="relative">
                  <img
                    src={comic.img}
                    className="w-full h-auto object-cover"
                    alt={comic.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <p className="text-[#737373] text-xl text-center font-normal flex flex-col items-center justify-center">
                      <span>Minting</span> <span>Soon</span>
                    </p>
                  </div>
                </div>
                <p>{comic.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
