export const userChangePassword = async (payload) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return Promise.reject(result);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
