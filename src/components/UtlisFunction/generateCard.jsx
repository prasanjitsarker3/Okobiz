export const postCardData = async (payload) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/card/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Post successful:", result);
      return result;
    } else {
      console.log("Post failed:", result);
      return Promise.reject(result);
    }
  } catch (error) {
    console.error("Error during Login:", error);
    return Promise.reject(error);
  }
};
