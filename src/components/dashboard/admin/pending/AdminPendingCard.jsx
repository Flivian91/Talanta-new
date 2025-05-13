import NoData from "@/components/common/NoData";
import { formatedDate } from "@/helpers/formatedDate";
import React from "react";
import { FiEye } from "react-icons/fi";

function AdminPendingCard({ filteredTalents, openModal }) {
  return (
    <div>
      {filteredTalents?.length === 0 ? (
        <NoData message={"Pending Approvals"} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         { filteredTalents.map((talent) => (
          <div
            key={talent._id}
            className="bg-white shadow-lg rounded-lg px-2 py-4 flex flex-col"
          >
            {/* Thumbnail & Details */}
            <img
              src={talent.thumbnailUrl}
              alt={talent.title}
              className="rounded mb-3 w-full h-40 object-cover cursor-pointer"
              onClick={() => openModal(talent)}
            />
            <h2 className="text-lg font-semibold">{talent.title}</h2>
            <div className="text-gray-500">
              <ul className="flex items-center gap-2 marker:bg-yellow-500">
                {talent.categories.map((cat) => (
                  <li
                    li
                    key={cat}
                    className="text-blue-500 px-1 py-0.5 border rounded text-xs font-medium tracking-wide"
                  >
                    {cat.at(0).toUpperCase() + cat.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-400 text-sm">
              Submitted on {formatedDate(talent.createdAt)}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => openModal(talent)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex-1 mx-1 flex items-center gap-5 justify-center"
              >
                <FiEye />
                <span>Preview</span>
              </button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPendingCard;
