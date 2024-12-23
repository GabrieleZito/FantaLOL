import React, { useState, useEffect } from "react";

export function Timer({ initialSeconds, resetTrigger }) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [seconds]);

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [resetTrigger, initialSeconds]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div>
            <p className="text-5xl">{formatTime(seconds)}</p>
        </div>
    );
}
