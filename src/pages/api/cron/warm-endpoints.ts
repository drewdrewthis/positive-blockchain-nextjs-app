import { NextResponse } from "next/server";
import { config as configuration } from "@/configuration";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const endpoints = configuration.constants.warmableEndpoints;

  try {
    await Promise.all(endpoints.map(warmEndpoint));
    return new NextResponse("Warmed", {
      status: 200,
    });
  } catch (e) {
    return new NextResponse("Error", {
      status: 500,
    });
  }
}

async function warmEndpoint(endpoint: string) {
  console.log(`Warming ${endpoint}`);
  return fetch(endpoint);
}
