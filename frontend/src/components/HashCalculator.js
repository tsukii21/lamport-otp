import md5 from "md5";
import { useState } from "react";

export default function HashCalculator() {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState("");
  const [result, setResult] = useState("");
  const handleClick = () => {
    if (rounds && password) {
      let res = password;
      for (var i = 0; i < parseInt(rounds); i++) res = md5(res);
      setResult(res);
    }
  };
  return (
    <div className="bg-white rounded border p-5 ml-5">
      <p className="text-center p-2 font-bold">Hash Calculator</p>
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          onChange={(ev) => setPassword(ev.target.value)}
          value={password}
          id="password"
          name="password"
          type="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Your password"
        />
      </div>
      <div>
        <label htmlFor="rounds" className="sr-only">
          Rounds
        </label>
        <input
          onChange={(ev) => setRounds(ev.target.value)}
          value={rounds}
          id="rounds"
          name="rounds"
          type="number"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Hash rounds"
        />
      </div>
      <div>
        <button
          onClick={handleClick}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
        >
          Calculate hash
        </button>
      </div>
      {!!result && (
        <div className="flex justify-between mt-2">
          <input
            value={result}
            type="text"
            disabled
            className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="p-2 bg-blue-600 text-white rounded-r-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
