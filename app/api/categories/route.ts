import { NextRequest } from "next/server";
import dbConnect from "@/lib/connect-db";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({});
  return new Response(JSON.stringify(categories), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const category = await Category.create(data);
  return new Response(JSON.stringify(category), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
