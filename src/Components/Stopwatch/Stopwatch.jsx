import React, {useState, useRef} from 'react'
import "./Stopwatch.css"

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const handleStartPause = () =>{
        if(isRunning){
            clearInterval(timerRef.current);
        }else {
                const startTime = Date.now() - time;
                timerRef.current = setInterval(() =>{
                    setTime(Date.now() - startTime)
                },100);               
        }
        setIsRunning(!isRunning)
     }

     const handleStop = () =>{
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTime(0);
     }

     const handleReset = () =>{
        clearInterval(timerRef.current);
        setTime(0);
        if(isRunning){
            const startTime = Date.now();
            timerRef.current = setInterval(()=>{
                setTime(Date.now() - startTime);
            }, 100)
        }  
     }

     const formatTime = (time) =>{
        const milliseconds = `0${(time%1000)}`.slice(-3);
        const seconds = `0${Math.floor(time/1000)%60}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor((time/ 3600000))}`.slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
     }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch