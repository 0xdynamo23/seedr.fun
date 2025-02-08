"use client";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

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

const Library = () => {
  const [modalContent, setModalContent] = useState<LibraryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const cards = [
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
    {
      imageSrc: "/front.png",
      title: "Blaise: and the xion's secret",
      isLive: true,
      currency: "XION",
      amount: 0.52,
      progress: 15,
      copyright: "© Copyright",
      walletId: "B7kP4tX9LmQ2rN3ZX9Lm2Qn4Rp8Ty7ZaMk3WtV6JqNvPl",
    },
   
    
  ];

  const openModal = (item: LibraryItem) => {
    setModalContent(item);
    setCurrentPageIndex(0); // Reset to the first page
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

  return (
    <div className="pt-8 p-4 h-full overflow-y-auto w-full mt-12 md:mt-0 h-screen">
      <div className="w-full overflow-y-scroll h-fit">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 h-fit overflow-y-scroll">
        {cards.map((card, index) => (
            <div
              key={index}
              className="w-full border-2 border-white border-opacity-15 rounded-lg"
            >
              <div className="border-b-2 border-white border-opacity-15 w-full p-2 h-fit grid grid-cols-[4fr_9fr] gap-3">
                <div className="w-full">
                  <img src={card.imageSrc} className="w-full h-auto" />
                </div>
                <div className="flex flex-col justify-between pb-2">
                  <div className="rounded">
                    <div className="flex justify-between gap-2">
                      <h2 className="text-base font-medium">{card.title}</h2>
                      {card.isLive && (
                        <span className="bg-[#F9C61F] text-sm bg-opacity-30 p-1 h-fit px-3 rounded-md font-semibold text-[#F9C61F]">
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <img src="/Xion.png" className="w-6 h-6" alt="icon" />
                      <p className="text-sm text-gray-500 font-medium">
                        <span className="text-white">{card.amount}</span>{" "}
                        {card.currency}
                      </p>
                    </div>
                  </div>
                  <div className="rounded flex gap-16">
                    <div className="w-full">
                      <span className="pb-2 text-sm">{card.progress}%</span>
                      <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                        <div
                          className="bg-white h-2.5 rounded-full"
                          style={{ width: `${card.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <p className="text-white text-xs font-medium text-opacity-30">
                © Copyright
                </p>
                <div className="flex gap-8 justify-between p-1 w-full max-w-xs">
                  <p className="break-words text-sm overflow-hidden">{card.walletId}</p>
                  <div>cp</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalContent && (
        <div
          className="fixed inset-0 bg-[#161616df] backdrop-blur-lg w-screen h-screen overflow-y-hidden flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="rounded-lg p-6 w-screen  md:max-w-lg h-screen flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-between items-center w-full mb-4">
              <h2 className="text-xl font-bold">{modalContent.title}</h2>
              <button onClick={closeModal} className="rounded">
                <IconX className="text-white font-bold" />
              </button>
            </div>

            <div className="relative w-[300px] md:w-[350px] h-auto flex items-center justify-center">
              {/* Left Arrow */}
              <button
                className="absolute  left-2 md:-left-14 z-10 bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handlePrev}
              >
                <IconChevronLeft className="text-white" />
              </button>

              {/* Image Slider */}
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
                    exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute w-full h-full object-cover rounded"
                  />
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <button
                className="absolute right-2 md:-right-14 z-10 bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handleNext}
              >
                <IconChevronRight className="text-white" />
              </button>
            </div>

            {/* Progress Bar and Order Indicator */}
            <div className="w-full mt-4 flex flex-col items-center">
              <div className="w-full bg-[#D9D9D9] bg-opacity-20 h-1 rounded-full relative">
                <div
                  className="bg-[#D9D9D9] h-1 rounded-full"
                  style={{
                    width: `${
                      ((currentPageIndex + 1) / modalContent.pages.length) * 100
                    }%`,
                  }}
                ></div>
                <div
                  className="absolute top-0 left-0 h-3 w-3 bg-[#D9D9D9] rounded-full transform -translate-y-1/2"
                  style={{
                    left: `${
                      ((currentPageIndex + 1) / modalContent.pages.length) * 100
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
  );
};

export default Library;
