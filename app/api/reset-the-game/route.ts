import supabase from "@/lib/supabase";
import chess from "@/lib/chess";
export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  
  chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

  await supabase.from('game')
  .update({ gamestate: chess.fen()})
  .match({ player1: requestBody.player1, player2: requestBody.player2 });

  return new Response(JSON.stringify({myobj: "should be reset"}));
}
