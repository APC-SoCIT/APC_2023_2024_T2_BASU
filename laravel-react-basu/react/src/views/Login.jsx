import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    setLoginError("");
    setLoading(true);

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        setLoginError(""); // Clear login error if login is successful
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(
            error.response.data.errors || {}
          ).reduce((accum, next) => [...accum, ...next], []);
          setError({ __html: finalErrors.join("<br>") });
        } else {
          setError({
            __html: "An unexpected error occurred. Please try again later.",
          });
        }
        setLoginError("Invalid email or password. Please try again."); // Set login error message
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loginError && (
          <div className="bg-red-500 rounded py-2 px-3 text-white">
            {loginError}
          </div>
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
          Log-in to BASU | APC
        </h2>
        <input type="hidden" name="remember" defaultValue="true" />
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Dont have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Register Here!
        </Link>
      </p>
    </>
  );
}
