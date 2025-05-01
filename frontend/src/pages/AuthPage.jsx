import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const { data } = await axios.post(url, formData); // data.token

      login(data.token); // use login from context

      // decode to get role (or grab from context after login)
      const { role } = JSON.parse(atob(data.token.split('.')[1]));

      if (role === "admin") navigate("/admin");
      else if (role === "agent") navigate("/agent");
      else navigate("/user");

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold">{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-600 cursor-pointer ml-1">
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
