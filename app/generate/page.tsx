"use client";

import { ReactElement, useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface Category {
  _id: string;
  name: string;
  subcategories: { _id: string; name: string }[];
}

export default function GeneratePage(): ReactElement {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [survey, setSurvey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories-with-subcategories");
      const data = await response.json();
      setCategories(data);
      setSelectedCategory(data[0]._id);
    };

    fetchCategories();
  }, []);

  const handleGenerateSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: categories.find((cat) => cat._id === selectedCategory)
            ?.name,
          subcategories: selectedSubcategories,
          numQuestions,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate survey.");
      }
      const { survey: generatedSurvey } = await response.json();
      setSurvey(generatedSurvey);
    } catch (err) {
      console.error("Error generating survey:", err);
      setSurvey("An error occurred while generating the survey.");
    }
    setIsLoading(false);
  };

  const handleSubcategoryChange = (
    subcategoryId: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    } else {
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategoryId)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 p-4">
      <h1 className="text-3xl font-bold mb-8">Generate a Survey</h1>
      <form onSubmit={handleGenerateSurvey} className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="text-lg font-semibold mb-2">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 text-zinc-50 rounded px-6 py-3 mb-4"
            required
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="text-lg font-semibold mb-2">
            Select Subcategories:
          </legend>
          {categories
            .find((cat) => cat._id === selectedCategory)
            ?.subcategories.map((subcat) => (
              <div key={subcat._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={subcat._id}
                  name="subcategories"
                  value={subcat.name}
                  onChange={(e) =>
                    handleSubcategoryChange(subcat.name, e.target.checked)
                  }
                  className="checkbox bg-zinc-800"
                />
                <label htmlFor={subcat._id} className="ml-2">
                  {subcat.name}
                </label>
              </div>
            ))}
        </fieldset>

        <div className="flex flex-col my-8">
          <label htmlFor="numQuestions" className="text-lg font-semibold mb-2">
            Number of Questions:
          </label>
          <input
            type="number"
            id="numQuestions"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="bg-zinc-800 text-zinc-50 rounded px-6 py-3 mb-4"
            required
          />
        </div>

        <button
          type="submit"
          className="btn px-6 py-3 mb-6 bg-zinc-50 text-zinc-950 rounded-md shadow hover:bg-zinc-300 transition-colors w-full"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Survey"}
        </button>
      </form>

      {isLoading && <Spinner />}

      {survey && (
        <div className="mt-8 p-4 bg-zinc-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Generated Survey:</h2>
          <p className="whitespace-pre-wrap max-w-4xl">{survey}</p>
        </div>
      )}

      <Link href="/" passHref>
        <p className="text-blue-400 hover:text-blue-300 mt-6">Back to Home</p>
      </Link>
    </div>
  );
}
