"use client";

import { useCreateUser } from "@/libs/react-query/mutations/useCreateUser";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function AddUserModal({ onClose, onFetch }) {
  const { getToken } = useAuth();
  const { mutateAsync, isPending } = useCreateUser();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const userPayload = {
      firstName: formData.fname,
      lastName: formData.lname,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      await mutateAsync({ user: userPayload, token });
      resetForm();
      onFetch();
      onClose();
    } catch (err) {
      console.log("Error creating user", err.message);
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 px-4">
      <div className="bg-white w-full max-w-lg rounded shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fname" className="block text-sm font-medium">
                First Name
              </label>
              <input
                ref={firstInputRef}
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="lname" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="user@example.com"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="user">User</option>
              <option value="sponsor">Sponsor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                isPending
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
