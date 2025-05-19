
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import config from "../config";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const token = localStorage.getItem("token");


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (token) {
      setSuccess("ALREADY LOGGED IN! Please logout to continue.");
      
      setLoading(false);
      // Clear the message after 1 second
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    
      return;
    }
    try {
      const response = await fetch(`${config.API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // body: JSON.stringify({...formData, recaptcha_token: recaptchaToken}),
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          recaptcha_token: recaptchaToken,  // Send the recaptcha token
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccess("Login successful!");
        toast.success('logged in!')
        localStorage.setItem("token", data.token); // store token if needed
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem('role',data.role);


        setTimeout(() => {
            if (data.user.role === "admin") {
              window.location.href = "/admin/dashboard"; // refreshes the page too
            } else {
              window.location.href = "/"; // for normal users
            }
          }, 1000);
        
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-yellow-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-4 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-red-600">Login to Your Account</h2>

        {loading && (
          <p className="text-blue-500 text-sm text-center animate-pulse">Logging in...</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm text-center animate-bounce">
            {success}
          </p>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
