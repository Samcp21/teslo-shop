import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let retries = 0;
const maxRetries = 3;
const interval = 60000;

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connection successful at " + new Date().toISOString());
    retries = 0;
  } catch (error) {
    console.error("Connection failed at " + new Date().toISOString(), error);
    await handleConnectionError();
  }
};

const handleConnectionError = async () => {
  if (retries < maxRetries) {
    retries += 1;
    console.log(
      `Reconnection attempt ${retries} failed at ` + new Date().toISOString()
    );
    setTimeout(connectToDatabase, 30000);
  } else {
    console.error(
      "Persistent database connection failure at " + new Date().toISOString()
    );
  }
};

const monitorDatabase = () => {
  setInterval(connectToDatabase, interval);
};

export async function GET(request: Request) {
  console.log("handler called");
  if (request.method === "GET") {
    monitorDatabase();
    return new Response(
      JSON.stringify({ message: "Database monitoring started" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
