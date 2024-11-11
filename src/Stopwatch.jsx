import React, {useState, useEffect, useRef} from "react";

function Stopwatch ()
{
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => 
    {
        if (isRunning)
        {
           intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () =>
        {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
    }

    function padZero (number)
    {
        return (number < 10? "0" : "") + number;
    }

    return (
        <>
        <div className = "stopwatch">
            <div className="display"> {formatTime()}
            </div>
            <div className="controls">
                <button onClick = {start} className="start-button">Start</button>
                <button onClick = {reset} className="reset-button">Reset</button>
                <button onClick = {stop} className="stop-button">Stop</button>
            </div>
        </div>
        </>
    )
}

export default Stopwatch