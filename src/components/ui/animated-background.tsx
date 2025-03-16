"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'dots' | 'gradient' | 'confetti' | 'grid';
  color?: string;
  density?: number;
  speed?: number;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'dots',
  color = '#22c55e',
  density = 20,
  speed = 10,
  className = '',
}) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (variant === 'confetti') {
      const newParticles = Array.from({ length: density }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    }
  }, [variant, density]);

  if (variant === 'dots') {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none opacity-5 ${className}`}
        style={{
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: `${density}px ${density}px`,
        }}
      />
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`absolute inset-0 pointer-events-none opacity-5 ${className}`}>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, ${color}10 1px, transparent 1px), 
                              linear-gradient(to bottom, ${color}10 1px, transparent 1px)`,
            backgroundSize: `${density}px ${density}px`,
          }}
        />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <motion.div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${color}15 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 70%, ${color}15 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 80%, ${color}15 0%, transparent 50%)`,
            `radial-gradient(circle at 60% 20%, ${color}15 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 30%, ${color}15 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: speed * 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  }

  if (variant === 'confetti') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: color,
              opacity: 0.2,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 360, 0],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: speed,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default AnimatedBackground; 