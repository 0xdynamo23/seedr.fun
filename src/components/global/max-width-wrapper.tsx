"use client";

import { cn } from "@/utils";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
    className?: string;
    children: React.ReactNode;
    animate?: boolean;
}

const MaxWidthWrapper = ({ className, children, animate = true }: Props) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    // Subtle parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    
    return (
        <section 
            ref={ref}
            className={cn(
                "h-full w-full px-0 bg-white relative overflow-hidden",
                className,
            )}
        >
            {/* Subtle animated gradient background */}
            {animate && (
                <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20" />
                </motion.div>
            )}
            
            {/* Content with subtle parallax - ensuring full width */}
            <motion.div 
                style={animate ? { y } : undefined} 
                className="relative z-10 w-full"
            >
                {children}
            </motion.div>
        </section>
    )
};

export default MaxWidthWrapper