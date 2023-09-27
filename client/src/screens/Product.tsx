import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import gfg from '../assets/gfg.jpg'
// import './Product.css'; // Import your custom CSS file for styling
import { Routes, Route, useNavigate } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product: any) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };


    useEffect(() => {
        fetch('https://dummyjson.com/products/')
            .then((response) => response.json())
            .then((data) => {
                console.log("Product Data--->", data.products.map((item: any) => item));
                setProducts(data.products); // Update state with the products array
            });
    }, []);

    const addToCart = (product: any) => {
        const updatedCart: any = [...cart, product];
        setCart(updatedCart);
        calculateCartTotal(updatedCart);
    };

    // Calculate the total price of the items in the cart
    const calculateCartTotal = (cartItems: any) => {
        const total = cartItems.reduce((acc: any, item: any) => acc + item.price, 0);
        setCartTotal(total);
    };
    const navigateToCart = () => {
        console.log("Pressed")
    }



    return (
        // JSX content here
        <div className="App" style={{ flex: 1 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                <div className="cart-icon" style={{ marginLeft: 20 }}>
                    <button onClick={() => navigateToCart()} >
                        <span>Cart Total: ${cartTotal.toFixed(2)}</span>
                    </button>
                </div>
                <h1>Shopping Cart</h1>
                <img
                    // src={item.thumbnail}
                    onClick={() => navigate('/HomePage')}

                    src={gfg}
                    style={{ height: '50px', width: '50px', borderRadius: 25 }}
                />
            </header>




            <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product: any) => (
                    <div
                        className="product-item"
                        key={product.id}
                        style={{
                            // backgroundColor: 'red',
                            width: '25%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}
                        onClick={() => openModal(product)} // Open modal on click
                    >
                        <h2>{product.name}</h2>
                        <div style={{ borderRadius: 10, borderWidth: 5, borderColor: 'red' }}>
                            <img
                                src={product.thumbnail}
                                alt="car"
                                style={{ height: '150px', width: '150px', borderRadius: 10, borderWidth: 10 }}
                            />
                        </div>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button
                            onClick={() => addToCart(product)}
                            style={{
                                // backgroundColor: 'blue', // Customize button color
                                color: 'blue', // Text color
                                border: 'none',
                                padding: '10px 20px',
                                cursor: 'pointer',
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>


            {/* {selectedProduct && (
                <ProductDetail product={selectedProduct} closeModal={closeModal} />
            )} */}

            <div className="cart-items">
                <h2>Cart Items</h2>
                <ul>
                    {cart.map((item: any, index) => (
                        // <li style={{ backgroundColor: 'red' , color: 'black' }} key={index}>{item.name}</li>
                        // <text>{item.name}</text>
                        <div
                            className="product-item"
                            key={item.id}
                            style={{
                                // backgroundColor: 'red',
                                width: '25%',
                                boxSizing: 'border-box',
                                padding: '10px',
                                marginBottom: '20px',
                                textAlign: 'center',
                            }}
                        // Open modal on click
                        >
                            <img
                                src={item.thumbnail}
                                alt="car"
                                style={{ height: '80px', width: '80px', borderRadius: 10 }}
                            />
                            <h4>{item.title}</h4>



                            {/* <p>Price: ${product.price.toFixed(2)}</p>
                            <button
                                onClick={() => addToCart(product)}
                                style={{
                                    // backgroundColor: 'blue', // Customize button color
                                    color: 'blue', // Text color
                                    border: 'none',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Add to Cart
                            </button> */}
                        </div>
                    ))}
                    <div className="cart-icon" style={{ marginRight: 40 }}>
                        <button onClick={() => navigateToCart()}>
                            <span>Cart Total: ${cartTotal.toFixed(2)}</span>
                        </button>
                    </div>
                </ul>
            </div>
        </div>

    );
}

export default Product;
