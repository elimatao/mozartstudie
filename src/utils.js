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

export function generateRandString(strLen=56){
    const goodChars = ['d\u{0348}', 'd\u{030D}\u{0329}', 'd\u{030E}']
    const badChars = ['d\u{0329}', 'd\u{030D}', 'd\u{030D}\u{0348}', 'd\u{030E}\u{0329}', 'd\u{030E}\u{0348}',
        'p\u{0348}', 'p\u{030D}\u{0329}', 'p\u{030E}', 'p\u{0329}',
        'p\u{030D}', 'p\u{030D}\u{0348}', 'p\u{030E}\u{0329}', 'p\u{030E}\u{0348}']

    let randString = "";
    let solutionString = "";

    for (let i=0;i<strLen;i++){
        // decide whether good or bad.
        if(Math.random() < 0.25){ // Verteilung: 1/4
            let posChar = Math.floor(Math.random() * goodChars.length);
            solutionString += "x";
            randString += goodChars[posChar];
        } else{
            let posChar = Math.floor(Math.random() * badChars.length);
            solutionString += " ";
            randString += badChars[posChar];
        }
    }
    return {solutionString, randString};
}