import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./Game";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [difficulty, setDifficulty] = useState("mediu");
  const [screen, setScreen] = useState("start");

  const handleStart = (name, diff) => {
    setPlayerName(name);
    setDifficulty(diff);
    setScreen("game");
  };

  const handleExit = () => {
    setPlayerName(null);
    setScreen("start");
  };

  const updateScore = (result) => {
    const scores = JSON.parse(localStorage.getItem("hangmanScores") || "[]");
    const existing = scores.find(s => s.name === playerName);
    if (existing) {
      if (result === "WON") existing.wins += 1;
      else existing.losses += 1;
    } else {
      scores.push({
        name: playerName,
        wins: result === "WON" ? 1 : 0,
        losses: result === "LOST" ? 1 : 0,
      });
    }
    localStorage.setItem("hangmanScores", JSON.stringify(scores));
  };

  return (
    <>
      {screen === "start" && <StartScreen onStart={handleStart} onLeaderboard={() => setScreen("leaderboard")} />}
      {screen === "game" && <Game playerName={playerName} difficulty={difficulty} onExit={handleExit} onGameEnd={updateScore} />}
      {screen === "leaderboard" && <Leaderboard onBack={() => setScreen("start")} />}
    </>
  );
}

export default App;