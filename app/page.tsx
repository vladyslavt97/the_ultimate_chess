"use client"
import Link from 'next/link';

import { signIn, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession()
  console.log("session: ", session);
  
    const Router = useRouter();

    if (status === "loading") {
        return <p className="flex justify-center items-center h-screen w-full text-4xl">Loading...</p>
    }

    if (status === "authenticated") {
        Router.push("/chooseuser")
    }

  return (
    <>
      <main className="flex flex-col justify-center items-center w-full h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-300 via-blue-300 to-purple-200">
      {status === "unauthenticated" ? <div className="flex gap-10 justify-around flex-col items-center text-center">
          <h1 className=" text-black text-2xl font-serif">Welcome to Chess</h1>
          <button className=" bg-green-300 border-gray-500 border text-4xl py-2 px-4 rounded-full"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
          <Link href="/register" className=" bg-green-300 border-gray-500 border text-4xl py-2 px-4 rounded-full"
          >
            Register
          </Link>
        </div>
        :
        <p className="flex justify-center items-center h-screen w-full text-4xl">Loading...</p> 
        }
      </main>
    </>
  )
}
