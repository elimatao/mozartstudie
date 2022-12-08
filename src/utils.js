import {useState} from "react";

export function Button({handleClick, isDisabled=false, children}){
    return(
        <button className={"btn btn-primary d-block mx-auto my-3" + (isDisabled ? " disabled" : "") }
                onClick={handleClick}>{children}</button>
    )
}

// What if this returned a boolean instead of a number --- or just a variable?
export function CountDown({duration, func}){
    let [remTime, setRemTime] = useState(duration);


    const countTimeout = setTimeout(()=>{setRemTime(remTime-1);}, 1000);

    if (remTime !== 0){
        return <>{remTime}</>;
    }
    clearTimeout(countTimeout);
    setRemTime(duration); // Bereitet den Counter für den nächsten Aufruf vor
    return func();
}