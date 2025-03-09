import { useState, useEffect, useRef } from "react";
import Popup from "./Components/Popup";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumberEnabled, setNumbers] = useState(false);
  const [isCharEnabled, setCharEnabled] = useState(false);
  const [isPopupActive, setPopupActive] = useState(false);
  const [popUpMsg,setMessage]=useState("");
  const [isError, setIsError] = useState(false);
  const inputref = useRef(null);

  function passwordGenerator() {
    let passwordStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberEnabled) {
      passwordStr += "0123456789";
    }
    if (isCharEnabled) {
      passwordStr += "~!@#$%^&*()>?}{";
    }

    let ans = "";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * passwordStr.length);
      ans += passwordStr[charIndex];
    }

    setPassword(ans);
  }

  // Use useEffect to generate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberEnabled, isCharEnabled]);

  async function copyPassword() {
    try {
      inputref.current.focus();
      await window.navigator.clipboard.writeText(password);
      setMessage("password copied successfully");
      setIsError(false);
    } catch (err) {
      setMessage("Unable to copy the password");
      setIsError(true);
    }
    setPopupActive(true);
    setTimeout(() => setPopupActive(false), 3000); // Hide popup after 3 seconds
  }

  return (
      <div className="w-full h-screen flex flex-col gap-10 items-center bg-gray-900">
        {isPopupActive && <Popup message={popUpMsg} iserror={isError} />}
        <div className="flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 mt-[50%]">
            <h1 className="text-white font-bold text-2xl text-center mb-4">
              Password Generator
            </h1>
            {/* Password Display */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                ref={inputref}
                value={password}
              />
              <button
                onClick={copyPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
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
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-col mt-4 gap-2">
              <label className="text-white flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isNumberEnabled}
                  onChange={() => setNumbers(!isNumberEnabled)}
                />
                Include Numbers
              </label>

              <label className="text-white flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isCharEnabled}
                  onChange={() => setCharEnabled(!isCharEnabled)}
                />
                Include Characters
              </label>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
