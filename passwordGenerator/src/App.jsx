
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const[characterAllowed,setCharacterAllowed]=useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{

    let genPass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str +="!@#$%^&*-_+="

    for(let i=1; i<=length; i++){
      let character = Math.floor(Math.random() * str.length + 1)
      genPass += str.charAt(character)
    }

    setPassword(genPass)

  },[length,characterAllowed,numberAllowed,setPassword])

  const copyPassword = useCallback(()=>{
   passwordRef.current?.select()
   passwordRef.current?.setSelectionRange(0,999)
   window.navigator.clipboard.writeText(password)
  })

  

  useEffect(()=>{
    passwordGenerator()
  },[length,characterAllowed,numberAllowed,passwordGenerator])



  return (
    <>
    <div className='w-6/12 h-auto bg-gray-800 mt-10 m-auto'>
      <h1 className='uppercase font-semibold text-orange-600'>password generator</h1>
      <div className='flex flex-col justify-center md:flex-row'>
        <input type="text" placeholder='password' value={password}  className='w-8/12' readOnly ref={passwordRef}/>
        <button className='bg-blue-800 text-white' onClick={copyPassword}>Copy</button>
      </div>
      <div className='flex flex-col justify-between px-7 py-4 md:flex-row'>
        <div className='flex gap-1 text-white'>
        <input
         type="range"
         min={6} max={100}
         value={length}
         onChange={(e)=>{setLength(e.target.value)}}
         className='cursor-pointer'/>
        <label>Length:{length}</label>
        </div>
        <div className='flex gap-1  text-white'>
          <input type="checkbox"
           defaultChecked={numberAllowed} 
           onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex gap-1  text-white'>
          <input 
          type="checkbox" 
          defaultChecked={characterAllowed} 
          onChange={()=>{setCharacterAllowed((prev)=>!prev)}}/>
          <label htmlFor="characterInput">Character</label>
        </div>

      </div>

    </div>
      </>
  )
}

export default App
