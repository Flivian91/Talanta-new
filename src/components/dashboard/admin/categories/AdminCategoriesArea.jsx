import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

function AdminCategoriesArea({ filteredCategories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredCategories?.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        filteredCategories?.map((category, i) => (
          <div
            key={category._id}
            className="flex justify-between items-center p-4 rounded shadow-md text-black bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono">{i + 1}.</span>
              <span className="font-semibold text-base tracking-wide">{category.title}</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-white p-2 rounded-md text-gray-800 hover:bg-gray-200">
                <FiEdit />
              </button>
              <button className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600">
                <FiTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminCategoriesArea;
