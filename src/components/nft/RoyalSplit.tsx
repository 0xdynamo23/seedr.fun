"use client";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { customAlphabet } from 'nanoid';
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { CONTRACTS, CYRO_ID, TREASURY } from "@/utils/constants";
import type { GranteeSignerClient } from "@burnt-labs/abstraxion-core";
import Link from "next/link";
const RoyaltySplit = () => {
  type LibraryItem = {
    id: number;
    src: string;
    title: string;
    pages: string[];
  };

  type CardProps = {
    imageSrc: string;
    title: string;
    isLive: boolean;
    currency: string;
    amount: number;
    progress: number;
    copyright: string;
    walletId: string;
  };

  type ExecuteResultOrUndefined = ExecuteResult | string | undefined;

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

  async function read(
    client: GranteeSignerClient | undefined,
    msg: unknown,
    contract: string
  ) {
    if (!client) return;
    return client.queryContractSmart(contract, msg);
  }

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

  // to display loading state while the function executes
  const [loading, setLoading] = useState(false);

  const [transactionHash, setTransactionHash] = useState("");

  const execute = async (type: "read" | "write", msg: unknown) => {
    setLoading(true);
    setExecuteResult(undefined);

    try {
      let transactionHash: string | null = null;

      if (type === "write") {
        const res = await write(client, msg, bech32Address, CONTRACTS.cyro);

        setExecuteResult("Minted Successfully");

        setTransactionHash(res?.transactionHash ?? "");
      }

      if (type === "read") {
        const res = await read(client, msg, CONTRACTS.cyro);

        setExecuteResult("Minted Successfully");

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

  const [tokenId, setTokenId] = useState('');

  // Define a generator for numeric IDs of length 6
  const generateNumericId = customAlphabet('0123456789', 6);

  const generateRandomId = () => {
    const randomId = generateNumericId(); // Generate a random numeric ID
    setTokenId(randomId);
  };

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
    console.log("Loading:", loading);
    console.log("Res:", executeResult);
    generateRandomId();
  }, [isConnected, isConnecting]);

  const [modalContent, setModalContent] = useState<LibraryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const openModal = (item: LibraryItem) => {
    setModalContent(item);
    setCurrentPageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleNext = () => {
    if (modalContent) {
      setDirection(1);
      setCurrentPageIndex(
        (prevIndex) => (prevIndex + 1) % modalContent.pages.length
      );
    }
  };

  const handlePrev = () => {
    if (modalContent) {
      setDirection(-1);
      setCurrentPageIndex(
        (prevIndex) =>
          (prevIndex - 1 + modalContent.pages.length) %
          modalContent.pages.length
      );
    }
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [validationError, setValidationError] = useState("");

  let tokenUri = JSON.stringify({
    title: title,
    description: desc,
    image: previewUrl,
  });
  let baseUrl = "https://cyromics.com/";
  let fullTokenUri = baseUrl + tokenUri;
  let encodedTokenUri = fullTokenUri;
  //   encodeURIComponent(fullTokenUri);

  const validateFields = () => {
    if (!previewUrl) {
      setValidationError("Upload your image first !");
      return false;
    }
    if (!title.trim() || !desc.trim() || !launchDate) {
      setValidationError("Fill all the fields of your metadata");
      return false;
    }
    setValidationError("");
    return true;
  };

  return (
    <div className="pt-3 md:pr-20 p-4 h-fit w-full mt-2 md:mt-0">
      <div className="w-full h-fit">
        <div className="container mx-auto px-4 py-8 lg:flex lg:gap-4">
          <div className="relative lg:w-1/2 flex items-start justify-center">
            {/* image upload */}
            <ImageUpload onUploadSuccess={setPreviewUrl} />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium text-sm mb-1">
                Title *
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                id="title"
                placeholder="Add collectible title"
                value={title}
                className="focu w-full px-3 py-2 border border-[#EDF1F31A] border-opacity-10 rounded-md bg-[#161616] placeholder-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-medium  text-sm mb-1"
              >
                Description *
              </label>
              <input
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                id="description"
                placeholder="Add collectible description"
                className="w-full px-3 py-2 border border-gray-700 bg-[#161616] rounded-md placeholder-gray-500"
                value={desc}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="launch-date"
                className="block font-medium mb-1 text-sm"
              >
                Launch date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#EDF1F31A] border-opacity-10 bg-[#161616] text-white rounded-md pr-10 focus:outline-none peer"
                  required
                />
                <img
                  src="/calendar.png"
                  alt="Calendar Icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                  onClick={() =>
                    (
                      document.getElementById("date") as HTMLInputElement
                    )?.showPicker?.()
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex-grow">
                  <label
                    htmlFor="copyright"
                    className="block font-medium text-sm"
                  >
                    Add copyright
                  </label>
                  <p className="text-gray-500 text-xs">
                    Protect your NFT by adding a copyright! Safeguard
                    <br className="sm:hidden" /> your digital assets and ensure
                    <br className="sm:hidden" /> ownership rights are secured.
                  </p>
                </div>
                <div className="relative inline-block w-10 h-4 sm:w-14 sm:h-6 md:w-14 md:h-6">
                  <input
                    type="checkbox"
                    id="copyright"
                    className="peer absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 peer-checked:bg-[#FE7B00]"></div>
                  <div
                    className="absolute left-0.5 top-0.5 w-3 h-3 sm:w-5 sm:h-5 md:w-5 md:h-5 
               bg-white rounded-full transition-transform duration-200
               peer-checked:translate-x-[calc(100%-0.08px)] 
               sm:peer-checked:translate-x-[calc(100%-0.5rem)] 
               md:peer-checked:translate-x-[calc(100%-0.5rem)]"
                  ></div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              {/* <label
                htmlFor="mint-cost"
                className="block font-medium mb-1 text-sm"
              >
                Mint cost
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="mint-cost"
                  placeholder="0"
                  className="w-1/2 px-3 py-2 border border-[#EDF1F31A] border-opacity-10 bg-[#161616] text-white text-sm rounded-md"
                />

                <div className="relative w-1/2 flex items-center px-3 py-2 border border-[#EDF1F31A] border-opacity-10 bg-[#161616] text-white rounded-md">
                  <img
                    src="/Xion.png"
                    alt="Xion Logo"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-white text-sm">Xion</span>

                  <select
                    id="currency"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-sm bg-[#161616] text-white appearance-none focus:outline-none"
                  >
                    <option
                      value="ethereum"
                      className="flex items-center bg-[#161616] hover:bg-[#FA8906] p-5"
                    >
                      <div className="w-4 h-4 mr-2" />
                      ETH
                    </option>
                    <option
                      value="solana"
                      className="flex items-center bg-[#161616] hover:bg-[#FA8906] p-5"
                    >
                      <div className="w-4 h-4 mr-2" />
                      SOL
                    </option>
                  </select>

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 font-bold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="mb-4">
              <div className="mt-4 flex flex-col justify-start items-start">
                {validationError && (
                  <p className="text-red-500 mb-2">{validationError}</p>
                )}
                <button
                disabled={
                  loading ||
                  !bech32Address
                }
                  onClick={async () => {
                    if (validateFields()) {
                      try {
                        await execute("write", {
                          mint: {
                            owner: bech32Address,
                            token_id: tokenId,
                            token_uri: encodedTokenUri,
                            extension: {},
                          },
                        });
                      } catch (err) {
                        console.error("Minting failed:", err);
                      }
                    }
                  }}
                  className="bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white font-bold py-2 px-4 rounded h-12 w-1/3 ml-auto mt-6 text-sm"
                >
                  Create
                </button>

                {!bech32Address && (
                  <div className=" bg-[#F9C61F] w-full mt-8 text-center bg-opacity-30 rounded p-4 flex flex-row gap-8 justify-center items-center">
                    <div className="w-full ">
                      <div className="break-all text-sm overflow-hidden">
                        Please Connect Your Wallet first !
                      </div>
                    </div>
                  </div>
                )}

                <br />

                {loading && (
                  <>
                    <div className="bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white h-fit rounded w-full">
                      <pre className="w-full overflow-auto p-2 h-fit text-wrap">
                        <p> Minting... </p>
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
                        <p>Transaction Hash: </p>
                        {loading ? "" : transactionHash}
                      </pre>

                      <pre className="w-full overflow-auto p-2 h-fit text-wrap">
                        <p>See on Block Explorer: </p>
                        <Link
                        target="_blank"
                          href={`https://testnet.xion.explorers.guru/transaction/${transactionHash}`}
                        ><div className="break-all text-sm overflow-hidden">
                          <p className="text-[#FE7B00]">{`https://testnet.xion.explorers.guru/transaction/${transactionHash}`}</p>
                       
                       </div> </Link>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {isModalOpen && modalContent && (
            <div
              className="fixed inset-0 bg-[#161616df] backdrop-blur-lg w-screen h-screen overflow-y-hidden flex items-center justify-center"
              onClick={closeModal}
            >
              <div
                className="rounded-lg p-6 w-screen  md:max-w-lg h-screen flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="text-xl font-bold">{modalContent.title}</h2>
                  <button onClick={closeModal} className="rounded">
                    <IconX className="text-white font-bold" />
                  </button>
                </div>

                <div className="relative w-[300px] md:w-[350px] h-auto flex items-center justify-center">
                  <button
                    className="absolute  left-2 md:-left-14 z-10 bg-[#161616] bg-opacity-50 p-2 rounded-full"
                    onClick={handlePrev}
                  >
                    <IconChevronLeft className="text-white" />
                  </button>

                  <div className="relative w-[280px] md:w-[350px] h-[450px] lg:h-[550px] flex items-center overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.img
                        key={currentPageIndex}
                        src={modalContent.pages[currentPageIndex]}
                        alt={`Page ${currentPageIndex + 1}`}
                        custom={direction}
                        initial={{
                          x: direction === 1 ? "100%" : "-100%",
                          opacity: 0,
                        }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{
                          x: direction === 1 ? "-100%" : "100%",
                          opacity: 0,
                        }}
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.3 },
                        }}
                        className="absolute w-full h-full object-cover rounded"
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    className="absolute right-2 md:-right-14 z-10 bg-[#161616] bg-opacity-50 p-2 rounded-full"
                    onClick={handleNext}
                  >
                    <IconChevronRight className="text-white" />
                  </button>
                </div>

                <div className="w-full mt-4 flex flex-col items-center">
                  <div className="w-full bg-[#D9D9D9] bg-opacity-20 h-1 rounded-full relative">
                    <div
                      className="bg-[#D9D9D9] h-1 rounded-full"
                      style={{
                        width: `${
                          ((currentPageIndex + 1) / modalContent.pages.length) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className="absolute top-0 left-0 h-3 w-3 bg-[#D9D9D9] rounded-full transform -translate-y-1/2"
                      style={{
                        left: `${
                          ((currentPageIndex + 1) / modalContent.pages.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-white">
                    {currentPageIndex + 1} of {modalContent.pages.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoyaltySplit;
