import { NextRequest } from "next/server";
import dbConnect from "@/lib/connect-db";
import Survey from "@/models/Survey";

export async function GET() {
  await dbConnect();
  const surveys = await Survey.find({});
  return new Response(JSON.stringify(surveys), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { subcategories, numQuestions } = await req.json();
  const survey = await Survey.create({ subcategories, numQuestions });
  return new Response(JSON.stringify(survey), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
