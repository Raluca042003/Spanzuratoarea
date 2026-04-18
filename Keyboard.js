import React from 'react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
// Definim un array cu cifrele de la 0 la 9
const NUMBERS = '0123456789'.split(''); 
// Combinăm literele și cifrele, introducând opțional un separator vizual (un spațiu sau un simbol)
const CHARACTERS = [...ALPHABET, ...NUMBERS]; 

const Keyboard = ({ onGuess, guessedLetters, disabled }) => {
  return (
    <div className="keyboard-container">
      {CHARACTERS.map(char => { // Am schimbat "letter" în "char" (caracter)
        const isGuessed = guessedLetters.has(char);
        
        return (
          <button
            key={char}
            onClick={() => onGuess(char)}
            // Butonul este dezactivat dacă jocul nu e în PLAYING SAU dacă a fost deja ghicit
            disabled={disabled || isGuessed} 
            className={`key-button ${isGuessed ? 'guessed' : ''}`}
          >
            {char}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;