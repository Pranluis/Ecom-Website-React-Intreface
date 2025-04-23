import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Updated CSS file
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const API_URL = "http://localhost:5201/api/Product";
const BASE_URL = "http://localhost:5201/api/Product";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productImgURL: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      alert("Error fetching products: " + (error.response?.data?.message || error.message));
    }
  };

  // Add a new product (POST) using query parameters
  const addProduct = async () => {
    try {
      const addUrl = `${BASE_URL}?productId=${formData.productId}&productName=${formData.productName}&productDescription=${formData.productDescription}&productPrice=${formData.productPrice}&productCategory=${formData.productCategory}&productImgURL=${formData.productImgURL}`;
      console.log("Adding product with URL:", addUrl);
      await axios.post(addUrl, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
      resetForm();
    } catch (error) {
      alert("Error adding product: " + (error.response?.data?.message || error.message));
    }
  };

  // Update an existing product (PUT) using query parameters
  const updateProduct = async (id) => {
    try {
      const updateUrl = `${BASE_URL}/${id}?productId=${formData.productId}&productName=${formData.productName}&productDescription=${formData.productDescription}&productPrice=${formData.productPrice}&productCategory=${formData.productCategory}&productImgURL=${formData.productImgURL}`;
      console.log("Updating product with URL:", updateUrl);
      console.log("Form data:", formData);

      await axios.put(updateUrl, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
      resetForm();
      setIsEditing(false);
    } catch (error) {
      alert("Error updating product: " + (error.response?.data?.message || error.message));
    }
  };

  // Delete a product (DELETE)
  const deleteProduct = async (id) => {
    try {
      const deleteUrl = `${BASE_URL}/${id}`;
      console.log("Deleting product with URL:", deleteUrl);

      await axios.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      alert("Error deleting product: " + (error.response?.data?.message || error.message));
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      productId: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productCategory: "",
      productImgURL: ""
    });
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
    <AdminNavbar/>
    <div className="product-management-container">
      <h2>Product Management</h2>

      {/* Add or Update Product Form */}
      <form
        className="product-management-form"
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? updateProduct(formData.productId) : addProduct();
        }}
      >
        <h3>{isEditing ? "Update Product" : "Add Product"}</h3>
        <div className="product-management-form-group">
          <label>Product ID:</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="product-management-form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="product-management-form-group">
          <label>Product Description:</label>
          <input
            type="text"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="product-management-form-group">
          <label>Product Price:</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="product-management-form-group">
          <label>Product Category:</label>
          <input
            type="text"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="product-management-form-group">
          <label>Product Image URL:</label>
          <input
            type="text"
            name="productImgURL"
            value={formData.productImgURL}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="product-management-btn product-management-btn-primary">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        <button type="button" className="product-management-btn product-management-btn-secondary" onClick={resetForm}>
          Reset
        </button>
      </form>

      <table className="product-management-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productPrice}</td>
              <td>{product.productCategory}</td>
              <td>
                <button className="product-management-btn product-management-btn-edit" onClick={() => {
                  setFormData(product);
                  setIsEditing(true);
                }}>Edit</button>
                <button className="product-management-btn product-management-btn-delete" onClick={() => deleteProduct(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ProductManagement;
