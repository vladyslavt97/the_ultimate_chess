import chess from "@/lib/chess"

export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  let result = await chess.moves({ square: requestBody.possibleMoves});
  // console.log('result', result);
  const responseBody = JSON.stringify({ legalmoves: result });
  return new Response(responseBody);
}
