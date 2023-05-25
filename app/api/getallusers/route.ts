import chess from "@/lib/chess";
import supabase from "@/lib/supabase"

export async function GET(request: Request) {
  const {data} = await supabase.from('users').select('id, username');
  return new Response(JSON.stringify({users: data}));
}
