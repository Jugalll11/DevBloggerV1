"use client"
import { useRouter } from "next/navigation"


export default function home() {
    const nav = useRouter();
    nav.push('/home')
   return(
    
    <>
        
    </>
   )
}