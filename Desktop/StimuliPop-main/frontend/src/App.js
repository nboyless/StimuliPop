import React, { useState, useEffect } from 'react';
import Bubble from './Bubble';
import './App.css';

function App() {
    const [popCount, setPopCount] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [highestMultiplier, setHighestMultiplier] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [timer, setTimer] = useState(10);
    const [activeBubble, setActiveBubble] = useState(null);

    // Settings state
    const [showSettings, setShowSettings] = useState(false);
    const [gameDuration, setGameDuration] = useState(10);
    const [difficulty, setDifficulty] = useState('Medium');
    const [gameMode, setGameMode] = useState('Normal');
    const [bubbleIntervalTime, setBubbleIntervalTime] = useState(800);

    // Game Over screen
    const [gameOver, setGameOver] = useState(false);

    const bubbles = Array(9).fill(false);

    useEffect(() => {
        let countdown;
        let bubbleInterval;

        if (gameStarted) {
            if (gameMode === 'Normal') {
                // Timer countdown for Normal mode
                countdown = setInterval(() => {
                    setTimer(prev => {
                        if (prev === 1) {
                            clearInterval(countdown);
                            clearInterval(bubbleInterval);
                            setGameStarted(false);
                            setActiveBubble(null);
                            setGameOver(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }

            // Bubble change speed
            bubbleInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * 9);
                setActiveBubble(randomIndex);
            }, bubbleIntervalTime);
        }

        return () => {
            clearInterval(countdown);
            clearInterval(bubbleInterval);
        };
    }, [gameStarted, bubbleIntervalTime, gameMode]);

    const startGame = () => {
        setPopCount(0);
        setMultiplier(1);
        setHighestMultiplier(1);
        setTimer(gameDuration);
        setGameStarted(true);
        setGameOver(false);
    };

    const handlePop = (index) => {
        if (!gameStarted) return;

        if (index === activeBubble) {
            setPopCount(prev => prev + 1 * multiplier);
            const newMultiplier = multiplier + 1;
            setMultiplier(newMultiplier);

            if (newMultiplier > highestMultiplier) {
                setHighestMultiplier(newMultiplier);
            }

            setActiveBubble(null);
        } else {
            setMultiplier(1);
            if (gameMode === 'Endless') {
                // End the game immediately on miss
                setGameStarted(false);
                setActiveBubble(null);
                setGameOver(true);
            }
        }
    };

    const openSettings = () => {
        setShowSettings(true);
    };

    const saveSettings = () => {
        setShowSettings(false);

        // Set bubble switching speed
        switch (difficulty) {
            case 'Easy':
                setBubbleIntervalTime(1000);
                break;
            case 'Medium':
                setBubbleIntervalTime(800);
                break;
            case 'Hard':
                setBubbleIntervalTime(500);
                break;
            default:
                setBubbleIntervalTime(800);
        }
    };

    const cancelSettings = () => {
        setShowSettings(false);
    };

    return (
        <div className="app-container">
            <h1 className="title">StimuliPop: Whack-a-Bubble</h1>

            {!gameStarted && !gameOver && (
                <div className="button-group">
                    <button className="start-button" onClick={startGame}>
                        Start Game
                    </button>
                    <button className="settings-button" onClick={openSettings}>
                        Settings
                    </button>
                </div>
            )}

            {gameStarted && (
                <>
                    {gameMode === 'Normal' && <h2 className="timer">Time Left: {timer}</h2>}
                </>
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

            {showSettings && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Game Settings</h2>

                        <div className="setting">
                            <label>Game Duration (seconds): {gameDuration}</label>
                            <input
                                type="range"
                                min="10"
                                max="60"
                                step="5"
                                value={gameDuration}
                                onChange={(e) => setGameDuration(Number(e.target.value))}
                            />
                        </div>

                        <div className="setting">
                            <label>Difficulty:</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>

                        <div className="setting">
                            <label>Game Mode:</label>
                            <select
                                value={gameMode}
                                onChange={(e) => setGameMode(e.target.value)}
                            >
                                <option>Normal</option>
                                <option>Endless</option>
                            </select>
                        </div>

                        <div className="modal-buttons">
                            <button onClick={saveSettings}>Save</button>
                            <button onClick={cancelSettings}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="gameover-overlay">
                    <div className="gameover-content">
                        <h1>Game Over!</h1>
                        <h2>Final Score: {popCount}</h2>
                        <h3>Highest Multiplier: x{highestMultiplier}</h3>
                        <button className="play-again-button" onClick={() => {
                            setGameOver(false);
                        }}>
                            Play Again
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
