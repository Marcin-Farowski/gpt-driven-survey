import { NextRequest } from "next/server";
import dbConnect from "@/lib/connect-db";
import Question from "@/models/Question";

export async function GET() {
  await dbConnect();
  const questions = await Question.find({});
  return new Response(JSON.stringify(questions), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const question = await Question.create(data);
  return new Response(JSON.stringify(question), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
