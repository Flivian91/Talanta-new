"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function AddUserModel({ onClose }) {
  const { getToken } = useAuth();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    createUser();
    // setFname(" ");
    // setLname("");
    // setEmail("");
    // setPassword("");
    // setRole("user");
  }
  async function createUser() {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email,
          password,
          role,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error("Failed to Create user");
      }
      toast.success("User Created successfully");
      onClose()
    } catch (error) {
      console.log("Error Creating User", error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:w-1/2 w-full lg:w-1/3  z-50">
      <div className="bg-white m-1 py-2 shadow border border-gray-400 rounded">
        <div className="flex items-center justify-between border-b border-gray-300 py-2 px-2">
          <h1 className="text-sm font-semibold tracking-wider text-gray-700">
            Create new user
          </h1>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-200">
            <FaTimes />
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 px-2 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="fname">FirstName</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                id="fname"
                required
                className="border rounded px-1 py-2 outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lname">LastName</label>
              <input
                type="text"
                id="lname"
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="border rounded px-1 py-2 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-1 py-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-1 py-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded px-1 py-2 outline-none"
            >
              <option value="user">User</option>
              <option value="sponsor">Sponsor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-2 py-3">
            <button className="border px-4 py-2 border-gray-300 rounded bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                loading ? " animate-pulse " : " "
              }bg-secondary px-4 py-2 text-white text-sm font-semibold tracking-wide rounded`}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModel;
