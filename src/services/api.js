import axios from "axios";

const api = axios.create({

baseURL: import.meta.env.VITE_API_URL,

});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {

        const res = await axios.post(
           `${import.meta.env.VITE_API_URL}/refresh`,
          {
            refreshToken,
          }
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem(
          "token",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.clear();

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export async function logout() {
  try {

    await api.post("/logout");

  } catch (err) {

    console.error("Logout error:", err);

  } finally {

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.location.href = "/";

  }
}

export default api;
