import { useEffect, useState } from "react";
import shuffleArray from "../utilities/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";
import githubImage from '../img/github.svg';
import linkedinImage from '../img/linkedin.svg'

export default function Game() {
    const [shuffledArray, setShuffledArray] = useState(shuffleArray());
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        if (moves === 1) 
            setTimerActive(true);
        let won = true;
        for (let i = 0; i < shuffledArray.length - 1; i++) 
        {
            const value = shuffledArray[i];
            if (i === value - 1) 
                continue;
            else 
            {
                won = false;
                break;
            }
        }
        if (won) 
        {
            setWin(true);
            setTimerActive(false);
        }
        return;
    }, [moves]);

    const newGame = () => {
        setMoves(0);
        setTimerActive(false);
        setTime(0);
        setShuffledArray(shuffleArray());
        setWin(false);
    };

    const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

    const dragOver = (e) => e.preventDefault();

    const dropped = (e) => {
        e.preventDefault();
        const tile = e.dataTransfer.getData("tile");
        const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
        const newPlace = Number(e.target.id.slice(6)) - 1;

        if (!(Math.abs(oldPlace - newPlace) === 4 || Math.abs(oldPlace - newPlace) === 1)) 
            return;

        const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
        setShuffledArray([
            ...shuffledArray.slice(0, i),
            shuffledArray[j],
            ...shuffledArray.slice(i + 1, j),
            shuffledArray[i],
            ...shuffledArray.slice(j + 1),
        ]);
        setMoves(moves + 1);
    };

    return (
        <div className="h-screen flex flex-col text-gray-300 bg-gray-950">
            <div className="mx-auto mt-2 bg-cyan-950 p-3 h-fit rounded-3xl">
                {win && (
                    <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
                        <div className="flex items-center justify-center space-x-4">
                            <p className="font-medium text-green-600">
                                HURRAY!! You have won the game
                            </p>
                        </div>
                    </div>
                )}
                <h1 className="font-serif text-5xl text-stone-500 font-bold text-center">
                    15 Puzzle Game
                </h1>
                <hr></hr>
                <div className="flex justify-between px-6 mt-2">
                    <p>Moves: {moves}</p>
                    <Timer time={time} timerActive={timerActive} setTime={setTime} />
                </div>
                <Puzzle shuffledArray={shuffledArray} dragStart={dragStart} dragOver={dragOver} dropped={dropped} />
                <div className="px-6 mt-4">
                    <button
                        onClick={newGame}
                        className="text-red-300 font-bold text-xl block bg-stone-900 p-4 w-full h-full rounded-xl"
                    >
                        New Game
                    </button>
                </div>
            </div>
            <div className="text-center mx-auto mt-2 mb-1 bg-cyan-950 p-3 h-fit rounded-3xl lg:w-1/2">
                <p>Developed By Nufail Vhora</p>
                <p>The project is open source, visit the <b><a href="https://github.com/nv-0203" target="_blank" rel="noopener noreferrer">repo</a></b></p>
            </div>
            <footer className="mt-auto bg-gray-800 p-4 flex items-center justify-center">
                <a href="https://github.com/nv-0203" target="_blank" rel="noopener noreferrer" className="mr-4">
                <img src={githubImage} alt="GitHub Logo" />
                </a>
                <a href="https://www.linkedin.com/in/nufail-vhora-3301b6215/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinImage} alt="LinkedIn Logo" />
                </a>
            </footer>
        </div>
    );
}
