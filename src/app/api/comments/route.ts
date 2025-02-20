import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient;
}

export async function POST(request: Request) {
  const { text, projectId } = await request.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        projectId,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving comment' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { projectId: projectId },
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
  }
}