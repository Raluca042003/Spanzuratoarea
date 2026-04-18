import React from 'react';

// Importurile celor 7 fișiere SVG din folderul 'assets/'
// Calea relativă '../assets/' funcționează deoarece fișierul curent este în 'components/'
import hangman0 from '../assets/hangman-0.svg';
import hangman1 from '../assets/hangman-1.svg';
import hangman2 from '../assets/hangman-2.svg';
import hangman3 from '../assets/hangman-3.svg';
import hangman4 from '../assets/hangman-4.svg';
import hangman5 from '../assets/hangman-5.svg';
import hangman6 from '../assets/hangman-6.svg';

// Un array care mapează numărul de greșeli la fișierul SVG corespunzător
const hangmanImages = [
  hangman0, // Index 0 (0 greșeli)
  hangman1, // Index 1 (1 greșeală)
  hangman2, // Index 2 (2 greșeli)
  hangman3, // Index 3 (3 greșeli)
  hangman4, // Index 4 (4 greșeli)
  hangman5, // Index 5 (5 greșeli)
  hangman6, // Index 6 (6 greșeli - Game Over)
];

const HangmanImage = ({ wrongGuesses, maxGuesses }) => {
  // Verifică ca indexul să nu depășească limita array-ului (să rămână la hangman-6)
  const imageIndex = Math.min(wrongGuesses, hangmanImages.length - 1);

  return (
    <div className="hangman-image-container">
      {/* Folosim tag-ul <img>, iar Webpack înlocuiește variabila cu URL-ul SVG-ului */}
      <img 
        src={hangmanImages[imageIndex]} 
        alt={`Stadiul Spânzurătorii: ${wrongGuesses} greșeli`} 
        className="hangman-svg"
      />
      <p className="status-text">
       
      </p>
    </div>
  );
};

export default HangmanImage;