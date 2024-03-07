import { instance } from "./instance";

export const login = async (username, password) => {
  try {
    const response = await instance.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
};

export const register = async (
  username,
  password,
  // firstName,
  // lastName,
) => {
  try {
    const response = await instance.post("/register", {
      username,
      password,
      // firstName,
      // lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await instance.get("/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const insertProducts = async (productData) => {
  try {
    const response = await instance.post("/create", productData);
    console.log('resposta do post product', response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteProducts = async (productId) => {
  try {
    const response = await instance.delete(`/id/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await instance.put(`/id/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}