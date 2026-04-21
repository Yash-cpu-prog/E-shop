// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://e-shop-dvh2.onrender.com/api", // ✅ FIXED for deploy
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;

