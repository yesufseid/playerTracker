'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { useDispatch} from "react-redux";
import { AppDispatch } from "../Redux/store"

 
export default function Error() {
  const dispatch = useDispatch<AppDispatch>();
 const handle=()=>{
   dispatch({ type: "players/fetchPlayers" });
 }
 
  return (
    <div className='md:w-[500px] mx-auto w-full h-full flex flex-col justify-center items-center '>
      <h2 className='font-bold font-serif my-20'>Something went wrong!</h2>
      <button className='mt-5  py-2 px-3 border-2 border-green-600 hover:bg-green-600 rounded-xl'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => handle()
        }
      >
        Try again
      </button>
    </div>
  )
}