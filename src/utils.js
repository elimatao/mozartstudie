import {useState, useEffect} from "react";

export function Button({handleClick, isDisabled=false, children, color="primary", extraClasses}){
    return(
        <button className={`btn btn-${color} d-block mx-auto my-3` + (isDisabled ? " disabled " : " ") + extraClasses}
                onClick={handleClick}>{children}</button>
    )
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
            randString += goodChars[posChar].normalize("NFKC");
        } else{
            let posChar = Math.floor(Math.random() * badChars.length);
            solutionString += "_";
            randString += badChars[posChar].normalize("NFKC");
        }
    }
    return {solutionString, randString};
}