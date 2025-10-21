import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/properties";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getProperties = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    toast.error("Unable to fetch properties. Check server!");
    throw error;
  }
};

export const addProperty = async (property) => {
  try {
    const response = await api.post("/", property);
    toast.success("Property added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add property. Check server!");
    throw error;
  }
};
