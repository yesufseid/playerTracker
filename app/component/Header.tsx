"use client"
import { Card} from '@mui/material';
import Link from 'next/link';
export default function Header() {
  return (
    <Card className="w-full md:px-60 flex justify-between py-2">
         <h2 className="text-2xl font-bold mb-4 text-center">Game Player  Tracker</h2>
         <div className='flex gap-5 mr-5'>
         <Link href={"/"} className='text-xl font-bold mb-4 text-center text-pink-600'>Home</Link>
         <Link href={"/stats"} className='text-xl font-bold mb-4 text-center text-pink-600'>Stats</Link>
         </div>
    </Card>
  )
}
