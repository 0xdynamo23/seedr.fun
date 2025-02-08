"use client";
import { cn } from "@/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  LibraryBig,
  CirclePlus,
  CircleUserRound,
} from "lucide-react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { AddressProvider } from "@/context/AddressContext";
import { useEffect } from "react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  children?: Links[]; // Nested links
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  const mobileNavLinks: Links[] = [
    {
      label: "Home",
      href: "/marketplace",
      icon: <HomeIcon />,
    },
    {
      label: "Library",
      href: "/marketplace/library",
      icon: <LibraryBig />,
    },
    {
      label: "Create",
      href: "/marketplace/create",
      icon: <CirclePlus />,
    },

    // {
    //   label: "Copyrights",
    //   href: "/marketplace/copyrights",
    //   icon: <IconSettings className="  h-5 w-5 flex-shrink-0" />,
    // },
    {
      label: "Profile",
      href: "/marketplace/profile",
      icon: <CircleUserRound />,
    },
  ];

  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar navLinks={mobileNavLinks} className="custom-class" />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-[#0A0A0A] dark:bg-[#292A2E] w-[370px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "370px" : "60px") : "370px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate,
  navLinks, // Accept navLinks as a prop
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  navLinks?: Links[]; // Define type for navLinks as an array of Links
  [key: string]: any; // Accepting additional custom props
}) => {
  const { open, setOpen } = useSidebar();
  const sidebarOpen = openProp !== undefined ? openProp : open;
  const sidebarSetOpen = setOpenProp !== undefined ? setOpenProp : setOpen;

  const [copen, csetOpen] = useState(false);

  // Abstraxion hooks
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  // Log connection state (for testing)
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);

  return (
    <div
      className={cn(
        "z-[999] h-12 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-[#0A0A0A] fixed top-0 left-0 right-0 dark:bg-neutral-800 w-full",
        className
      )}
      {...props} // Spread remaining custom props here
    >
      <div className="flex justify-between z-20 w-full items-center">
        <Link
          href="#"
          className="font-black flex space-x-2 gap-4 items-center text-xl text-black  z-20"
        >
          <Image
            src="/assets/logo.png"
            alt="Cyromics"
            width={24}
            height={24}
            quality={100}
            className="rounded-sm bg-foreground/10  "
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium  text-black dark:text-white whitespace-pre"
          >
            Cyromics
          </motion.span>
        </Link>

        <IconMenu2
          className="text-white dark:text-white"
          onClick={() => sidebarSetOpen(!sidebarOpen)}
        />
      </div>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-[#0A0A0A] dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
              onClick={() => sidebarSetOpen(!sidebarOpen)}
            >
              <IconX className="text-white" />
            </div>
            {navLinks && (
              <div className="flex flex-col gap-4 mt-12">
                {navLinks.map((link, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      console.log("closing....");
                      sidebarSetOpen(!sidebarOpen);
                    }}
                  >
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: [-20, 5, 0] }}
                      transition={{
                        delay: index * 0.3,
                        duration: 0.8,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                    >
                      <SidebarLink link={link} />
                      {link.children && (
                        <div className="ml-8">
                          {link.children.map((childLink, childIndex) => (
                            <motion.div
                              key={childIndex}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: [-20, 5, 0] }}
                              transition={{
                                delay: (index + childIndex) * 0.3,
                                duration: 0.8,
                                ease: [0.4, 0.0, 0.2, 1],
                              }}
                              className="mt-3"
                            >
                              <SidebarLink link={childLink} />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}

                <div className="block md:hidden">
                  <div className="flex pt-3 pb-1 px-8 justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: [-20, 5, 0] }}
                      transition={{
                        delay: 1.4,
                        duration: 0.8,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                      className="mt-3 w-full"
                    >
                      <Button
                        fullWidth
                        onClick={() => {
                          setShow(true);
                        }}
                        structure="outlined"
                        style={{
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "16px",
                          width: "100%",
                          height: "56px",
                          fontStyle: "poppins",
                          borderImageSource:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 100%)",
                          background:
                            "radial-gradient(68.04% 300.23% at 30.28% 22.92%, #F9C61F 0%, #F85507 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
                        }}
                      >
                        {bech32Address ? (
                          <div className="flex items-center justify-center">
                            Disconnect
                          </div>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  // Check if the current path includes the link's href
  const isActive =
    pathname === link.href ||
    (pathname.startsWith(link.href) && link.href !== "/marketplace");

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: [-20, 5, 0] }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <Link
        href={link.href}
        className={cn(
          "flex items-center justify-start gap-4 group/sidebar py-2 rounded-md p-3",
          isActive ? "text-white" : "text-neutral-500",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "text-xl font-semibold transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            isActive
              ? "text-white"
              : "text-neutral-500 group-hover/sidebar:translate-x-1"
          )}
        >
          {link.icon}
        </div>

        <motion.span
          animate={{
            display: "inline-block",
            opacity: 1,
          }}
          className={cn(
            "text-xl  font-semibold transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            isActive
              ? "text-white"
              : "text-neutral-500 dark:text-neutral-200 group-hover/sidebar:translate-x-1"
          )}
        >
          {link.label}
        </motion.span>
      </Link>
    </motion.div>
  );
};
