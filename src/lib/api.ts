// lib/api.ts
import axios from "axios";

// Adjust the base URL as per your API setup
const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:8080/api/v1";

export async function fetchEventByID(slug: string) {
  try {
    const response = await axios.get(`${apiBaseUrl}/events/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    return null;
  }
}
