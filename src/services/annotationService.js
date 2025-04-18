const API_URL = "https://my-json-server.typicode.com/MostafaKMilly/demo";

export const saveAnnotations = async (imageId, annotations) => {
  try {
    // Ensure annotations is an array
    const annotationsArray = Array.isArray(annotations)
      ? annotations
      : [annotations];

    const formattedAnnotations = annotationsArray.map((annotation) => ({
      id: annotation.id || Date.now().toString(),
      imageId: imageId,
      type: "rectangle",
      coordinates: annotation.coordinates || {
        x: Math.round(annotation.x || 0),
        y: Math.round(annotation.y || 0),
        width: Math.round(annotation.width || 0),
        height: Math.round(annotation.height || 0),
      },
      color: annotation.color || "blue",
    }));

    const response = await fetch(`${API_URL}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedAnnotations),
    });

    if (!response.ok) {
      throw new Error(`Failed to save annotations: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving annotations:", error);
    throw error;
  }
};

export const getAnnotations = async (imageId) => {
  try {
    const response = await fetch(`${API_URL}/annotations?imageId=${imageId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch annotations: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching annotations:", error);
    return [];
  }
};

export const deleteAnnotation = async (annotationId) => {
  try {
    const response = await fetch(`${API_URL}/annotations/${annotationId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete annotation: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting annotation:", error);
    throw error;
  }
};
