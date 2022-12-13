import {Button} from "./utils";
import {useState, useEffect} from "react";
import {CountDown} from "./utils";
import {generateRandString} from "./utils";
import {config} from "./Constants";
import {Component} from "react";

export default function Test({handleDivChange, globTestProgress, reps, duration, startState=0}){

    let [testProgress, setTestProgress] = useState(startState); // evtl. globTestProgress?
    let [currInput, setCurrInput] = useState("");
    let [str, setStr] = useState(generateRandString());
    let [remTime, setRemTime] = useState(config.testCountDown); // Countdown-Zeit ändern

    // Startet den Vorbereitungs-Countdown
    if(testProgress === -1){
        return <Button handleClick={()=> setTestProgress(testProgress+1)}>Test starten</Button>
    }
    if(testProgress === 0){
        if (remTime > 0){
            return (
                <div className="text-center">
                    Bereite dich vor...
                    <h1><CountDown remTime={remTime} setRemTime={setRemTime}/></h1>
                </div>
            );
        } else{
            // State updates werden gemerged?
            setRemTime(duration);
            setTestProgress(testProgress+1);
        }
    }
    else if(testProgress <= reps){
        // Passt auf Tastatureingaben auf


        if (remTime > 0){
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="test-1" className="concentration-test-text pb-2" style={{paddingLeft: '13px'}} >
                            {str.randString}
                        </label>
                        <TestInput currInput={currInput} setCurrInput={setCurrInput}/>
                    </div>

                    <p className="text-center mt-3">Test {testProgress} von {reps} -
                        Zeit verbleibend: <CountDown remTime={remTime} setRemTime={setRemTime}/> Sekunden</p>
                </>
            );
        } else{
            // Räumt Inputfeld auf und startet Evaluierung
            evalInput(currInput, str.solutionString, (globTestProgress-1) + testProgress); // globTestProgress ist 1 zu hoch
            setCurrInput("");

            // Bereitet für nächsten Durchlauf vor.
            setStr(generateRandString());// generiert neue Strings
            setRemTime(duration);
            setTestProgress(testProgress+1); // Beginnt nächsten Test
        }

    } else{
        handleDivChange(testProgress);
    }

}
export class TestInputC extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <div className="concentration-test-text form-control" id="test-input">{this.props.currInput}</div>

                <div className="mx-auto" style={{width: "fit-content"}}>
                    <Button color="success" handleClick={() => {this.props.setCurrInput(this.props.currInput + "x")}} extraClasses="x_">X</Button>
                    <Button color="danger" handleClick={() => {this.props.setCurrInput(this.props.currInput + "_")}} extraClasses="x_">_</Button>
                    <Button color="warning" handleClick={() => {this.props.setCurrInput(this.props.currInput.slice(0, -1))}} extraClasses="x_">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-backspace" viewBox="0 0 16 16">
                            <path
                                d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                            <path
                                d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                        </svg>
                    </Button>
                </div>
            </div>
        );
    }
}

export function TestInput({currInput, setCurrInput}){

    useEffect(()=>{
        window.onkeydown  = (e) => {
            if (e.code === "KeyX"){
                setCurrInput(currInput + "x");
            } else if (e.code === "Space"){
                setCurrInput(currInput + "_");
            } else if (e.code === "Backspace"){
                setCurrInput(currInput.slice(0, -1));
            }
        }
    })

    return(
        <div>
            <div className="concentration-test-text form-control" id="test-input">{currInput}</div>

            <div className="mx-auto" style={{width: "fit-content"}}>
                <Button color="success" handleClick={({target}) => {
                    setCurrInput(currInput + "x");
                    target.blur();
                }} extraClasses="x_">X</Button>
                <Button color="danger" handleClick={({target}) => {
                    setCurrInput(currInput + "_");
                    target.blur();
                }} extraClasses="x_">_</Button>
                <Button color="warning" handleClick={({target}) => {
                    setCurrInput(currInput.slice(0, -1));
                    target.blur();
                }} extraClasses="x_">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-backspace" viewBox="0 0 16 16">
                        <path
                            d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                        <path
                            d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                    </svg>
                </Button>
            </div>
        </div>
    )

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