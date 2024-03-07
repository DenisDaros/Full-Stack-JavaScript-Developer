import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/integration";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError(""); // Limpa mensagens de erro anteriores

      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      const user = await login(email, password);
      if (user) {
      // Navegue para a tela de produtos em caso de sucesso
      navigate("/products");
      } else {
      setError("Invalid user. Check your credentials..");
      }
    } catch (error) {
      setError("An error occurred when trying to log in.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-4 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <label className="block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />

          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            SingIn
          </button>
        </form>
        <div className="flex flex-row justify-end gap-2 mt-5">
          <p>Dont have a account?</p>
          <Link to='/register' className="text-blue-500 underline">SingUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;