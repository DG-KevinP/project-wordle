import React, {useState} from 'react';
import { checkGuess } from '../../game-helpers';
import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });



function Game() {
  const [guess, setGuess] = useState('');
  const [listOfGuess, setListOfGuess] = useState([]);
  const [amountOfGuesses, setAmountOfGuesses] = useState(0);
  const [won, setWon] = useState(false);
  const initialGrid = new Array(6);
  //console.info({guess});
  function checkAnswer(newGuess) {
    if(newGuess.length != 5) { 
      console.info("Guess has to be 5 characters long.")
    } else {
      let result = newGuess.toUpperCase();
    setGuess(result);
    console.info({guess});
    setListOfGuess([...listOfGuess, guess]); //
    
    console.info(checkGuess(guess, answer))
    setGuess('');
    setAmountOfGuesses(amountOfGuesses + 1);
    if(newGuess == answer) {
      setWon(true);
    }
  }
  }
  return <>
  <div className="guess-results"> 
  {listOfGuess.map((guessHere, position) => (
    <p className="guess" key={position}>{checkGuess(guessHere, answer).map((option, index) => (
      <span className={'cell ' + option.status} key={index}>{option.letter}</span>
    ))}</p>
  ))}
  {Array.from({ length: 6 - listOfGuess.length }).map((_, index) => (
    <p className="guess" key={`empty-${index}`}>
      {'     '.split('').map((char, charIndex) => (
        <span className="cell" key={charIndex}>{char}</span>
      ))}
    </p>
  ))}
  </div>

   

   
  <form className="guess-input-wrapper"
  onSubmit={(event) => {event.preventDefault();
    checkAnswer(guess);}}>
  
    <label htmlFor="guess-input">Enter guess:</label>
    {amountOfGuesses < 6 &&  !won ? (

      <input id="guess-input" text="text" 
      value={guess}
      onChange={(event) => {setGuess(event.target.value);}}
      /> )
      : (<div>
        {won ? (<div className="happy banner">
  <p>
    <strong>Congratulations!</strong> Got it in
    <strong>{amountOfGuesses} guesses</strong>.
  </p>
</div> ) : (<div className="sad banner">
  <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
</div>) }
        </div>
      )
    }
    
  </form>
  
  </>;
}

export default Game;
