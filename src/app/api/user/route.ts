import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/user?id={bech32Address} - Check if user exists
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    return NextResponse.json({ exists: !!user, user });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Failed to check user existence" },
      { status: 500 }
    );
  }
}

// POST /api/user - Create a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (existingUser) {
      return NextResponse.json({ success: true, user: existingUser });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        email
      }
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// PUT /api/user - Update user details
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user details
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email })
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
} 