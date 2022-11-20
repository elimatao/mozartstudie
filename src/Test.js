import {Button} from "./utils";
import {useState} from "react";

export default function Test({handleDivChange, globTestProgress}){

    let [testProgress, setTestProgress] = useState(0);
    const nTests = 2;

    // Startet den Vorbereitungs-Countdown
    if(testProgress === 0){
        return (
            <div className="text-center">
                Bereite dich vor...
                <h1><CountDown duration={2} func={()=>{setTestProgress(testProgress+1)}}/></h1>
            </div>
        );
    }
    else if(testProgress <= nTests){
        let str = generateRandString();
        return (
            <>
                <div className="form-group">
                    <label htmlFor="test-1" className="concentration-test-text pb-2" style={{paddingLeft: '13px'}} >
                        {str.randString}
                    </label>
                    <input autoFocus className="concentration-test-text form-control" id="test-input" type="text" />
                </div>
                <p className="text-center mt-3">Test {testProgress} von {nTests} -
                    Zeit verbleibend: <CountDown duration={5} func={()=>{
                        // Räumt Inputfeld auf und startet Evaluierung
                        const inputField = document.getElementById('test-input');
                        let inputStr = inputField.value;
                        inputField.value = "";
                        evalInput(inputStr, str.solutionString, globTestProgress+testProgress);

                        setTestProgress(testProgress+1); // Beginnt nächsten Test
                    }}/> Sekunden</p>
            </>
        );
    }
    //return <Button handleClick={() => handleDivChange(testProgress)} isDisabled={false}>Weiter</Button>;
    handleDivChange(testProgress);
}

function CountDown({duration, func}){
    let [remTime, setRemTime] = useState(duration);


    const countTimeout = setTimeout(()=>{setRemTime(remTime-1);}, 1000);

    if (remTime !== 0){
        return <>{remTime}</>;
    }
    clearTimeout(countTimeout);
    setRemTime(duration); // Bereitet den Counter für den nächsten Aufruf vor
    return func();
}

function evalInput(input, solution, id){
    input = input.replaceAll(/\S/g, 'x');
    let aF = 0;
    let vF = 0;
    for(let i=0;i<input.length;i++){
        if(input[i]=== ' ' && solution[i] !== ' ') aF++;
        else if(input[i]!== ' ' && solution[i] === ' ') vF++;
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

function generateRandString(){
    const strLen = 56
    const characters = ['d', 'p']
    const modifiers = ['\u{0348}', '\u{030D}\u{0329}', '\u{030E}',
        '\u{0329}', '\u{030D}', '\u{030D}\u{0348}', '\u{030E}\u{0329}', '\u{030E}\u{0348}']

    let randString = "";
    let solutionString = "";

    for (let i=0;i<strLen;i++){
        let posCharacter = Math.floor(Math.random() * characters.length);
        let posModifier = Math.floor(Math.random() * modifiers.length);

        if(posCharacter === 0 && posModifier <= 2){
            solutionString += "x";
        } else{
            solutionString += " ";
        }
        randString += characters[posCharacter] + modifiers[posModifier];
    }
    return {solutionString, randString};
}