"use client";
import AdminCategoriesArea from "@/components/dashboard/admin/categories/AdminCategoriesArea";
import AdminCategoriesHeader from "@/components/dashboard/admin/categories/AdminCategoriesHeader";
import categoriesNew from "@/components/data/categoriesNew";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";
import { FiTrash, FiEdit, FiPlus, FiSearch } from "react-icons/fi";

export default function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState();
  const { data: categories, isLoading, error } = useCategories();
  console.log(categories?.data);

  // ✅ Search Function
  const filteredCategories = categories?.data.filter((cat) =>
    cat.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Add New Category

  // ✅ Delete Category

  if (error) {
    console.log("Error Fetching Categories", error);
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Categories
      </h1>

      {/* 🔍 Search & Add New */}
      <AdminCategoriesHeader
        query={query}
        setQuery={setQuery}
        title={title}
        setTitle={setTitle}
      />

      {/* 🏆 Category Cards */}
      <AdminCategoriesArea filteredCategories={filteredCategories} />
    </div>
  );
}
