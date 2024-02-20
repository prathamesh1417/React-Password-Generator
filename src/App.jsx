import { useCallback, useState , useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordREf= useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*~()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const CopyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordREf.current?.select()
  }
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-7 py-8 my-10 bg-gray-900 text-orange-400'>
        <h1 className='text-white text-3xl
        text-center my-6'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordREf}

          />
          <button
          onClick={CopyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-3 
           py-0.5 shrink-0'>Copy</button>
        </div>
        <div
          className='flex text-sm gap-x-3'
        >
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlength(e.target.value)}
              name=''
              id=''
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)

              }}
              name=""
              id="" />
            <label htmlFor="numbers">Numbers</label>


          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)

              }}
              name=""
              id="" />
            <label htmlFor="charInput">Character</label>

          </div>

        </div>


      </div>
    </>
  )
}

export default App
