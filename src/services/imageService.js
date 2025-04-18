const API_URL = "https://my-json-server.typicode.com/MostafaKMilly/demo";

export const fetchImages = async () => {
  try {
    const response = await fetch(`${API_URL}/images`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export const deleteImage = async (imageId) => {
  try {
    const response = await fetch(`${API_URL}/images/${imageId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const updateImage = async (imageId, imageData) => {
  try {
    const response = await fetch(`${API_URL}/images/${imageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update image: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
};

export const uploadImage = async (imageData) => {
  try {
    const response = await fetch(`${API_URL}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
