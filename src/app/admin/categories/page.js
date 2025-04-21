"use client";
import AdminCategoriesArea from "@/components/dashboard/admin/categories/AdminCategoriesArea";
import AdminCategoriesHeader from "@/components/dashboard/admin/categories/AdminCategoriesHeader";
import AdminCategoriesSkeleton from "@/components/dashboard/admin/categories/AdminCategoriesSkeleton";
import categoriesNew from "@/components/data/categoriesNew";
import { useCategories } from "@/hooks/useCategories";
import { useCreateCategory } from "@/libs/react-query/mutations/useCreateCategory";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { FiTrash, FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState();
  const { getToken } = useAuth();
  const { data: categories, isLoading, error } = useCategories();
  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  // ✅ Search Function
  const filteredCategories = categories?.data.filter((cat) =>
    cat.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Add New Category
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title,
    };
    const token = await getToken();
    try {
      await createCategory({ category: payload, token });
      setTitle("");
    } catch (error) {
      console.error("Failed to create category", error.message);
      toast.error("Failed to create category");
    }
  }

  // ✅ Delete Category
  console.log(Array.from({ length: 8 }, (_, i) => i));

  if (error) {
    console.log("Error Fetching Categories", error);
  }
  const loding = true;
  if (isLoading) {
    return <AdminCategoriesSkeleton />;
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
        onSubmit={handleSubmit}
      />

      {/* 🏆 Category Cards */}
      <AdminCategoriesArea filteredCategories={filteredCategories} />
    </div>
  );
}
