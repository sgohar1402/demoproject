import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = ({ show, handleClose, handleAdd }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.price) {
      toast.error("Please fill in all required fields.");
      return;
    }
    handleAdd(productData);
    setProductData({ name: '', description: '', price: '', imageUrl: '' });
    handleClose();
    toast.success("Product added successfully!");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription" className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter product description"
              value={productData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              placeholder="Enter product price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductImage" className="mt-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProduct;
