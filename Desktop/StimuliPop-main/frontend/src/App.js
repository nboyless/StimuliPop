import React, { useState, useEffect } from 'react';
import Bubble from './Bubble';
import './App.css';

function App() {
    const [popCount, setPopCount] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [timer, setTimer] = useState(10);
    const [activeBubble, setActiveBubble] = useState(null);
    const [bubbles, setBubbles] = useState(Array(9).fill(false)); // 9 bubbles

    useEffect(() => {
        let countdown;
        let bubbleInterval;

        if (gameStarted) {
            // Timer countdown
            countdown = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(countdown);
                        clearInterval(bubbleInterval);
                        setGameStarted(false);
                        setActiveBubble(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Randomly activate bubbles every second
            bubbleInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * 9);
                setActiveBubble(randomIndex);
            }, 800); // 800ms to move faster than timer

        }

        return () => {
            clearInterval(countdown);
            clearInterval(bubbleInterval);
        };
    }, [gameStarted]);

    const startGame = () => {
        setPopCount(0);
        setMultiplier(1);
        setTimer(10);
        setGameStarted(true);
    };

    const handlePop = (index) => {
        if (!gameStarted) return;

        if (index === activeBubble) {
            setPopCount(prev => prev + 1 * multiplier);
            setMultiplier(prev => prev + 1);
            setActiveBubble(null); // pop successful, hide bubble
        } else {
            setMultiplier(1); // wrong bubble, reset multiplier
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">StimuliPop: Whack-a-Bubble</h1>

            {!gameStarted ? (
                <button className="start-button" onClick={startGame}>
                    Start Game
                </button>
            ) : (
                <h2 className="timer">Time Left: {timer}</h2>
            )}

            <div className="score-board">
                <h2>Score: {popCount}</h2>
                <h3>Multiplier: x{multiplier}</h3>
            </div>

            <div className="bubbles-container">
                {bubbles.map((_, index) => (
                    <Bubble
                        key={index}
                        isActive={index === activeBubble}
                        onPop={() => handlePop(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
