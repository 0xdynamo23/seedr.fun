import { Footer, Navbar, Providers } from "@/components";
// import AuthProvider from "@/components/authProvider";
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
        // <AuthProvider>
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
                    {typeof window !== 'undefined' && window.location.pathname !== '/form' && <Navbar />}
                    {children}
                    {typeof window !== 'undefined' && window.location.pathname !== '/form' && <Footer />}
                </Providers>
            </body>
        </html>
        // </AuthProvider>
    );
};
