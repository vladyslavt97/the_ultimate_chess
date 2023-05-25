"use client"

import { FormEvent, useState } from "react";

type Props = {}

export default function Page({}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitUserFrom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('sdssdsdsds', username, password);
    try {
      
    const response = await fetch("/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('232', response);
    
    const responseData = await response.json();
    console.log('responseData, ',responseData);
    setUsername('');
    setPassword('');

    return responseData;
  } catch (error) {
    console.error('Errorrrr 33:', error);
    throw error;
  }
  }

  return (
    <main className='overflow-hidden min-h-screen'>
      <form className="flex flex-col items-center justify-center h-[100vh]" onSubmit={e =>submitUserFrom(e)}>
        <label>Username</label>
        <input name="username" className="rounded-lg" onChange={e => setUsername(e.target.value)}/>
        <label>PW</label>
        <input type="password" name="password" className="rounded-lg" onChange={e => setPassword(e.target.value)}/>
        <button className="px-2 py-0 bg-pink-300 rounded-lg mt-5">Submit</button>
      </form>
    </main>
  )
}