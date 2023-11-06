'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Jost } from 'next/font/google';

const jost = Jost({
    subsets: ['latin'],
});

const Game = () => {
    const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
    const [player, setPlayer] = useState('Player 1');
    const [winner, setWinner] = useState(null);
    const [winningCombination, setWinningCombination] = useState([]);

    const count = (type, x, y, dx, dy) => {
        let count = 0;
        x += dx; // Skip the piece at (y, x) to avoid counting it twice
        y += dy; // when looking in both directions on a line.
        while (x >= 0 && x < 7 && y >= 0 && y < 6 && board[y][x] === type) {
            count++;
            x += dx; // Move in the direction denoted by (dy, dx)
            y += dy;
        }
        return count;
    };

    const check = (type, x, y) => {
        return (
            count(type, x, y, -1, 0) + 1 + count(type, x, y, 1, 0) >= 4 || // horizontal
            count(type, x, y, 0, -1) + 1 + count(type, x, y, 0, 1) >= 4 || // vertical
            count(type, x, y, -1, -1) + 1 + count(type, x, y, 1, 1) >= 4 || // diagonal
            count(type, x, y, -1, 1) + 1 + count(type, x, y, 1, -1) >= 4
        );
    };

    const calculateWinningCombination = (type, x, y) => {
        const combination = [[x, y]];

        // Arrays to store deltas for different directions (horizontal, vertical, and diagonal)
        const deltas = [
            [[-1, 0], [1, 0]], // Horizontal
            [[0, -1], [0, 1]], // Vertical
            [[-1, -1], [1, 1], [-1, 1], [1, -1]], // Diagonal
        ];

        for (const delta of deltas) {
            for (const [dx, dy] of delta) {
                let count = 1;
                let cx = x + dx;
                let cy = y + dy;
                const currentCombination = [[x, y]];

                while (count < 4 && cx >= 0 && cx < 7 && cy >= 0 && cy < 6 && board[cy][cx] === type) {
                    currentCombination.push([cx, cy]);
                    cx += dx;
                    cy += dy;
                    count++;
                }

                // Combine with the main combination if it forms a winning sequence
                if (currentCombination.length === 4) {
                    combination.push(...currentCombination);
                }
            }
        }

        return combination;
    };


    const handleCellClick = (col) => {
        if (!winner) {
            // Find the lowest available row in the clicked column
            let row = 5; // Assuming a 0-based index for rows

            while (row >= 0 && board[row][col] !== null) {
                row--;
            }

            if (row >= 0) {
                const newBoard = board.map((rowArray, rowIndex) => {
                    if (rowIndex === row) {
                        return rowArray.map((cell, colIndex) =>
                            colIndex === col ? (player === 'Player 1' ? 'yellow' : 'red') : cell
                        );
                    }
                    return rowArray;
                });

                setBoard(newBoard);
                if (check(player === 'Player 1' ? 'yellow' : 'red', col, row)) {
                    setWinner(player);
                    setWinningCombination(calculateWinningCombination(player === 'Player 1' ? 'yellow' : 'red', col, row));
                }
                setPlayer(player === 'Player 1' ? 'Player 2' : 'Player 1');
            }
        }
    };


    return (
        <div className="text-center bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className={`${jost.className} text-6xl font-semibold mb-4`}>Connect 4</h1>
            {winner ? (
                <p className="text-2xl font-semibold mb-4">{`${winner} wins!`}</p>
            ) : (
                <p className="text-lg font-medium mb-4">{`${player}'s turn`}</p>
            )}
            <div className="gameWrapper md:w-[35rem] relative">
                <div className="grid grid-cols-7 gap-2 mr-4">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.1 }}
                                key={colIndex}
                                style={{ backgroundColor: cell }}
                                className={`w-10 h-10 md:w-16 md:h-16 bg-blue-400 flex items-center justify-center cursor-pointer rounded-full ${cell}`}
                                onClick={() => handleCellClick(colIndex)}
                            >
                                {winner && winningCombination.some(([x, y]) => x === colIndex && y === rowIndex) && (
                                    <span className="cross text-black text-3xl font-medium">X</span>
                                )}
                            </motion.div>
                        ))
                    ))}
                </div>
            </div>
            <div className="restart my-5">
                <button
                    className="text-2xl font-semibold bg-white text-black px-4 py-2 rounded-md"
                    onClick={() => {
                        setBoard(Array(6).fill(Array(7).fill(null)));
                        setPlayer('Player 1');
                        setWinner(null);
                        setWinningCombination([]);
                    }}
                >
                    Restart
                </button>
            </div>
        </div>
    );
};

export default Game;
