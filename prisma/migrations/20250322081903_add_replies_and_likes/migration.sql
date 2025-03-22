-- AlterTable
ALTER TABLE "Comment" ADD COLUMN IF NOT EXISTS "parentId" INTEGER,
ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- CreateTable
CREATE TABLE IF NOT EXISTS "CommentLike" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "CommentLike_commentId_userId_key" ON "CommentLike"("commentId", "userId");

-- AddForeignKey
-- First drop existing constraints if they exist
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'Comment_parentId_fkey'
    ) THEN
        ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'CommentLike_commentId_fkey'
    ) THEN
        ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";
    END IF;
END $$;

-- Then add them back
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" 
FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" 
FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
