"use client";
import { useDeleteCategory } from "@/libs/react-query/mutations/useDeleteCategory";
import { useUpdateCategory } from "@/libs/react-query/mutations/useUpdateCategory";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";

function AdminCategoriesArea({ filteredCategories }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const { getToken } = useAuth();
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  function handleEdit(id, currentTitle) {
    setEditingId(id);
    setEditedTitle(currentTitle);
  }

  function handleCancel() {
    setEditingId(null);
    setEditedTitle("");
  }
  const handleUpdateTitle = async (id) => {
    const token = await getToken();
    try {
      await updateCategory({
        token,
        payload: {
          title: editedTitle,
        },
        talentID: id,
      });
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  function handleSave(id) {
    console.log("Saving category:", id, "with title:", editedTitle);
    // ✅ TODO: Trigger update API or mutation here
    handleUpdateTitle(id);
    setEditingId(null);
    setEditedTitle("");
  }
  async function handleDelete(id) {
    const token = await getToken();
    await deleteCategory({ categoryID: id, token });
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
      {filteredCategories?.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        filteredCategories.map((category, i) => (
          <div
            key={category._id}
            className="flex justify-between items-center p-4 rounded shadow-md text-black bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg font-mono">{i + 1}.</span>

              {editingId === category._id ? (
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 font-mono outline-none"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span className="font-semibold text-base tracking-wide">
                  {category.title}
                </span>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              {editingId === category._id ? (
                <>
                  <button
                    onClick={() => handleSave(category._id)}
                    className="bg-green-500 p-2 rounded-md text-white hover:bg-green-600"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 p-2 rounded-md text-black hover:bg-gray-400"
                  >
                    <FiX />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(category._id, category.title)}
                    className="bg-white p-2 rounded-md text-gray-800 hover:bg-gray-200"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminCategoriesArea;
