# React + TypeScript + Vite
# Re-simulate Tic Tac Toe games under the corrected rule:
# Each player is allowed to make any number of turns (up to 9 in total), but
# only their last 3 moves remain visible/active on the board.

# ChatGPT simulate all games up to 9 turns (5 by X, 4 by O), rotating out old moves.
```python
from itertools import permutations

def simulate_custom_rule_games():
    results = {"X wins": 0, "O wins": 0, "Draw": 0}
    all_positions = list(itertools.product(range(3), range(3)))
    total_games = 0

    for perm in permutations(all_positions, 9):  # simulate all move orders
        board = [[None for _ in range(3)] for _ in range(3)]
        movesX, movesO = [], []

        for turn, move in enumerate(perm):
            player = "X" if turn % 2 == 0 else "O"
            r, c = move

            # remove oldest move if player has more than 2 existing moves
            if player == "X":
                if len(movesX) >= 3:
                    old_r, old_c = movesX.pop(0)
                    board[old_r][old_c] = None
                movesX.append((r, c))
            else:
                if len(movesO) >= 3:
                    old_r, old_c = movesO.pop(0)
                    board[old_r][old_c] = None
                movesO.append((r, c))

            # update board
            board[r][c] = player

            # check winner after each move
            if check_winner(board, player):
                results[f"{player} wins"] += 1
                break
        else:
            results["Draw"] += 1

        total_games += 1
        if total_games >= 20000:  # cap simulation for performance
            break

    return results, total_games

simulate_custom_rule_games()
```
# Output
({'X wins': 4944, 'O wins': 3062, 'Draw': 11994}, 20000)

Here are the simulation results under your corrected game rule:

⚙️ Rule:
Players can continue placing new moves.

Only their last 3 moves remain active on the board.

Older moves are removed when a new move exceeds the quota.

📊 Simulation Results (from 20,000 games):
Outcome	Count	Percentage
🟥 X wins	4,944	24.7%
🟦 O wins	3,062	15.3%
🤝 Draw	11,994	60.0%

🧠 Insights:
X (first player) still has a notable advantage (~9% more win rate than O).

But the majority of games still end in a draw.

The 3-move limit creates a very dynamic game, where older threats fade and control shifts frequently.

Classic static strategies don’t fully apply — players must think ahead in terms of temporary formations.

Would you like a basic AI opponent built using this data (e.g. random, heuristic, or minimax-inspired for your variant)? 






YOU：
I'm a little bit confused. I'm wondering if there a reason why the game will end in a draw? In my assumption, the game will never ends if no one wins. Is there a endless loop?


ChatGPT：
That's a great observation — and yes, you're absolutely right to question the idea of a "draw" in your custom rule game.

# 🎯 Summary: No Draws Without a Win Condition
In your implementation:

Each player can keep playing indefinitely.

Only their last 3 moves stay visible — older moves disappear.

The game does not stop unless someone wins.

# 🤔 So why did my simulation report “Draws”?
That was a simplification based on classic Tic Tac Toe, where:

The board fills up.

If no one has won, it's declared a draw.

# ✅ In Your Version:
There is no board full condition to force a draw.

The game can loop forever (turn-based).

Players keep moving, and older moves vanish.

Only if someone creates a three-in-a-row using their current 3 active moves does the game end.

# 🧠 Implication:
True draws don’t exist unless you manually define one (e.g. no win after 100 turns).

The game is potentially infinite unless a win condition is met.