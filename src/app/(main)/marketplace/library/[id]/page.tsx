"use client";
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
import { useParams } from "next/navigation";
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

const Mint = () => {
  // Abstraxion hooks
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  useState<ExecuteResultOrUndefined>(undefined);
  const { client } = useAbstraxionSigningClient();

  // Initialize loading as true
  const [loading, setLoading] = useState(false);

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);
  const [nftData, setNftData] = useState<any>();

  const { id } = useParams();

  const fetchNftData = async () => {
    try {
      const res = await read(
        client,
        { all_nft_info: { token_id: id } },
        CONTRACTS.cyro
      );

      console.log("************", res);

      if (!res) {
        console.error("Response is undefined.");
        return;
      }

      // Ensure tokenUri exists
      if (!res.info.token_uri) {
        console.error(`No token URI found for token ID ${id}`);
        return { token_id: id, error: "No token URI found" };
      }

      const tokenUri = res.info.token_uri;

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
      // console.log("Response for token ID:", id, res);

      const newNftData = {
        token_id: id,
        owner: res.access.owner,
        title: title || "No title available",
        description: description || "No description available",
        image: image || "No image available",
        ...res,
      };

      setOwnerOfCyro(res.access.owner);

      // console.log("Setting NFTData:", newNftData);
      setNftData(newNftData);
    } catch (error) {
      console.error("Error fetching data for token ID:", id, error);
      return { token_id: id, error: "Error fetching data" };
    }
  };
  useEffect(() => {
    fetchNftData(); // Call fetchNftData when tokens are available
  }, [client, isConnected, isConnecting]);

  const [transactionHash, setTransactionHash] = useState("");

  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);
  const [ownerOfCyro, setOwnerOfCyro] = useState<string | undefined>();
  const [transferTo, setTransferTo] = useState<string>("");

  async function write(
    client: GranteeSignerClient | undefined,
    msg: unknown,
    sender: string,
    contract: string
  ) {
    if (!client) return;
    return client.execute(
      sender,
      contract,
      msg,
      {
        amount: [{ amount: "1", denom: "uxion" }],
        gas: "500000",
        granter: TREASURY.treasury,
      },
      "",
      []
    );
  }

  const execute = async (type: "read" | "write", msg: unknown) => {
    setLoading(true);
    setExecuteResult(undefined);

    try {
      let transactionHash: string | null = null;

      if (type === "write") {
        const res = await write(client, msg, bech32Address, CONTRACTS.cyro);

        setExecuteResult("Transaction Successfull");

        setTransactionHash(res?.transactionHash ?? "");
      }

      if (type === "read") {
        const res = await read(client, msg, CONTRACTS.cyro);

        setExecuteResult("Transaction Successfull");

        setTransactionHash(res?.transactionHash ?? "");
      }
    } catch (err) {
      let errorMessage = "There was an error, check logs";
      let transactionHash: string | null = null;

      if (err instanceof Error) {
        const errorParts = err.message.split(":");
        errorMessage = errorParts.at(-2) || "Unknown error";

        // Extract transaction hash from error message
        const hashMatch = err.message.match(/tx ([A-F0-9]{64})/i);
        if (hashMatch) {
          transactionHash = hashMatch[1];
        }
      } else if (typeof err === "object" && err !== null && "msg" in err) {
        errorMessage = (err as { msg: string }).msg;
      }

      setTransactionHash(transactionHash ?? "");
      setExecuteResult(errorMessage);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-scroll pt-0 p-4 w-full">
      <div>
        <p className="font-semibold text-2xl mb-8">Manage Your NFT</p>
      </div>
      {bech32Address == ownerOfCyro ? (
        <div className="flex items-center justify-center">
          {!nftData ? (
            <div className="flex justify-center items-center h-[80vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FE7B00]"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-1 xl:grid-cols-[3fr_5fr] w-full ">
                <div className="w-full p-8 flex justify-center">
                  <img
                    src={nftData.image || "/assets/img404.png"}
                    onError={(e) =>
                      (e.currentTarget.src = "/assets/img404.png")
                    }
                    className="w-full max-w-sm object-cover rounded h-full"
                    alt={nftData.title}
                  />
                </div>
                <div className="w-full p-8 h-full flex flex-col gap-8">
                  <div className="rounded p-1">
                    <h2 className="text-4xl font-bold">{nftData.title}</h2>
                    {/* <div className="flex items-center mt-1 space-x-2">
                  <p className=" text-2xl text-gray-500 font-medium">
                    <span className="text-white">0.52</span> XION
                  </p>
                </div> */}
                  </div>
                  {/* <div className=" bg-[#161616] rounded py-6 p-4 flex gap-16">
                <div className="flex items-center justify-between">
                  <span className=" bg-[#F9C61F] bg-opacity-30 p-2 px-4 rounded-md font-semibold text-[#F9C61F]">
                    LIVE
                  </span>
                </div>
                <div className="w-full">
                  <span className="pb-2">15%</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </div> */}
                  <div className="rounded p-1">
                    <h3 className="text-2xl font-bold">Description</h3>
                    <div></div>
                    <p>{nftData.description}</p>
                  </div>

                  <div className=" bg-[#161616] rounded py-6 p-4 flex flex-row gap-8 justify-center items-center">
                    <div className="flex items-center w-fit justify-between">
                      <span className=" bg-[#F9C61F] w-max text-center bg-opacity-30 p-2 px-4 rounded-md font-semibold text-[#F9C61F]">
                        Token ID
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="break-all text-sm overflow-hidden">
                        {nftData.token_id}
                      </div>
                    </div>
                  </div>

                  <div className=" bg-[#161616] rounded py-6 p-4 flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="flex items-center w-full md:w-fit justify-between">
                      <span className=" bg-[#F9C61F] w-full md:w-fit text-center bg-opacity-30 p-2 px-4 rounded-md font-semibold text-[#F9C61F]">
                        Owner
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="break-all text-sm overflow-hidden">
                        {nftData.owner}
                        {bech32Address === nftData.owner && <span> (Me)</span>}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      console.log("Clicked on Burn");
                      execute("write", {
                        burn: {
                          token_id: nftData.token_id,
                        },
                      });
                    }}
                    className="px-8 p-3 rounded-md  font-semibold text-base cursor-pointer"
                    style={{
                      borderImageSource:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 100%)",
                      background:
                        "radial-gradient(68.04% 300.23% at 30.28% 22.92%, #F9C61F 0%, #F85507 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    Burn
                  </button>

                  <div className="flex flex-row gap-2 w-full">
                    <input
                      type="text"
                      name="recipient"
                      id="recipient"
                      className="grow rounded-md text-black bg-primary border-2 border-foreground ring-0 active:ring-0 w-[60%]"
                      value={transferTo}
                      onChange={(v) => setTransferTo(v.target.value)}
                      required
                    />
                    <button
                      onClick={() =>
                        execute("write", {
                          transfer_nft: {
                            token_id: nftData.token_id,
                            recipient: transferTo,
                          },
                        })
                      }
                      className="px-8 p-3 rounded-md  font-semibold text-base"
                      style={{
                        borderImageSource:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 100%)",
                        background:
                          "radial-gradient(68.04% 300.23% at 30.28% 22.92%, #F9C61F 0%, #F85507 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
                      }}
                    >
                      Transfer
                    </button>
                  </div>

                  {loading && (
                    <>
                      <div className="bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white h-fit rounded w-full">
                        <pre className="w-full overflow-auto p-2 h-fit text-wrap">
                          <p> Processing... </p>
                        </pre>
                      </div>
                    </>
                  )}

                  {executeResult && (
                    <>
                      <div className="bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white h-fit rounded w-full">
                        <pre className="w-full overflow-auto p-2 h-fit text-wrap">
                          <p>Execute Result : </p>
                          {loading
                            ? "Loading..."
                            : JSON.stringify(executeResult, (_, v) =>
                                typeof v === "bigint" ? v.toString() : v
                              )}
                        </pre>

                        <pre className="w-full overflow-auto p-2 h-fit text-wrap">
                          <p>See on Block Explorer: </p>
                          <Link
                            target="_blank"
                            href={`https://testnet.xion.explorers.guru/transaction/${transactionHash}`}
                          >
                            <div className="break-all text-sm overflow-hidden">
                              <p className="text-[#FE7B00]">{`https://testnet.xion.explorers.guru/transaction/${transactionHash}`}</p>
                            </div>{" "}
                          </Link>
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center py-32">
          <p className="text-[#737373] font-light text-2xl text-center h-full">
            You do not own this NFT any more
          </p>
        </div>
      )}
    </div>
  );
};

export default Mint;
