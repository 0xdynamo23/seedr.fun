import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const teamEmails = body.team?.map(member => member.name);
    const newProject = await prisma.project.create({
      data: {
        name: body.name,
        tagline: body.tagline,
        category: body.category,
        logo: body.logo,
        projectPics: body.projectPics || [],
        teamEmails: teamEmails,
        contactEmail: body.contactEmail,
        description: body.description,
        ownerId: body.ownerId,
        status: "PENDING", // Can be "PENDING" | "ACCEPTED" | "REJECTED"
        links: {
          // create: [
          //   { telegram: "t.me/projectA", website: "https://projectA.com" },
          //   { x: "twitter.com/projectA", discord: "discord.gg/projectA" }
          // ]
          create: {
            telegram: body.links?.telegram,
            x: body.links?.x,
            discord: body.links?.discord,
            website: body.links?.website,
          },
        }
      }
    });
    
  
    // const newProject = await prisma.project.create({
    //   data: {
    //     name: body.name,
    //     tagline: body.tagline,
    //     category: body.category,
    //     //ownerId: 1,// body.ownerId,
    //     logo: body.logo,
    //     projectPics: body.projectPics || [], // Ensure an array
    //     teamEmails: "", // Ensure an array
    //     contactEmails: body.contactEmail || [], // Ensure an array
    //     description: body.description,
    //     createdAt: new Date(),
    //     owner: {
    //       connect: { id: 1 } // Ensures Prisma maps the relation properly
    //     },

    //     // ✅ Handling links relation correctly
    //     links: body.linksId
    //       ? { connect: { id: body.linksId } } // Connect to existing Links
    //       : {
    //           create: {
    //             telegram: body.links?.telegram,
    //             x: body.links?.x,
    //             discord: body.links?.discord,
    //             website: body.links?.website,
    //           },
    //         },
    //   },
    // });

    return NextResponse.json({
      success: true,
      message: "Project uploaded successfully!",
      project: newProject,
    });
  } catch (error) {
    console.error("Error uploading project:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
