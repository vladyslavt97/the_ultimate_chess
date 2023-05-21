import chess from "@/lib/chess"

export async function POST(request: Request) {
  let toVerify = await request.text();
  let requestBody = JSON.parse(toVerify);
  console.log('requestBody:', requestBody);
  let result = await chess.move({ from: requestBody.from , to: requestBody.to })
  console.log('result', result);
  let board = chess.board();
  return new Response(JSON.stringify({ board }));
}
