import chess from "@/lib/chess";
import supabase from "@/lib/supabase"

export async function GET(request: Request) {
  const {data} = await supabase.from('game').select()
  .eq('player1', 5)   // Replace 'value1' with the desired value for player1
  .eq('player2', 17)   // Replace 'value2' with the desired value for player2
  .limit(1);
    // console.log('sd', data);
  if (data){
    chess.load(data[0].gamestate)
    // console.log('checking: ', await chess.board());
    return new Response(JSON.stringify({board: chess.board()}));
  }
}
