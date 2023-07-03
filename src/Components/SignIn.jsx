import { useState } from "react";
import { Link } from "react-router-dom";
import { getServerUrl } from "../utility/getServerUrl";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const serverUrl = getServerUrl();
  const urlLoginUser = new URL("/loginUser", serverUrl);

  function loginUser(e) {
    e.preventDefault();
    console.log(email, password);
    fetch(urlLoginUser, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "User logged-in");
        if (data.status == "ok") {
          alert("User successfully logged-in");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./userDetails";
        } else {
          alert("Invalid Credentials, please register if you haven't");
        }
      });
  }

  return (
    <div className="flex justify-center mt-10 h-80 p-5">
      <form onSubmit={loginUser} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            Sign In
          </button>
          <div className="mt-10 flex flex-col justify-center gap-y-6 ">
            <div className="">
              Don&apos;t have an account?
              <Link
                to="/SignUp"
                className="text-[#00b0eb] hover:text-blue-700 ml-2 "
              >
                Sign up
              </Link>
            </div>
            <div className="">
              <Link
                to="/ForgotPassword"
                className="text-[#00b0eb] hover:text-blue-700 ml-2 "
              >
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
