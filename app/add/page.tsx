"use client";

import { ReactElement, useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
}

export default function AddPage(): ReactElement {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0]._id); // Pre-select the first category by default
      }
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category.");
      }

      setCategoryName(""); // Reset form
      fetchCategories(); // Re-fetch categories to update the list
      setError(""); // Reset any previous error messages
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subcategoryName,
          categoryIds: [selectedCategory],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subcategory.");
      }

      setSubcategoryName(""); // Reset form
      setError(""); // Reset any previous error messages
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 p-4">
      <h1 className="text-3xl font-bold mb-8">
        Add Categories and Subcategories
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex  mb-12 divide-x divide-zinc-600">
        <form onSubmit={handleAddCategory} className="flex flex-col gap-4 pr-6">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="input bg-zinc-800 text-zinc-50 placeholder-zinc-400 px-6 py-3 rounded-md shadow hover:bg-zinc-600 transition-colors text-zinc-50"
            required
          />
          <button
            type="submit"
            className="btn px-6 py-3 bg-zinc-50 text-zinc-950 rounded-md shadow hover:bg-zinc-300 transition-colors"
          >
            Add Category
          </button>
        </form>
        <form
          onSubmit={handleAddSubcategory}
          className="flex flex-col gap-4 mt-0 pl-6"
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select bg-zinc-800 text-zinc-50 placeholder-zinc-400 px-6 py-3 rounded-md shadow hover:bg-zinc-600 transition-colors text-zinc-50"
            required
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Subcategory Name"
            className="input bg-zinc-800 text-zinc-50 placeholder-zinc-400 px-6 py-3 rounded-md shadow hover:bg-zinc-600 transition-colors text-zinc-50"
            required
          />
          <button
            type="submit"
            className="btn px-6 py-3 bg-zinc-50 text-zinc-950 rounded-md shadow hover:bg-zinc-300 transition-colors"
          >
            Add Subcategory
          </button>
        </form>
      </div>
      <Link href="/" passHref>
        <p className="text-blue-400 hover:text-blue-300">Back to Home</p>
      </Link>
    </div>
  );
}
