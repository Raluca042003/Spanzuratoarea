import React, { useState, useEffect, useRef } from "react";
import useHangmanGame from "./hooks/useHangmanGame";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import HangmanImage from "./components/HangmanImage";
import QuestionDisplay from "./components/QuestionDisplay";
import Confetti from "react-confetti";
import "./Game.css";
import { FaBook, FaTimes, FaTrophy, FaRedo, FaDoorOpen } from "react-icons/fa";

export default function Game({ playerName, difficulty, onExit, onGameEnd }) {
  const {
    question,
    answer,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleGuess,
    resetGame,
    maxGuesses,
  } = useHangmanGame(difficulty);

  const [dim, setDim] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const reportedStatus = useRef(null);

  useEffect(() => {
    const resize = () =>
      setDim({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (
      (gameStatus === "WON" || gameStatus === "LOST") &&
      reportedStatus.current !== gameStatus
    ) {
      reportedStatus.current = gameStatus;
      onGameEnd(gameStatus);
    }

    if (gameStatus === "PLAYING") {
      reportedStatus.current = null;
    }
  }, [gameStatus, onGameEnd]);

  if (!answer) return <div>Se încarcă...</div>;

  return (
    <>
      {gameStatus === "WON" && (
        <Confetti width={dim.width} height={dim.height} recycle={false} />
      )}

      <div className="game-layout">
        <div className="left-panel">
          <h1>Jocul Spânzurătoarea</h1>
          <h2 className="welcome">Succes, {playerName}!</h2>

          <div className="question-header">
            <FaBook className="icon question-icon" />
            <span>Întrebare</span>
          </div>

          <QuestionDisplay question={question} />

          <WordDisplay answer={answer} guessedLetters={guessedLetters} />

          {gameStatus !== "PLAYING" && (
            <div className={`message ${gameStatus}`}>
              <p>
                {gameStatus === "WON" ? (
                  <>
                    <FaTrophy className="icon trophy-icon" /> FELICITĂRI! AI GHICIT
                  </>
                ) : (
                  <>
                    <FaTimes className="icon lose-icon" /> AI PIERDUT! Răspunsul era: {answer}
                  </>
                )}
              </p>

              <button onClick={resetGame} className="play-again-btn">
                <FaRedo className="icon" /> Joacă din nou
              </button>
            </div>
          )}

          <Keyboard
            onGuess={handleGuess}
            guessedLetters={guessedLetters}
            disabled={gameStatus !== "PLAYING"}
          />
        </div>

        <div className="right-panel">
          <HangmanImage wrongGuesses={wrongGuesses} maxGuesses={maxGuesses} />
          <p className="status">
            <FaTimes className="icon lose-icon" /> Greșeli: <b>{wrongGuesses}</b> / {maxGuesses}
          </p>
        </div>
      </div>

      <button onClick={onExit} className="exit-btn">
        <FaDoorOpen className="icon" /> Ieșire
      </button>
    </>
  );
}