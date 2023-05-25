import supabase from "@/lib/supabase";

export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  console.log('req.body', requestBody);

  //error might be due to unique value
  const {data, error} = await supabase.from('users').insert({username: requestBody.username, password: requestBody.password}).select()

  return new Response(JSON.stringify({myobj: "Hello"}));
}
