import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../api/integration";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const handleRegister = async () => {
    try {
      setError(""); // Limpa mensagens de erro anteriores
  
      if (!email || !password || !confirmPassword ) {
        setError("Please fill in all fields.");
        return;
      }
  
      if (!emailRegex.test(email)) {
        setError("Invalid email format.");
        return;
      }
      if (!passwordRegex.test(password)) {
        setError(
          "Password must contain at least one number and be at least 6 characters long."
        );
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      // Chama a função de registro no backend
      const response = await register(email, password);
  
      // Verifica se o registro foi bem-sucedido
      if (Array.isArray(response) && response.length > 0) {
        setSuccessMessage("User registered successfully!");
        // Limpa os campos após o registro
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(
          response.message || "An error occurred when trying to register."
        );
      }
    } catch (error) {
      setError("An error occurred when trying to register.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-4 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">SignUp</h2>
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
          <label className="block mb-2" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          <button
            type="button"
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            SignUp
          </button>
        </form>
        <div className="flex flex-row justify-end gap-2 mt-5">
          <p>Already have a account?</p>
          <Link to="/" className="text-blue-500 underline">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;