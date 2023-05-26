import chess from "@/lib/chess"
import supabase from "@/lib/supabase";

export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  await chess.move({ from: requestBody.from , to: requestBody.to })
  await supabase
  .from('game')
  .update({ gamestate: chess.fen() })
  .eq('player1', 5)
  .eq('player2', 17);

  const gameisover = chess.isGameOver();
  if(gameisover){
    let board = chess.board();
    return new Response(JSON.stringify({ gameOver: true, board }));
  }
  let board = chess.board();
  return new Response(JSON.stringify({ board }));
}
