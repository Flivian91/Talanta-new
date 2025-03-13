"use client";
import categoriesNew from "@/components/data/categoriesNew";
import { useState } from "react";
import { FiTrash, FiEdit, FiPlus, FiSearch } from "react-icons/fi";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(categoriesNew);
  const [query, setQuery] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", color: "#000000", icon: "📌" });

  // ✅ Search Function
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Add New Category
  function addCategory() {
    if (!newCategory.name.trim()) return;
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setNewCategory({ name: "", color: "#000000", icon: "📌" });
  }

  // ✅ Delete Category
  function deleteCategory(id) {
    setCategories(categories.filter((cat) => cat.id !== id));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Categories</h1>

      {/* 🔍 Search & Add New */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/3">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            className="w-10 h-10 border rounded-md"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <FiPlus />
          </button>
        </div>
      </div>

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
                  onClick={() => deleteCategory(category.id)}
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
