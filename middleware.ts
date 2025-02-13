import { NextRequest, NextResponse } from "next/server";

// Load super-admin wallet addresses from environment variables
const SUPER_ADMINS = (process.env.SUPER_ADMINS || "")
  .split(",")
  .map((addr) => addr.trim().toLowerCase()); // Normalize for case-insensitive comparison

const getUserRole = (walletAddress: string) => {
  return SUPER_ADMINS.includes(walletAddress.toLowerCase()) ? "super-admin" : "user";
};

export function middleware(req: NextRequest) {
  const walletAddress = req.headers.get("wallet-address")?.trim();

  if (!walletAddress) {
    console.warn("Unauthorized access attempt - Missing wallet address.");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const role = getUserRole(walletAddress);

  if (req.nextUrl.pathname.startsWith("/admin") && role !== "super-admin") {
    console.warn(`Access denied for ${walletAddress} to ${req.nextUrl.pathname}`);
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect `/admin` routes
export const config = {
  matcher: ["/admin/:path*"],
};
