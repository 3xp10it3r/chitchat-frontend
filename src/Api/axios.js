import axios from "axios";

const instance = axios.create({
  baseURL: "https://chitchat-vrwv.onrender.com",
});

export default instance;
