import { ReactElement } from "react";
import Link from "next/link";

export default function HomePage(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <h1 className="text-4xl font-bold text-zinc-50 mb-8">
        Welcome to the GPT Driven Survey Generator
      </h1>
      <div className="space-y-4">
        <Link href="/generate" passHref>
          <button className="px-6 py-3 mr-4 bg-zinc-50 text-zinc-950 rounded-md shadow hover:bg-zinc-300 transition-colors">
            Generate survey
          </button>
        </Link>
        <Link href="/add" passHref>
          <button className="px-6 py-3 bg-zinc-700 text-zinc-50 rounded-md shadow hover:bg-zinc-600 transition-colors ">
            Add category and/or subcategory
          </button>
        </Link>
      </div>
    </div>
  );
}
