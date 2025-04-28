import React from 'react';
import './App.css';

function Bubble({ isActive, onPop }) {
    const bubbleClass = isActive ? "bubble active" : "bubble";

    return (
        <div
            className={bubbleClass}
            onClick={onPop}
        ></div>
    );
}

export default Bubble;
