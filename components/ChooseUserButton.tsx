import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  users: Array<Username>;
};

interface Username {
  username: string;
  id: number
}

export default function ChooseUserButton({ users }: Props) {

  //add session to get myId
  // const { data: session, status } = useSession()
  // console.log('session', session);
  
  const startTheGame = async (userId: number) => {
    try {
      const response = await fetch("/api/startgame", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1: 5, player2: userId }),
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
            <Link href="/chessboard" onClick={e=>startTheGame(user.id)}>
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
