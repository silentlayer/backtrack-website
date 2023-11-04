import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        username: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          //TODO
          console.log(res);
          const jwtToken = res.data.accessToken;
          setLoggedIn(true);
          sessionStorage.setItem("accessToken", jwtToken);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const access_token = sessionStorage.getItem("accessToken");
    if (access_token != null) {
      setLoggedIn(true);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-black">
      <div className="m-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-2 rounded">
        {loggedIn ? (
          <div className="bg-black w-auto h-auto rounded shadow-md">
            <button onClick={logout} className="p-4 text-white text-3xl">
              {" "}
              Log out
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-black p-10 rounded shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Welcome Back!
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className={`border rounded w-full py-2 px-3 ${
                  emailInUse ? "border-red-500 border-2" : "border-gray-300"
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailInUse(false);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
