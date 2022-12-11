import {Button} from "./utils";
import {generateRandString} from "./utils";
import {useState} from "react";

export function Introduction({handleDivChange}){
    const [inputStr, setInputStr] = useState("");
    const solutionStr = "  x   x    x   ";
    // d&#782;&#809;p&#781;&#809;d&#782;p&#809;p&#782;&#840;d&#781;d&#781;&#809;p&#782;p&#781;d&#782;&#809;d&#782;&#840;d&#840;d&#782;&#840;p&#781;&#809;p&#782;
    const str = ["d\u{30E}\u{329}", "p\u{30D}\u{329}", "d\u{30E}", "p\u{329}", "p\u{30E}\u{348}", "d\u{30D}", "d\u{30D}\u{329}",
        "p\u{30E}", "p\u{30D}", "d\u{30E}\u{329}", "d\u{30E}\u{348}", "d\u{348}", "d\u{30E}\u{348}", "p\u{30D}\u{329}", "p\u{30E}"];

    let inputCorrect = true;

    var renderedStr = str.map((c, i)=>{
        if(inputStr[i] === solutionStr[i]){
            return <span className={"text-success"}>{c}</span>;
        }
        else{
            inputCorrect = false;
            return <span className={"text-danger"}>{c}</span>;
        }
    })

    return(
        <div style={{maxWidth: "1096px"}}>
            <h1>Hallo und willkommen zu dieser Studie!</h1>
            <p>Vielen Dank dafür, dass du dir die Zeit nimmst, an dieser Studie teilzunehmen. Damit trägst du direkt zum Fortschritt der Wissenschaft bei.
                Wir wollen nämlich herausfinden, ob Musik einen Einfluss auf unsere Konzentrationsleistung hat.
            </p>
            <p>Dazu gehen wir folgenderweise vor:
                <ol>
                    <li>Du führst einen Konzentrationstest durch, mehr dazu gleich.</li>
                    <li>Du wartest für einige Minuten in Stille oder hörst Musik. Bitte verwende dazu Kopfhörer.</li>
                    <li>Du führst den Konzentrationstest noch einmal durch.</li>
                    <li>Du beantwortest ein paar Fragen.</li>
                    <li>Wir werten die Daten aus und veröffentlichen hier bald unsere Ergebnisse. Alles ist natürlich komplett <b>anonym</b>.</li>
                </ol>
            </p>
            <h2>So funktioniert der Test</h2>
            <p>Du bekommst in kurzer Zeit hintereinander mehrere Eingabefelder so wie dieses hier:</p>

            <div className="form-group">
                <label htmlFor="test-1" className="concentration-test-text pb-2" style={{paddingLeft: '13px'}} >
                    {renderedStr}
                </label>
                <input autoFocus className="concentration-test-text form-control" id="test-input" type="text" onKeyUp={()=>{
                    setInputStr(document.getElementById("test-input").value);
                }}/>
            </div>
            <br />
            <p>
                Alle "d" mit zwei Strichen, also <span className={"concentration-test-text"}>d&#782;,d&#840;</span>oder <span className={"concentration-test-text"}>d&#781;&#809;</span>
                müssen so schnell wie möglich mit einem "x" markiert werden. Alle anderen werden durch Drücken der Leertaste übersprungen. Probiere das in dem Feld oben aus.
            </p>
            Wir werden messen, wie gut es dir gelingt, die Buchstaben richtig zu markieren.

            <Button handleClick={handleDivChange} isDisabled={!inputCorrect}>Verstanden, Test beginnen</Button>
        </div>
    );
    return(
        <>
            <h1>Willkommen zum Konzentrationstest!</h1>

            <p>Dieser Test ist ein d2-Test. Das bedeutet, dass du versuchen musst,
                in kürzester Zeit so viele ds mit zwei Strichen wie möglich zu markieren.
                BITTE BEACHTE: Es können sowohl zwei Striche oben oder zwei Striche unten als auch ein Strich oben und ein Strich unten sein!
                Weitere Zeichen, die auftauchen können, sind ds mit jeweils ein, drei oder vier Strichen
                oder ps mit ein, zwei, drei oder vier Strichen.</p>

            <p>FOTO (am besten direkt ein Screenshot von einem gemachten Test)</p>

            <p>Der Test ist in 14 Zeilen mit jeweils 56 Zeichen aufgeteilt. Dabei hast du für jede Zeile 10 Sekunden Zeit.
                Danach wird automatisch auf die nächste gewechselt. Um die ds mit zwei Strichen zu markieren,
                kannst du jeden beliebigen Buchstaben drücken. Um ein Zeichen zu überspringen, drücke die Leertaste.
                Versuche keine Fehler zu machen und keine ds mit zwei Strichen zu überspringen. Sollte das doch passieren,
                mache einfach weiter.</p>

            <p>Danach wirst du ca. 6 Minuten lang Musik drei verschiedener Stilrichtungen hören oder in Stille verbringen.
                Was du hörst, wird zufällig generiert. Anschließend wird der Test wiederholt.</p>

            <Button handleClick={handleDivChange}>Weiter</Button>
        </>
   );
}

export function Conclusion(){
    return(
        <>
            <h1>Vielen Dank für deine Teilnahme!</h1>
            <p>Du kannst dieses Fenster jetzt schließen.</p>
        </>
    );
}