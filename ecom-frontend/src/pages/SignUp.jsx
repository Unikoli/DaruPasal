import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";
import API_URL from "../config";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({...formData,
          recaptcha_token: recaptchaToken,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccess("User registered successfully!");
        setTimeout(() => navigate("/login"), 1000); // Redirect after 2s
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-red-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-4 animate-fade-in relative"
      >
        <h2 className="text-2xl font-bold text-center text-red-600">Create Account</h2>

        {/* Loading message */}
        {loading && (
          <p className="text-sm text-blue-500 text-center animate-pulse">Processing...</p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Success Message with Icon */}
        {success && (
          <div className="text-green-600 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-500 transform scale-100">
            <FiCheckCircle className="text-xl animate-bounce" />
            {success}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400"
          required
        />
         <div className="mb-4">
                    <ReCAPTCHA sitekey={config.RECAPTCHA_SITEKEY} onChange={(value) => setRecaptchaToken(value)} />
                </div>
        <button
          type="submit"
          className={`w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-300 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
