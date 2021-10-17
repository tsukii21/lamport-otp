import axios from "axios";
import { useState } from "react";
import Info from "../components/Info";
import Cryptr from "cryptr";

export default function Login({ login }) {
  const KEY = "sjkbckasjdbvldj";
  const [nonce, setNonce] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);
  const [recievedNonce, setRecievedNonce] = useState(null);
  const [rNonce, setRNonce] = useState(null);
  const [error, setError] = useState(false);

  const contact2 = (nonce) => {
    axios
      .post("http://localhost:3001/contact2", { nonce: nonce })
      .then((res) => {
        login();
      })
      .catch((err) => console.log(err));
  };

  const contact1 = (r_copy, session_key) => {
    axios
      .post("http://localhost:3001/contact1", { r_copy: r_copy })
      .then((res) => {
        const session_cryptr = new Cryptr(session_key);
        const r_nonce = parseInt(session_cryptr.decrypt(res.data));
        setRNonce(r_nonce);
        const enc_nonce_to_send = session_cryptr.encrypt(r_nonce - 1);
        contact2(enc_nonce_to_send);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const request = {
      username: formdata.get("username"),
      r_username: formdata.get("r_username"),
      nonce: generateNonce(),
    };
    axios
      .post("http://localhost:5000/session-key", request)
      .then((res) => {
        const public_cryptr = new Cryptr(KEY);
        const decryptedRes = JSON.parse(public_cryptr.decrypt(res.data));
        setSessionKey(decryptedRes.session_key);
        setRecievedNonce(decryptedRes.nonce);
        contact1(decryptedRes.r_copy, decryptedRes.session_key);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  const generateNonce = () => {
    const generatedNonce = Math.floor(Math.random() * 1000000 + 1);
    setNonce(generatedNonce);
    return generatedNonce;
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
              <input
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="your username"
              />
            </div>
            <div>
              <input
                name="r_username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="recipient's username"
              />
            </div>
          </div>
          <div>
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
      <Info
        nonce={nonce}
        sessionKey={sessionKey}
        recievedNonce={recievedNonce}
        rNonce={rNonce}
      />
    </div>
  );
}
