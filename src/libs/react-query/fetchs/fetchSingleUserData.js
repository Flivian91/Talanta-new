import { useQuery } from "@tanstack/react-query";

async function fetchUserData({ token }) {
  try {
    const token = getToken();
    const res = await fetch(`/api/users/${userID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to Get User");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user data", error.message);
  }
}

