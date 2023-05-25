"use client"
import ChooseUserButton from '@/components/ChooseUserButton';
import { useEffect, useState } from 'react';

type Props = {}

export default function Page({}: Props) {
  const [users, setUSers] = useState([]);
  
  useEffect(()=>{
    fetch('/api/getallusers')
      .then(response => {
          return response.json()
      })
      .then(data => {
          console.log('getallusers', data.users);
          setUSers(data.users)
      })
      .catch(err => {
          console.log('er: ', err);
      });
  },[])

  

  return (
    <main className='overflow-hidden min-h-screen'>
      <ChooseUserButton users={users}/>
    </main>
  )
}