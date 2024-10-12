
import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [characterAllowed,setCharacterAllowed] = useState(false);
  const [Password,setPassword] = useState("")

  //useRef
  const PasswordRef = useRef(null) 

  const passwordGenerator = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@$%^&*()_~"

    for(let i=1; i<=length;i++){
        let char = Math.floor(Math.random() * str.length + 1)

        pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,characterAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])


  return (
    <>

    {/* input */}
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={Password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={PasswordRef}
          />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>

      {/* cursor for number */}

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
        </div>

        {/* checkbox for number */}

        <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
                setNumberAllowed((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput">Numbers</label>

        {/* checkbox for character */}

        <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={() => {
                    setCharacterAllowed((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>
   </div>
   </>
  )
}

export default App
