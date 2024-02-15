import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { category, subcategories, numQuestions } = data;

    const subcategoriesFirstPart =
      subcategories.length > 0
        ? ` covering the following subcategories: ${subcategories.join(", ")}.`
        : "";
    const subcategoriesSecondPart =
      subcategories.length > 0
        ? `, distributed across these subcategories`
        : "";
    const prompt = `Generate a survey on the topic '${category}'${subcategoriesFirstPart} The survey should consist of ${numQuestions} questions${subcategoriesSecondPart}.`;

    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

    return new Response(
      JSON.stringify({ survey: chatCompletion.choices[0].message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to generate survey",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
