import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient;
}

// Define interfaces for our data structures
interface CommentData {
  id: number;
  text: string;
  projectId: string;
  timestamp: Date;
  userId?: string;
  parentId?: number | null;
  replies?: CommentData[];
  likeCount?: number;
  likes?: Array<{ userId: string }>;
}

interface LikeData {
  id: number;
  commentId: number;
  userId: string;
  timestamp: Date;
}

export async function POST(request: Request) {
  const { text, projectId, userId, parentId } = await request.json();
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  
  try {
    // Use any typing to avoid TypeScript errors while schema is updating
    // @ts-ignore
    const comment = await prisma.comment.create({
      data: {
        text,
        projectId,
        userId,
        parentId: parentId ? parseInt(parentId.toString()) : null,
      } as any
    });
    
    return NextResponse.json({
      ...comment,
      likeCount: 0,
      likes: []
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Error saving comment' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const parentId = searchParams.get('parentId');

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    // First get all comments for this project 
    // @ts-ignore
    const allComments: CommentData[] = await prisma.comment.findMany({
      where: { 
        projectId: projectId,
      },
      orderBy: { timestamp: 'desc' },
    });
    
    // Manually organize them into root comments and replies
    const rootComments: CommentData[] = [];
    const repliesMap: { [key: number]: CommentData[] } = {};
    
    // First pass - separate roots from replies and create a map for replies
    for (const comment of allComments) {
      if (comment.parentId === null) {
        // This is a root comment
        rootComments.push({
          ...comment,
          replies: [],
          likeCount: 0,
          likes: []
        });
      } else {
        // This is a reply, add it to our map
        if (!repliesMap[comment.parentId!]) {
          repliesMap[comment.parentId!] = [];
        }
        repliesMap[comment.parentId!].push({
          ...comment,
          likeCount: 0,
          likes: []
        });
      }
    }
    
    // Second pass - attach replies to their parent comments
    for (const rootComment of rootComments) {
      if (repliesMap[rootComment.id]) {
        rootComment.replies = repliesMap[rootComment.id];
      }
    }
    
    // Now get like counts for all comments
    // @ts-ignore
    const allLikes: LikeData[] = await prisma.commentLike.findMany({
      where: {
        commentId: {
          in: allComments.map(c => c.id)
        }
      }
    });
    
    // Create a map of comment IDs to like counts
    const likeCountMap: { [key: number]: number } = {};
    for (const like of allLikes) {
      if (!likeCountMap[like.commentId]) {
        likeCountMap[like.commentId] = 0;
      }
      likeCountMap[like.commentId]++;
    }
    
    // Update like counts for root comments and replies
    for (const rootComment of rootComments) {
      rootComment.likeCount = likeCountMap[rootComment.id] || 0;
      
      if (rootComment.replies) {
        for (const reply of rootComment.replies) {
          reply.likeCount = likeCountMap[reply.id] || 0;
        }
      }
    }
    
    return NextResponse.json(rootComments, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
  }
}

// Helper functions
function extractUserIdFromText(text: string): string | null {
  const match = text.match(/\[user:(.*?)\]/);
  return match ? match[1] : null;
}

function cleanTextFromUserId(text: string): string {
  return text.replace(/\s*\[user:.*?\]/, '');
}