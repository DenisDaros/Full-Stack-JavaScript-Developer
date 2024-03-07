// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';

import AddProduct from '../components/Add.Products';

import { getProducts, deleteProducts, updateProduct } from '../api/integration';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData.rows);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    // Atualiza os produtos filtrados sempre que o estado de pesquisa ou marca selecionada muda
    const updatedFilteredProducts = products.filter((product) => {
      const matchName =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBrand =
        selectedBrand === '' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
      return matchName && matchBrand;
    });
    setFilteredProducts(updatedFilteredProducts);
  }, [products, searchTerm, selectedBrand]);

  const onEdit = async (product) => {
  try {
    const newName = window.prompt("Enter the new name:", product.name);
    const newBrand = window.prompt("Enter the new brand:", product.brand);
    const newModel = window.prompt("Enter the new model:", product.model);
    const newPrice = window.prompt("Enter the new price:", product.price);
    const newColor = window.prompt("Enter the new color:", product.color);

    // Verifique se o usuário cancelou a edição
    if (
      newName === null ||
      newBrand === null ||
      newModel === null ||
      newPrice === null ||
      newColor === null ||
      newName.trim() === "" ||
      newBrand.trim() === "" ||
      newModel.trim() === "" ||
      newPrice.trim() === "" ||
      newColor.trim() === ""
    ) {
      alert("All fields must be filled in. Edit canceled.");
      return;
    }

    // Chame a função de atualização aqui
    const updatedData = { name: newName, brand: newBrand, model: newModel, price: newPrice, color: newColor };
    await updateProduct(product.id, updatedData);

    // Atualize a lista de produtos após a edição
    const updatedProducts = products.map(p => (p.id === product.id ? { ...p, ...updatedData } : p));
    setProducts(updatedProducts);

    console.log('Product edited successfully!');
  } catch (error) {
    console.error("Error editing product:", error);
  }
};

  const onDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProducts(productId);
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        console.log('Product deleted successfully!');
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };



  return (
    <div className="container mx-auto mt-8">
       <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name or brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="">All Brands</option>
          {[...new Set(products.map((product) => product.brand.toLowerCase()))].map((brand) => (
            <option key={brand} value={brand}>
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </option>
          ))}
        </select>
      </div>
       <div className="grid grid-cols-2 gap-4">
       {filteredProducts.map((product) => (
          <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            {/* Coloque a imagem aqui se necessário */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 line-clamp-1">{product.name}</div>
              <p className="text-gray-700 text-base">Brand: {product.brand}</p>
              <p className="text-gray-700 text-base">Model: {product.model}</p>
              <p className="text-gray-700 text-base">Price: R${parseFloat(product.price).toFixed(2)}</p>
              <p className="text-gray-700 text-base">Color: {product.color}</p>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <button
                onClick={() => onEdit(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddProduct setProducts={setProducts} />
    </div>
  );
};

export default Products;