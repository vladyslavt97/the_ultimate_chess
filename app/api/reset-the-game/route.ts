import supabase from "@/lib/supabase";
import chess from "@/lib/chess";
export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  
  console.log("here wew are", requestBody);
  
  const {data, error} = await supabase.from('game')
  .update({ gamestate: chess.fen()})
  .match({ player1: requestBody.player1, player2: requestBody.player2 });
  console.log(data, error);
  

  return new Response(JSON.stringify({myobj: "should be reset"}));
}
