import { Footer, Navbar, Providers } from "@/components";
// import AuthProvider from "@/components/authProvider";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as HotToast } from "react-hot-toast";
import "@/styles/globals.css";
import { aeonik, cn, inter } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata={
    title: "Seedr",
    description: "Support builders You Trust",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <AuthProvider>
        <html lang="en" className="scrollbar">
            <body
                className={cn(
                    "min-h-screen bg-white text-foreground overflow-x-hidden w-full",
                    aeonik.variable,
                    inter.variable,
                )}
            >
                <Providers>
                    <Toaster richColors theme="dark" position="top-right" />
                    <HotToast />
                    <Navbar />
                    {children}
                    {typeof window !== 'undefined' && window.location.pathname !== '/form' && <Footer />}
                </Providers>
            </body>
        </html>
        // </AuthProvider>
    );
};
