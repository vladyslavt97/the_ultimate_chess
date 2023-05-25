import Link from 'next/link';

type Props = {
  users: Array<Username>;
};

interface Username {
  username: string;
  id: number
}

export default function ChooseUserButton({ users }: Props) {
  let player1ID = 5;
  let player2ID = 16;

  const startTheGame = async () => {
    try {
      const response = await fetch("/api/startgame", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1: player1ID, player2: player2ID }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-1'>
      {users.length > 0 ?
        <>
        {users.map(user => (
          <div key={user.id} className='px-3 py-0 bg-green-500 rounded-lg min-w-[20%] text-center'>
            <Link href="/chessboard" onClick={startTheGame}>
              {user.username}
            </Link>
          </div>
        ))}
        </>
        :
        <div>
          <h3>Looking for all the users...</h3>
        </div>}
    </div>
  );
}
