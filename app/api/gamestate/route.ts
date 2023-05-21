import supabase from "@/lib/supabase"

export async function GET(request: Request) {
  const {data} = await supabase.from('game').select();
    console.log('sd', data);
  return new Response("123");
}
