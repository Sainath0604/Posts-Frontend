import { useState } from "react";
import { Link } from "react-router-dom";
import { getServerUrl } from "../utility/getServerUrl";

function SignUp() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const urlregisterUser = new URL("/registerUser", getServerUrl());

  function registerUser(e) {
    e.preventDefault();

    if (!isValidEmail) {
      alert("Invalid email address");
      return;
    }

    console.log(fName, lName, email, password);
    const payload = {
      fName,
      lName,
      email,
      password,
    };
    console.log("This is payload", payload);
    fetch(urlregisterUser, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          console.log("User aleready exists");
        } else {
          alert("User Registered, Now you can proceed with login");
          console.log(data, "User Registered");
          if (data.status == "ok") {
            window.location.href = "./signIn";
          }
        }
      });
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex justify-center mt-10 h-80 p-5">
      <form onSubmit={registerUser} className="w-full max-w-sm">
        <div className="h-10 text-2xl text-center font-bold">
          <h1>User sign up</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fName"
            type="name"
            placeholder="Enter your First Name"
            value={fName}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lName"
            type="name"
            placeholder="Enter your Last Name"
            value={lName}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !isValidEmail ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange} // Use the handleEmailChange function for email input change
          />
          {!isValidEmail && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-[#176B87] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <div className="mt-10">
            Already have account?
            <Link
              to="/SignIn"
              className="text-[#00b0eb] hover:text-blue-700 ml-2 "
            >
              Log In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
