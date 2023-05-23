import chess from "@/lib/chess"
import supabase from "@/lib/supabase";

export async function POST(request: Request) {
  const {player1, player2} = JSON.parse(await request.text());
  
  await supabase.from('game').insert({player1: player1, player2: player2, gamestate: chess.fen()})

  return new Response("all good");
}
