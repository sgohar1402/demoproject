import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Badge, Form } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import AddProduct from './AddProduct'; // Import the AddProduct component
import emailjs from 'emailjs-com';
import useAuth from '../useAuth';

const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a description for Product 1. It includes detailed information about the product features and benefits.',
    price: '$29.99',
    imageUrl: 'https://via.placeholder.com/300x200?text=Product+1'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a description for Product 2. It highlights the unique selling points and specifications of the product.',
    price: '$39.99',
    imageUrl: 'https://via.placeholder.com/300x200?text=Product+2'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a description for Product 3. It covers the key attributes and advantages of the product.',
    price: '$49.99',
    imageUrl: 'https://via.placeholder.com/300x200?text=Product+3'
  }
];

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(initialProducts);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("You can't proceed with checkout. First, add a product to the cart.");
      return;
    }

    if (!email || !name || !phone || !address) {
      toast.error("Please fill out all fields (Name, Email, Phone, Address).");
      return;
    }

    const productDetails = cart.map(p => `<li>${p.name} - ${p.price}</li>`).join('');
    const totalAmount = cart.reduce((total, product) => total + parseFloat(product.price.replace('$', '')), 0).toFixed(2);

    const templateParams = {
      to_email: email,
      to_name: name,
      phone,
      address,
      products: `<ul>${productDetails}</ul>`,
      total: `$${totalAmount}`,
    };

    emailjs.send('service_3kg16k2', 'template_oqzoxyh', templateParams, 'pH7zEVNOXEJXcANvg')
      .then(() => {
        toast.success(`Order placed successfully! Details sent to ${email}`);
        setShowCart(false);
        setCart([]);
        setEmail('');
        setName('');
        setPhone('');
        setAddress('');
      })
      .catch((error) => {
        toast.error("Failed to send order details. Please try again.");
        console.error(error);
      });
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { id: prevProducts.length + 1, ...product }]);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <div className="d-flex">
          <Button variant="light" onClick={() => setShowAddProduct(true)}>
            Add Product
          </Button>
          <div className="position-relative ms-3">
            <Button variant="light" onClick={handleShowCart}>
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-light">
              <img src={product.imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Modal for Add Product */}
      <AddProduct show={showAddProduct} handleClose={() => setShowAddProduct(false)} handleAdd={handleAddProduct} />

      {/* Modal for product details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="img-fluid mb-3" />
              <h5>{selectedProduct.name}</h5>
              <p>{selectedProduct.description}</p>
              <h6 className="text-muted">{selectedProduct.price}</h6>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={handleCloseCart} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty. You can't proceed with checkout. First, add a product to the cart.</p>
          ) : (
            <div>
              <ul className="list-group mb-3">
                {cart.map((product) => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{product.name}</h5>
                      <p>{product.price}</p>
                    </div>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="mt-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Products;
