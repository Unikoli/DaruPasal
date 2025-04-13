import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div className="bg-white text-gray-800 px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-red-700">About Daru Pasal</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Online Alcohol Delivery in Kathmandu</h2>
        <p className="text-gray-700 leading-relaxed">
          Daru Pasal is an online liquor ordering and delivery service where you can order alcohol from nearby stores.
          Simply install our mobile app or visit our website to start exploring and ordering. We’ve partnered with
          multiple retail outlets across Kathmandu to make sure your favorite drinks are just a tap away.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Unlimited Alcohol Brands</h3>
          <p>
            Imagine craving a specific brand of alcohol and not being able to find it! That’s frustrating — but not with
            Daru Pasal. We ensure a wide selection of alcohol is always available to satisfy your needs.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-600 mb-2">No Limited Store Hours</h3>
          <p>
            Your busy schedule shouldn’t stop you from enjoying your favorite drinks. Daru Pasal lets you skip the store
            visit and order online anytime, saving you both time and effort.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Offers and Discounts</h3>
          <p>
            With numerous sellers, you can compare prices and find the best deal. We also frequently provide amazing
            discounts because we truly value our customers.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-600 mb-2">No Crowds or Queues</h3>
          <p>
            Avoid the crowd and long queues at liquor stores — especially during peak hours and festivals. With Daru
            Adda, shop from your mobile or computer and get access to a wide range of liquor brands instantly.
          </p>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;
