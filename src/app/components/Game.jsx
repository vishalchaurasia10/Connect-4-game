'use client'
import React, { useState } from 'react';
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
        const combination = [];
        combination.push([x, y]);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx !== 0 || dy !== 0) {
                    let count = 1;
                    let cx = x + dx;
                    let cy = y + dy;
                    while (count < 4 && cx >= 0 && cx < 7 && cy >= 0 && cy < 6 && board[cy][cx] === type) {
                        combination.push([cx, cy]);
                        cx += dx;
                        cy += dy;
                        count++;
                    }
                }
            }
        }

        return combination;
    };

    const handleCellClick = (row, col) => {
        if (board[row][col] === null && !winner) {
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
    };

    return (
        <div className="text-center bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className={`${jost.className} text-6xl font-semibold mb-4`}>Connect 4</h1>
            {winner ? (
                <p className="text-2xl font-semibold mb-4">{`${winner} wins!`}</p>
            ) : (
                <p className="text-lg font-medium mb-4">{`${player}'s turn`}</p>
            )}
            <div className="gameWrapper w-[35rem] relative">
                {winner && <svg className='absolute' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    {winningCombination.length === 4 && (
                        <line
                            x1={(winningCombination[0][0] + 0.5) * (100 / 7) + '%'}
                            y1={(winningCombination[0][1] + 0.5) * (100 / 6) + '%'}
                            x2={(winningCombination[3][0] + 0.5) * (100 / 7) + '%'}
                            y2={(winningCombination[3][1] + 0.5) * (100 / 6) + '%'}
                            stroke={winner === 'Player 2' ? 'yellow' : 'red'}
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    )}
                </svg>}
                <div className="grid grid-cols-7 gap-2 mr-4">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.1 }}
                                key={colIndex}
                                style={{ backgroundColor: cell }}
                                className={`w-10 h-10 md:w-16 md-h-16 bg-blue-400 cursor-pointer rounded-full ${cell}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            ></motion.div>
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
