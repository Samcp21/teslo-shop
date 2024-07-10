import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST() {
  const currentTime = new Date().toLocaleTimeString();
  try {
    await prisma.$connect();
    return NextResponse.json(
      { message: `Connected to database at ${currentTime}.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Database connection error at ${currentTime}: ${error}`,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
