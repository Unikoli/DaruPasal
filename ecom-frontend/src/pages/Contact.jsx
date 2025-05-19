import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FaMapMarkerAlt,
  FaFax,
  FaEnvelope,
  FaUser,
  FaRegEnvelope,
  FaRegCommentDots
} from 'react-icons/fa';
import config from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        if (data.errors) {
          Object.values(data.errors).forEach(errArr => {
            toast.error(errArr[0]);
          });
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="px-4 md:px-20 py-8">
      {/* Header */}
      <div className="bg-gray-50 py-6 px-4 mb-10">
        <h1 className="text-2xl font-bold">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Shop Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Our Shop</h2>
          <p className="text-gray-700 mb-4">
            We have 3 outlets inside valley, at Jhamsikhel, Imadole and Gwarko
          </p>
          <hr className="mb-4" />

          <div className="flex items-start mb-3">
            <FaMapMarkerAlt className="text-red-600 mt-1 mr-3" />
            <p>Jhamsikhel Marga, Opposite to Ganesh Mandir</p>
          </div>

          <div className="flex items-start mb-3">
            <FaFax className="text-red-600 mt-1 mr-3" />
            <p>+9779800039393</p>
          </div>

          <div className="flex items-start mb-3">
            <FaEnvelope className="text-red-600 mt-1 mr-3" />
            <p>contact@DaruPasal.com.np</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold mb-1">Opening Time</h2>
          <p className="text-gray-700">Saturday – Sunday: 6.00 AM – 01.00 AM</p>
        </div>

        {/* Right - Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Get In Touch</h2>
          <p className="text-gray-700 mb-6">
            Your email address will not be published. Required fields are marked (<span className="text-red-600">*</span>)
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border rounded px-3 py-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaRegEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start border rounded px-3 py-2">
              <FaRegCommentDots className="text-gray-400 mr-3 mt-1" />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full outline-none resize-none h-32"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 float-right"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
