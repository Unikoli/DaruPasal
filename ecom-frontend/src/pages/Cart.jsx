
// export default Cart;
import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const navigate=useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [quantity,setQuantity]=useState();
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');

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
        console.log('Cart Items:', data);
        setCartItems(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };
  const clearCart=async ()=>{
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('cart cleared');
        setCartItems([]);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  }

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const applyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
  };

  const total = Array.isArray(cartItems)
    ? cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
    : 0;

  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="overflow-x-auto border">
        <table className="min-w-full text-center">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-2">Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  {item.product?.image_url && (
                    <img
                      src={`http://localhost:8000/${item.product.image_url}`}
                      alt={item.product.name}
                      className="h-32 mx-auto object-contain"
                    />
                  )}
                </td>
                <td>{item.product.name}</td>
                <td>Rs {item.product.price}</td>
                <td>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>Rs {item.product.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.product.id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coupon Section */}
      <div className="flex justify-between items-center my-6 flex-wrap gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border px-4 py-2"
          />
          <button
            onClick={applyCoupon}
            className="bg-red-700 text-white px-4 py-2 font-semibold"
          >
            APPLY COUPON
          </button>
        </div>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2"
        >
          Clear
        </button>
      </div>

      {/* Cart Totals */}
      <div className="max-w-md ml-auto border p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Cart totals</h2>
        <div className="flex justify-between">
          <span>Number of items </span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Subtotal</span>
          <span>Rs {total}</span>
        </div>
        <div className="flex justify-between font-bold text-red-600">
          <span>Total</span>
          <span>Rs {total}</span>
        </div>
        <button className="mt-6 w-full bg-red-700 text-white py-2 font-semibold"
        onClick={()=>navigate('/shipping-form')}
        >
          PROCEED TO CHECKOUT →
        </button>
      </div>
    </div>
    <Footer/>
    </>
    
   
  );
};

export default Cart;
