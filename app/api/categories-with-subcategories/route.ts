import { NextRequest } from "next/server";
import dbConnect from "@/lib/connect-db";
import Category from "@/models/Category";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const categoriesWithSubcategories = await Category.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "categoryIds",
          as: "subcategories",
        },
      },
    ]);

    return new Response(JSON.stringify(categoriesWithSubcategories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch categories with subcategories",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
