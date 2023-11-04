'use client'
import React, { useState, useEffect } from 'react';

const Game = () => {
    const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
    const [player, setPlayer] = useState('Player 1');
    const [winner, setWinner] = useState(null);

    const count = (type, x, y, dx, dy) => {
        let count = 0;
        x += dx;  // Skip the piece at (y, x) to avoid counting it twice
        y += dy;  // when looking in both directions on a line.
        while (x >= 0 && x < 7 && y >= 0 && y < 6 && board[y][x] == type) {
            count++;
            x += dx;  // Move in the direction denoted by (dy, dx)
            y += dy;
        }
        return count;
    }

    const check = (type, x, y) => {
        return (count(type, x, y, -1, 0) + 1 + count(type, x, y, 1, 0) >= 4  // horizontal
            || count(type, x, y, 0, -1) + 1 + count(type, x, y, 0, 1) >= 4  // vertical
            || count(type, x, y, -1, -1) + 1 + count(type, x, y, 1, 1) >= 4  // diagonal
            || count(type, x, y, -1, 1) + 1 + count(type, x, y, 1, -1) >= 4);
    }

    useEffect(() => {
        console.log('board', board);
    }, [board]);

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
            }
            setPlayer(player === 'Player 1' ? 'Player 2' : 'Player 1');
        }
    };

    return (
        <div className="text-center bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold mb-4">Connect 4</h1>
            {winner ? (
                <p className="text-2xl font-semibold mb-2">{`${winner} wins!`}</p>
            ) : (
                <p className="text-lg font-medium mb-2">{`${player}'s turn`}</p>
            )}
            <div className="gameWrapper w-[25rem]">
                <div className="grid grid-cols-7 gap-2 mr-4">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                style={{ backgroundColor: cell }}
                                className={`w-12 h-12 bg-blue-400 cursor-pointer rounded-full ${cell}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            ></div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;