import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // useState hooks to manage state
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook to get reference to the password input field
  const passwordRef = useRef(null)

  // useCallback hook to memoize the password generator function
  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYYZqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "_-*&%#@"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  // useEffect hook to generate password on component mount and when dependencies change
  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, characterAllowed, PasswordGenerator])

  // useCallback hook to memoize the copy to clipboard function
  const copyPasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
      
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-8 text-white bg-gray-800 bg-opacity-75'>
        <h1 className='text-white text-center my-3 text-2xl font-bold'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-3 bg-gray-700 text-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordtoclipboard} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shrink-0"
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id='characterInput'
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
