// components/ui/sidebar/CustomSidebar.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconHomeFilled, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import {
  HomeIcon,
  LibraryBig,
  CirclePlus,
  CircleUserRound
} from "lucide-react";
interface CustomSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ open, setOpen }) => {
  const links = [
    {
      label: "Home",
      href: "/marketplace",
      icon: (
        <HomeIcon  />
        
      ),
    },
    {
      label: "Library",
      href: "/marketplace/library",
      icon: (
       <LibraryBig/>
      ),
    },
    {
      label: "Create",
      href: "/marketplace/create",
      icon: (
        <CirclePlus />
      ),
    },
    // {
    //   label: "Copyrights",
    //   href: "/marketplace/copyrights",
    //   icon: (
    //     <IconSettings className="  h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Profile",
      href: "/marketplace/profile",
      icon: (
        <CircleUserRound />
      ),
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10
      min-h-screen 
      bg-[radial-gradient(85%_564px_at_50%_0%,rgba(250,137,6,0.35),transparent)] 
      md:bg-[radial-gradient(85%_264px_at_0%_0%,rgba(250,137,6,0.35),transparent)] 
      "       
      >
        <div className="flex flex-col mt-4 pl-6 flex-1 overflow-y-auto overflow-x-hidden">
        <Link href="/" className=" flex items-center gap-x-2 flex-shrink-0 p-2 py-2">
                    <img src="/icons/logo1.png" alt="Cyromics" className="w-8 h-8" />
                    <h1 className="text-xl font-bold">
                        Cyromics
                    </h1>
                </Link>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

const Logo = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-black dark:bg-[#0A0A0A] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
      Cyromics
    </motion.span>
  </Link>
);

export default CustomSidebar;
