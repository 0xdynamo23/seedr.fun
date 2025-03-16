"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "animate"> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animateIcon?: boolean;
  glowOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'right',
  animateIcon = true,
  glowOnHover = true,
  className,
  children,
  ...props
}) => {
  const baseStyles = "relative font-medium rounded-lg flex items-center justify-center transition-all";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const variantStyles = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50",
    ghost: "text-emerald-500 hover:bg-emerald-50",
    link: "text-emerald-500 hover:underline p-0",
    gradient: "bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:from-emerald-600 hover:to-green-500",
  };
  
  const iconVariants = {
    left: {
      initial: { x: 0, opacity: 1 },
      hover: { x: -3, opacity: 1 },
    },
    right: {
      initial: { x: 0, opacity: 1 },
      hover: { x: 3, opacity: 1 },
    },
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };
  
  const glowStyles = glowOnHover 
    ? "after:absolute after:inset-0 after:rounded-lg after:opacity-0 hover:after:opacity-100 after:transition-opacity after:bg-emerald-500/20 after:blur-xl after:z-[-1]" 
    : "";
  
  return (
    <motion.button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        glowStyles,
        "group",
        className
      )}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <motion.span 
          className="mr-2 inline-flex"
          variants={animateIcon ? iconVariants.left : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
      )}
      
      {variant === 'gradient' ? (
        <span className="relative z-10">{children}</span>
      ) : (
        <>{children}</>
      )}
      
      {icon && iconPosition === 'right' && (
        <motion.span 
          className="ml-2 inline-flex"
          variants={animateIcon ? iconVariants.right : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
      )}
      
      {variant === 'gradient' && (
        <motion.div 
          className="absolute inset-0 rounded-lg overflow-hidden z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400"
            animate={{ 
              x: ['-100%', '0%', '100%'],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </motion.button>
  );
};

export default AnimatedButton; 