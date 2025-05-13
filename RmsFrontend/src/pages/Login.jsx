import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "123456") {
      alert("Autentificare reușită!");
      setError("");
    } else {
      setError("Email sau parolă incorectă.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Sign in</h2>
        <form onSubmit={handleLogin} className="space-y-2">
          <div>
            <label className="text-black block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="yamilAngura@yahoo.com"
              className="text-black w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-black block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className="text-black mb-4 w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className=" w-full bg-black hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Conectează-te
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
