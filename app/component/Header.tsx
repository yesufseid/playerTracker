"use client"
import { Card} from '@mui/material';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import {ThemeSwitcher} from "../../components/theme-switcher"
export default function Header() {
  const pathname = usePathname(); // Get the current path
  return (
    <Card className="w-full md:px-60 flex justify-between py-2">
         <h2 className="text-2xl font-bold mb-4 text-center">Game Player  Tracker</h2>
         <div className='flex gap-5 mr-5'>
         <Link 
          href="/protected" 
          className={`text-xl font-bold mb-4 text-center text-pink-600 ${
            pathname === "/" ? "underline" : ""
          }`}
        >
          Home
        </Link>
        <Link 
          href="/protected/stats" 
          className={`text-xl font-bold mb-4 text-center text-pink-600 ${
            pathname === "/stats" ? "underline" : ""
          }`}
        >
          Stats
        </Link>
         </div>
    </Card>
  )
}
