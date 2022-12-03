import axios from "axios";

const BOX_ID = "d197a64e5a7eeb4a3c24";
const API_KEY = "d3f80f81-6910-4d0d-933c-a53eb7c53fc5";
const BASE_URL = `http://localhost:3001/box_${BOX_ID}`;

export const createAxiosInstance = () =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
      "x-api-key": API_KEY,
    },
  });
