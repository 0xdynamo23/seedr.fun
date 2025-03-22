import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define a type for the CommentLike result
type LikeRecord = {
  userId: string;
};

// POST /api/likes - Toggle a like on a comment
export async function POST(request: Request) {
  const { commentId, userId } = await request.json();
  
  if (!commentId || !userId) {
    return NextResponse.json(
      { error: 'Comment ID and User ID are required' }, 
      { status: 400 }
    );
  }
  
  try {
    // Check if the like already exists
    // @ts-ignore
    const existingLike = await prisma.commentLike.findFirst({
      where: {
        commentId: parseInt(commentId.toString()),
        userId
      }
    });
    
    if (existingLike) {
      // If like exists, remove it (unlike)
      // @ts-ignore
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id
        }
      });
      
      // Get updated like count
      // @ts-ignore
      const likeCount = await prisma.commentLike.count({
        where: {
          commentId: parseInt(commentId.toString())
        }
      });
      
      return NextResponse.json({ 
        liked: false, 
        message: 'Comment unliked',
        count: likeCount 
      });
    } else {
      // If like doesn't exist, create it
      // @ts-ignore
      await prisma.commentLike.create({
        data: {
          commentId: parseInt(commentId.toString()),
          userId
        }
      });
      
      // Get updated like count
      // @ts-ignore
      const likeCount = await prisma.commentLike.count({
        where: {
          commentId: parseInt(commentId.toString())
        }
      });
      
      return NextResponse.json({ 
        liked: true, 
        message: 'Comment liked',
        count: likeCount
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Error toggling like' }, { status: 500 });
  }
}

// GET /api/likes?commentId=X&userId=Y - Check if a user has liked a comment
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get('commentId');
  const userId = searchParams.get('userId');
  
  if (!commentId) {
    return NextResponse.json(
      { error: 'Comment ID is required' }, 
      { status: 400 }
    );
  }
  
  try {
    // Get all likes for the comment
    // @ts-ignore
    const allLikes: LikeRecord[] = await prisma.commentLike.findMany({
      where: {
        commentId: parseInt(commentId)
      },
      select: {
        userId: true
      }
    });
    
    // Check if user has liked the comment (if userId provided)
    let isLiked = false;
    if (userId) {
      isLiked = allLikes.some(like => like.userId === userId);
    }
    
    // Get total like count
    const likeCount = allLikes.length;
    
    return NextResponse.json({
      liked: isLiked,
      count: likeCount,
      users: allLikes.map(like => ({ userId: like.userId }))
    });
  } catch (error) {
    console.error('Error checking like status:', error);
    return NextResponse.json({ error: 'Error checking like status' }, { status: 500 });
  }
} 