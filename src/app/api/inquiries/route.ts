import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inquiry = await prisma.businessInquiry.create({
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        type: body.type,
        message: body.message,
      },
    });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
