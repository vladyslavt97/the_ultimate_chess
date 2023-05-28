 
import { useDispatch } from 'react-redux';
import chess from '@/lib/chess';
import { updateTheBoardState } from '@/redux/boardSlice';
import { checkMateState } from '@/redux/checkmateSlice';

export default function GameOverComp() {
    // const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();

    //fetch post to clean the data and start again
    const resetGame = async () => {
      console.log('finty firty');
      
    try {
      const response = await fetch("/api/reset-the-game", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1: 5, player2: 17}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('chess', chess.fen());
      
      let board: any = chess.board();
      dispatch(updateTheBoardState(board));
      dispatch(checkMateState(false ))
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
    
  return <div className='z-30 overflow-hidden'>
        <div className='w-screen h-screen bg-black/50 absolute top-0 flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center h-1/6 w-4/6 bg-green-300 rounded-lg gap-10'>
                <div className='z-50 font-bold text-xl'>CheckMate</div>
                <button className='px-5 rounded-full bg-white' onClick={resetGame}>Start Over</button>
            </div>
        </div>
    </div>
}