import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-white font-bold text-2xl text-center mb-4">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
            value={pass}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Copy
          </button>
        </div>

        {/* Password Length */}
        <div className="mt-4">
          <label htmlFor="length" className="text-white font-semibold">
            Password Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min={8}
            max={40}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-col mt-4 gap-2">
          <label className="text-white flex items-center gap-2">
            <input type="checkbox" /> Include Numbers
          </label>

          <label className="text-white flex items-center gap-2">
            <input type="checkbox" /> Include Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
