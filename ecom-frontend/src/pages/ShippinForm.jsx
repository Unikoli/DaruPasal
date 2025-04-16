import React, { useEffect, useState } from 'react';

const ShippingForm = () => {
    const [cartItem, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        province: '',
        city: '',
        address: ''
    });

    const token = localStorage.getItem('token');

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fetch cart from API
    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                let totalQuantity = 0;
                data.forEach(item => {
                    totalQuantity += item.quantity;
                });

                setQuantity(totalQuantity);
                setCartItems(data);
                console.log('Cart Items:', data);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    // Submit shipping form (optional backend use)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://your-api-url/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log('Shipping Info Submitted:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle eSewa payment
//     const handleEsewaPayment = async () => {
//         try {
//             // Prepare the cart data to send
//             const cartPayload = cartItem.map(item => {
//                 // Log the product_id inside the map function
//                 console.log(item.product.id);  // Log product_id
//                 return {
//                     product_id: item.product.id,
//                     quantity: item.quantity
//                 };
//             });
//             console.log('quantity:',quantity)
// //    console.log(product_id);         

// console.log('token::',token);
//             const response = await fetch('http://localhost:8000/api/esewa/prepare', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     cart: cartPayload,
//                 }),
//             });

//             const result = await response.json();

//             if (result.success) {
//                 const form = document.createElement('form');
//                 form.method = 'POST';
//                 form.action = result.redirect_url;

//                 Object.entries(result.data).forEach(([key, value]) => {
//                     const input = document.createElement('input');
//                     input.type = 'hidden';
//                     input.name = key;
//                     input.value = value;
//                     form.appendChild(input);
//                 });

//                 document.body.appendChild(form);
//                 form.submit();
//             } else {
//                 console.error('Payment initialization failed:', result.message);
//                 alert('Failed to prepare payment.');
//             }
//         } catch (error) {
//             console.error('Payment Error:', error);
//             console.error('Error Details:', error.message); // More info about the error
//             alert('Error occurred while initiating payment.');
//         }
        
//     };

const handleEsewaPayment = async () => {
    try {
        // Prepare the cart data to send
        const cartPayload = cartItem.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity
        }));

        console.log("Sending payload to eSewa:", cartPayload); // Log the payload for debugging

        const response = await fetch('http://localhost:8000/api/esewa/prepare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cart: cartPayload }), // Send the payload
        });

        console.log(response);
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = result.redirect_url;

            Object.entries(result.data).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } else {
            console.error('Payment initialization failed:', result.message);
            alert('Failed to prepare payment.');
        }
    } catch (error) {
        // Log detailed error information
        console.error('Payment Error:', error);
        console.error('Error Details:', error.message);
        alert('Error occurred while initiating payment.');
    }
};

    useEffect(() => {
        fetchCart();
    }, []);

    // Calculate total cost
    const total = Array.isArray(cartItem)
        ? cartItem.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        )
        : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-semibold">Delivery Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="province"
                        placeholder="Province"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="For Example: House# 123, Street# 123, ABC Road"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                    Submit
                </button>
            </form>

            {/* Order Summary */}
            <div className="bg-gray-100 p-4 rounded space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="flex justify-between">
                    <span>Number of Items</span>
                    <span>{quantity}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-semibold text-orange-600">
                    <span>Total:</span>
                    <span>Rs. {total}</span>
                </div>

                <button
                    className="mt-6 w-full bg-red-700 text-white py-2 font-semibold"
                    onClick={handleEsewaPayment}
                >
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
};

export default ShippingForm;
