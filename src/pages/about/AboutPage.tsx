import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { addProduct, removeProduct, updateProduct } from "../../store/test";

const AboutPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.product); // Get products from state
  const dispatch = useDispatch<AppDispatch>();

  // Local state for adding/updating products
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (editingId !== null) {
      // Update product
      dispatch(
        updateProduct({ id: editingId, name: productName, price: productPrice })
      );
      setEditingId(null); // Clear editing state
    } else {
      // Add product
      const newProduct = {
        id: Date.now(), // Unique ID
        name: productName,
        price: productPrice,
      };
      dispatch(addProduct(newProduct));
    }
    setProductName("");
    setProductPrice(0);
  };

  const handleEdit = (product: { id: number; name: string; price: number }) => {
    setEditingId(product.id);
    setProductName(product.name);
    setProductPrice(product.price);
  };
  console.log("on runing");
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(removeProduct(product.id))}>
              Remove
            </button>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(Number(e.target.value))}
      />
      <button onClick={handleAddOrUpdate}>
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
};

export default AboutPage;
