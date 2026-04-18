import React from 'react';

const WordDisplay = ({ answer, guessedLetters }) => {
  const maskedWord = answer.split('').map((letter, index) => {
    let content;

    // Afișează spațiile și cratimele direct
    if (letter === ' ' || letter === '-') {
        content = <span key={index} className="separator">{letter}</span>;
    // Dacă litera a fost ghicită
    } else if (guessedLetters.has(letter)) {
        content = <span key={index} className="letter guessed">{letter}</span>;
    // Altfel, afișează underscore
    } else {
        content = <span key={index} className="letter hidden">_</span>;
    }

    return content;
  });

  return (
    <div className="word-display">
      {maskedWord}
    </div>
  );
};

export default WordDisplay;