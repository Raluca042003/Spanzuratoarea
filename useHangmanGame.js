import { useState, useEffect, useCallback, useMemo } from 'react';
import { getQuestionFromAPI } from '../api/getQuestionFromAPI';

const DIFFICULTY_GUESSES = { usor: 8, mediu: 6, hard: 4 };

const getUniqueRequiredLetters = (answer) => {
  if (!answer) return new Set();
  return new Set(answer.split('').filter(char => char !== ' ' && char !== '-'));
};

const useHangmanGame = (difficulty = "mediu") => {
  const maxGuesses = DIFFICULTY_GUESSES[difficulty] || 6;

  const [questionData, setQuestionData] = useState({});
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("PLAYING");

  const uniqueRequiredLetters = useMemo(
    () => getUniqueRequiredLetters(questionData.answer),
    [questionData.answer]
  );

  const loadNewQuestion = useCallback(async () => {
    const newQ = await getQuestionFromAPI();
    setQuestionData(newQ);
  }, []);

  const resetGame = useCallback(() => {
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("PLAYING");
    loadNewQuestion();
  }, [loadNewQuestion]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const checkWin = useCallback(() => {
    if (!questionData.answer) return false;
    for (const letter of uniqueRequiredLetters) {
      if (!guessedLetters.has(letter)) return false;
    }
    return true;
  }, [guessedLetters, uniqueRequiredLetters]);

  const handleGuess = (letter) => {
    if (gameStatus !== "PLAYING" || guessedLetters.has(letter)) return;
    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);
    if (!questionData.answer.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (!questionData.answer) return;
    if (wrongGuesses >= maxGuesses) {
      setGameStatus("LOST");
    } else if (checkWin()) {
      setGameStatus("WON");
    }
  }, [wrongGuesses, checkWin, questionData.answer, maxGuesses]);

  return {
    question: questionData.question,
    answer: questionData.answer,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleGuess,
    resetGame,
    maxGuesses,
  };
};

export default useHangmanGame;