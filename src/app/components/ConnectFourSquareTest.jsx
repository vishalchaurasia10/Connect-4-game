import React from "react";

export default function ConnectFourSquareTest({
    rowIdx,
    colIdx,
    board,
}) {

    return (
        <div className="cf-item">
            {board[rowIdx][colIdx] === 1 ? (
                <div className="cf-token-X"></div>
            ) : (
                <>
                    {board[rowIdx][colIdx] === 2 ? (
                        <div className="cf-token-O"></div>
                    ) : (
                        <div></div>
                    )}
                </>
            )}
        </div>
    );
}
