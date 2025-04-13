import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo / Brand Info */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">DaruAdda</h2>
          <p className="text-sm">
            Your go-to online liquor store. Enjoy fast delivery, best prices, and the finest collection.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-2" /> 
              Imadole, Kathmandu
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" /> 
              +9779890808908
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> 
              contact@darupasal.com.np
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-white font-semibold mb-3">Opening Hours</h3>
          <ul className="text-sm space-y-2">
            <li>Saturday – Sunday</li>
            <li>6:00 AM – 01:00 AM</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} DaruPasal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
