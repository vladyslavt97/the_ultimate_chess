"use client"
import Chessboard from "@/components/chess/Chessboard"
import chess from '@/lib/chess';
import { useEffect, useState } from 'react';
import supabase from "@/lib/supabase";

type Props = {}

export default function Page({}: Props) {
  
  return (
    <div className=" overflow-x-hidden">
      <h1 className='flex justify-center relative top-10 text-lg font-bold'>Chess</h1>
      <Chessboard/>
    </div>
  )
}