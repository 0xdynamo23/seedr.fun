import { Footer, Navbar, Providers } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { aeonik, cn, inter } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata={
    title: "Seedr",
    description: "Support builders you trust",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scrollbar">
            <body
                className={cn(
                    "min-h-screen bg-white text-foreground overflow-x-hidden w-fit",
                    aeonik.variable,
                    inter.variable,
                )}
            >
                <Providers>
                    <Toaster richColors theme="dark" position="top-right" />
                    <Navbar/>
                    {children}
                    <Footer/>
                </Providers>
            </body>
        </html>
    );
};
