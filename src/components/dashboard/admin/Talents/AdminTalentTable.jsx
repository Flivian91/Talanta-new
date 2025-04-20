import { useApproveTalent } from "@/hooks/useApproveTalent";
import { useDeleteTalent } from "@/hooks/useDeleteTalent";
import { useRejectTalent } from "@/hooks/useRejectTalent";
import { useAuth } from "@clerk/nextjs";
import { React } from "react";
import { FaEdit } from "react-icons/fa";
import { FiCheck, FiDelete, FiX } from "react-icons/fi";

function AdminTalentTable({ displayedTalents }) {
  const { getToken } = useAuth();
  const { mutate: approveTalent, isPending: approvingTalent } =
    useApproveTalent();
  const { mutate: rejectTalent, isPending: rejectingTalent } =
    useRejectTalent();
  const { mutate: deleteTalent, isPending: deletingTalent } = useDeleteTalent();
  const handleApprove = async (id) => {
    const token = await getToken();

    approveTalent({ id, token });
  };

  const handleReject = async (id) => {
    const token = await getToken();

    rejectTalent({ id, token });
  };
  const handleDelete = async (id) => {
    const token = await getToken();

    deleteTalent({ id, token });
  };
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded">
      <table className="w-full min-w-[700px] border-collapse ">
        <thead className="bg-secondary text-white w-full">
          <tr className="grid grid-cols-[20px_2fr_4fr_0.5fr_3fr] text-base tracking-wide gap-3 w-full py-1 px-2">
            <th></th>
            <th className=" text-left">Title</th>
            <th className=" text-left">User</th>
            <th className=" text-left">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        {/* <AdminTalentModal/> */}
        <tbody className="flex flex-col">
          {displayedTalents?.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-600">
                No talents found.
              </td>
            </tr>
          ) : (
            displayedTalents.map((talent, i) => (
              <tr
                key={talent._id}
                className="border-b hover:bg-gray-100 transition py-2 grid grid-cols-[20px_2fr_4fr_0.5fr_3fr] gap-3 w-full items-center px-2"
              >
                <td className="font-mono">{i + 1 + "."}</td>
                <td className="truncate">{talent.title}</td>
                <td className="truncate">{talent.description}</td>

                <td className="">
                  {talent.approved ? (
                    <span className="text-green-600 px-2 py-1 bg-green-100/60 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-red-500 px-2 py-1 rounded bg-red-100/60 font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className=" grid grid-cols-4 items-center place-self-end justify-center w-72">
                  {!talent.approved ? (
                    <button
                      disabled={approvingTalent}
                      onClick={() => handleApprove(talent._id)}
                      className="text-green-600 hover:bg-green-100 px-3 py-2 flex items-center justify-center rounded-md transition disabled:cursor-not-allowed"
                    >
                      <FiCheck size={18} />
                    </button>
                  ) : (
                    <button
                      disabled={rejectingTalent}
                      onClick={() => handleReject(talent._id)}
                      className="text-red-600 hover:bg-red-100 px-3 py-2 flex items-center justify-center rounded-md transition disabled:cursor-not-allowed"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => rejectTalent(talent._id)}
                    className="text-green-600 hover:bg-green-100 px-3 py-2 flex items-center justify-center rounded-md transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    disabled={deletingTalent}
                    onClick={() => handleDelete(talent._id)}
                    className="text-red-600 hover:bg-red-100 px-3 py-2 flex items-center justify-center rounded-md transition disabled:cursor-not-allowed"
                  >
                    <FiDelete size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTalentTable;
