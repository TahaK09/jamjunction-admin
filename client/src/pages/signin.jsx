import React, { useState } from "react";
import Logo from "../assets/logo-jjl.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext.jsx";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const { success, error } = await signInUser(email, password);

    if (!success) {
      setError(error);
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Redirect after successful sign-in
    navigate("/");
  };
  return (
    <>
      <div className="h-screen w-full flex">
        <div
          className="hidden md:flex w-full bg-cover bg-center items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Replace with your image path
          }}
        >
          <div className="bg-black/30 w-full h-full flex items-center justify-start">
            <div className="max-w-xl px-6 pl-20 text-white flex flex-col justify-between h-full py-10">
              <img
                src={Logo}
                alt="Logo"
                className="mb-6 h-20 w-20 rounded-xl"
              />
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-snug">
                Join <span className="text-green-400">JamJunction</span> Core
                Team <br /> to get access to exclusive features:
              </h2>
              <ul className="flex flex-row gap-2 text-sm md:text-base ">
                <li>✔ Add Events</li>
                <li>✔ Verify Tickets</li>
                <li>✔ Manage Tickets</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-xl relative right-5 top-4 flex items-center justify-center md:absolute m-auto md:m-0 px-6">
          <div className="w-full max-w-md border rounded-2xl shadow-lg py-8 px-14 bg-white">
            <div className="flex flex-col items-center mb-6">
              <img src={Logo} alt="logo" className="h-10 mb-2" />
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome to JamJunction
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Sign in to continue via your email!
              </p>
            </div>

            {/* Input */}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Button */}
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-sm font-medium transition"
            >
              Continue
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <button className="w-full border flex items-center justify-center gap-3 py-3 rounded-lg hover:bg-gray-50 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5"
              />
              <span className="text-gray-700">
                Continue with Google (Coming Soon)
              </span>
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                terms of use
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
