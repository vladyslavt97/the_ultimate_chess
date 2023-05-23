Changes happening in supabase
redux updated.

now:
need to have architecture for the board:
1. after the game is started and board inserted, we display an empty board.
(maybe initial value is chess.board())

2. then, we listen to the changes in the db!
3. after the change is received, we update redux