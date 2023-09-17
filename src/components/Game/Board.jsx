import React, { useRef } from "react";
import Cell from "./Cell/Cell";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";
import { getCells } from "../../store/matchSlice";
import BoardInner from "./BoardInner";

const Board = () => {
    const cells = useSelector(getCells);
    const boardRef = useRef();

    return (
        <div className="board" ref={boardRef}>
            {cells.cells.map((cell) => (
                <Cell cell={cell} key={cell.id} boardRef={boardRef}/>
            ))}
            <BoardInner/>
        </div>
    );
};

export default Board;
