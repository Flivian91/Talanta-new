"use client";
import AdminCategoriesHeader from "@/components/dashboard/admin/categories/AdminCategoriesHeader";
import categoriesNew from "@/components/data/categoriesNew";
import { useState } from "react";
import { FiTrash, FiEdit, FiPlus, FiSearch } from "react-icons/fi";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(categoriesNew);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState();

  // ✅ Search Function
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Add New Category

  // ✅ Delete Category

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-600">No categories found.</p>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center p-4 rounded-lg shadow-md text-white"
              style={{ backgroundColor: category.color }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold text-lg">{category.name}</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-white p-2 rounded-md text-gray-800 hover:bg-gray-200">
                  <FiEdit />
                </button>
                <button
                 
                  className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
