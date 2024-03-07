import React, { useState } from "react";
import { insertProducts } from "../api/integration";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = async () => {
    try {
      setError(""); // Limpa mensagens de erro anteriores
  
      // Adicione aqui a lógica para cadastrar o produto
      if (!name || !brand || !model || !price) {
        setError("Please fill in all required fields.");
        return;
      }
  
      // Chama a função de cadastro de produtos no backend
      const response = await insertProducts({
        name,
        brand,
        model,
        price,
        color,
      });
  
      // Verifica se o cadastro foi bem-sucedido
      if (response && response.length > 0 && response[0].id) {
        setSuccessMessage("Product added successfully!");
        // Limpa os campos após o cadastro
        setName("");
        setBrand("");
        setModel("");
        setPrice("");
        setColor("");
  
        // Adiciona o novo produto à lista de produtos exibida na tela
        const newProduct = response[0];
        setProducts(prevProducts => [...prevProducts, newProduct]);
      } else {
        setError(
          response[0]?.message ||
            "An error occurred when trying to add the product."
        );
      }
    } catch (error) {
      setError("An error occurred when trying to add the product.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-4 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form>
          <label className="block mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <label className="block mb-2" htmlFor="brand">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <label className="block mb-2" htmlFor="model">
            Model:
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
           <label className="block mb-2" htmlFor="price">
            Price:
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <label className="block mb-2" htmlFor="color">
            Color:
          </label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;