import {useState, useEffect} from "react";
import {generateRandString} from "./utils";
import {config} from "./Constants";
import TestInput from "./TestInput";
import TestOutput from "./TestOutput";

export default function Test({handleDivChange, globTestProgress, reps, duration, startState=0}){

    let [testProgress, setTestProgress] = useState(startState); // evtl. globTestProgress?
    let [currInput, setCurrInput] = useState("");
    let [str, setStr] = useState(generateRandString());
    let [remTime, setRemTime] = useState(config.testCountDown); // Countdown-Zeit ändern

    var renderedStrL = [];
    var renderedStrR = [];

    for(let i = 0; i<str.randString.length; i++){
        if(currInput[i] === undefined){
            renderedStrR.push(<span>{str.randString[i]}</span>);
        } else{
            renderedStrL.push(<span>{str.randString[i]}</span>);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{setRemTime(remTime-1)}, 1000); // Funktioniert irgendwie

        if (remTime == 0){

            if (testProgress > 0){
                // Schließt letzten Test ab.
                evalInput(currInput, str.solutionString, (globTestProgress-1) + testProgress); // globTestProgress ist 1 zu hoch
                setCurrInput("");
            }

            setTestProgress(testProgress+1);
        }
    }, [remTime])

    useEffect(()=>{
        if (testProgress == 0){
            // Nichts?
        }
        else if (testProgress <= reps){
            // Startet neuen Test
            setStr(generateRandString());// generiert neue Strings
            setRemTime(duration);

        } else if (testProgress > reps){
            handleDivChange(testProgress); // alles aufräumen
        }
    }, [testProgress])

    return (
        testProgress === 0 ? (
            <div className="text-center">
                Bereite dich vor...
                <h1>{remTime}</h1>
            </div>
        ) : (
            <>
                <div className="form-group">
                    <TestOutput currInput={currInput} renderedStrL={renderedStrL} renderedStrR={renderedStrR}/>
                    <TestInput currInput={currInput} setCurrInput={setCurrInput}/>
                </div>

                <p className="text-center mt-3">Test {testProgress} von {reps} -
                    Zeit verbleibend: {remTime} Sekunden</p>
            </>
        )
    );
}




function evalInput(input, solution, id){
    let aF = 0;
    let vF = 0;
    for(let i=0;i<input.length;i++){
        if(input[i]=== '_' && solution[i] !== '_') aF++;
        else if(input[i]!== '_' && solution[i] === '_') vF++;
    }

    let testData = JSON.parse(sessionStorage.getItem("testData"));
    if (testData === null) testData = [];

    // Workaround für doppelten Aufruf
    else if (testData[testData.length -1]["id"] === id) return;

    testData.push({
        "GZ": input.length,
        "AF": aF,
        "VF": vF,
        "id": id
    })
    sessionStorage.setItem("testData", JSON.stringify(testData));
}