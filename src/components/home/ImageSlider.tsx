"use client";
import React, { useState, useEffect, useRef } from "react";

const ImageSlider: React.FC = () => {
  const [count, setCount] = useState(0);
  const [go, setGo] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    
  ];

  const handleButtonClick = (index: number) => {
    setCount(index);
    stopAutoSlide();
    startAutoSlide();
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    timerRef.current = setInterval(() => {
      setCount((prevCount) => {
        let newCount = prevCount;

        if (!go) {
          newCount = prevCount + 1;
          if (newCount >= images.length) {
            newCount = 0;
          }
        } else {
          newCount = prevCount - 1;
          if (newCount < 0) {
            newCount = images.length - 1;
          }
        }

        return newCount;
      });
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [go, images.length]);

  useEffect(() => {
    if (count >= images.length - 1) {
      setGo(true);
    } else if (count <= 0) {
      setGo(false);
    }
  }, [count, images.length]);

  useEffect(() => {
    // Update window width after component mounts
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth(); // Initial width
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <div className="w-full py-4">
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-1000 gap-8"
          style={{
            transform:
              windowWidth && windowWidth >= 768
                ? `translateX(${-620 * count}px)`
                : undefined,
          }}
        >
        </ul>
      </div>

      
    </div>
  );
};

export default ImageSlider;
