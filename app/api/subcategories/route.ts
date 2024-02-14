import { NextRequest } from "next/server";
import dbConnect from "@/lib/connect-db";
import Subcategory from "@/models/Subcategory";

export async function GET() {
  await dbConnect();
  const subcategories = await Subcategory.find({});
  return new Response(JSON.stringify(subcategories), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const subcategory = await Subcategory.create(data);
  return new Response(JSON.stringify(subcategory), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
