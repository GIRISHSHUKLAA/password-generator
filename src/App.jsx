import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current?.value);
  }, [password]);

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, characterAllowed, passwordGenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center m-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 shrink-0"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              defaultValue={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultValue={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultValue={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
