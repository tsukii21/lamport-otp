import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import HashCalculator from "../components/HashCalculator";

export default function Login({ login }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [rounds, setRounds] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (success1)
      axios
        .post("http://localhost:5000/login2", user)
        .then(login)
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    else
      axios
        .post("http://localhost:5000/login1", user)
        .then((res) => {
          setSuccess1(true);
          setRounds(res.data.rounds);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                onChange={handleChange}
                value={user.username}
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="john@snow"
              />
            </div>
            {success1 && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={user.password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                />
              </div>
            )}
          </div>
          <div>
            {!!rounds && (
              <p className="text-green-500 text-center">Rounds: {rounds}</p>
            )}
            {error && (
              <p className="text-red-500 text-center">Something went wrong</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <HashCalculator />
    </div>
  );
}
