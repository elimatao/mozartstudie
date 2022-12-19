import {useEffect, useState} from "react";
import {Button} from "./utils";
import TestInput from "./TestInput";
import TestOutput from "./TestOutput";

export default function Introduction({handleDivChange}){
    let [inputCorrect, setInputCorrect] = useState(false);
    return(
        <div style={{maxWidth: "1096px"}}>
            <h1>Hallo und willkommen zu dieser Studie!</h1>
            <p>Vielen Dank dafür, dass du dir die Zeit nimmst, an dieser Studie teilzunehmen. Damit trägst du direkt zum Fortschritt der Wissenschaft bei.
                Wir wollen nämlich herausfinden, ob Musik einen Einfluss auf unsere Konzentrationsleistung hat.
            </p>
            Dazu gehen wir folgenderweise vor:
                <ol>
                    <li>Du führst einen Konzentrationstest durch, mehr dazu gleich.</li>
                    <li>Du wartest für einige Minuten in Stille oder hörst Musik. Bitte verwende dazu Kopfhörer.</li>
                    <li>Du führst den Konzentrationstest noch einmal durch.</li>
                    <li>Du beantwortest ein paar Fragen.</li>
                    <li>Wir werten die Daten aus und veröffentlichen hier bald unsere Ergebnisse. Alles ist natürlich komplett <b>anonym</b>.</li>
                </ol>

            <h2>So funktioniert der Test</h2>
            <p>Du bekommst in kurzer Zeit hintereinander mehrere Eingabefelder so wie dieses hier:</p>

            <IntroductionTest setInputCorrect={setInputCorrect}/>

            <br />
            <p>
                Du musst dann so schnell wie möglich die Zeichen markieren. Alle "d" mit zwei Strichen,
                also <span className={"concentration-test-text"}>d&#782;,d&#840;</span>oder <span className={"concentration-test-text"}>d&#781;&#809;</span>,
                müssen mit einem <span className="bg-success rounded px-2 pb-1 text-white">x</span> markiert werden (Das kannst du mit der Tastatur oder den Knöpfen machen.).
                Alle anderen Zeichen müssen mit einem <span className="bg-danger rounded px-2 pb-1 text-white">_</span> (Leerzeichen) markiert werden.
                Löschen kannst du die Markierungen mit <span className="bg-warning rounded px-2 pb-1 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                         className="bi bi-backspace" viewBox="0 0 16 16">
                        <path
                            d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                        <path
                            d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                    </svg></span>.

            </p>
            <p>
                Probiere das in dem Feld oben aus. Sobald du fertig bist und dein Ergebnis richtig ist, klicke auf "Test beginnen".
            </p>


            Wir werden messen, wie gut es dir gelingt, die Buchstaben richtig zu markieren.

            <Button handleClick={handleDivChange} isDisabled={!inputCorrect}>Verstanden, Test beginnen</Button>
        </div>
    );
}


function IntroductionTest({setInputCorrect}){
    const [currInput, setCurrInput] = useState("");
    
    let inputCorrect = true;

    const solutionStr = "__x___x____x___";
    
    // d&#782;&#809;p&#781;&#809;d&#782;p&#809;p&#782;&#840;d&#781;d&#781;&#809;p&#782;p&#781;d&#782;&#809;d&#782;&#840;d&#840;d&#782;&#840;p&#781;&#809;p&#782;
    // String, zur Übung
    const str = ["d\u{30E}\u{329}", "p\u{30D}\u{329}", "d\u{30E}", "p\u{329}", "p\u{30E}\u{348}", "d\u{30D}", "d\u{30D}\u{329}",
        "p\u{30E}", "p\u{30D}", "d\u{30E}\u{329}", "d\u{30E}\u{348}", "d\u{348}", "d\u{30E}\u{348}", "p\u{30D}\u{329}", "p\u{30E}"];

    var renderedStrL = [];
    var renderedStrR = [];
    
    str.map((c, i)=>{  // c: Objekt aus der Liste, i: Listenindex
        if(currInput[i] === undefined){
            renderedStrR.push(<span key={i}>{c}</span>);
            inputCorrect = false;
        }
        
        else if(currInput[i] === solutionStr[i]){
            renderedStrL.push(<span key={i} className={"text-success"}>{c}</span>);
        }
        else{
            renderedStrL.push(<span key={i} className={"text-danger"}>{c}</span>);
            inputCorrect = false;
        }
    })


    useEffect(()=>{
        setInputCorrect(inputCorrect);
    }, [inputCorrect]);
    
    useEffect(()=>{
        setCurrInput(currInput.slice(0, str.length));
    }, [currInput])

    return(
        <div className="form-group">
            <TestOutput currInput={currInput} renderedStrL={renderedStrL} renderedStrR={renderedStrR}/>
            <TestInput currInput={currInput} setCurrInput={setCurrInput} />
        </div>
    );
}