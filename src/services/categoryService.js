const API_URL = "https://my-json-server.typicode.com/MostafaKMilly/demo";


export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create category: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
