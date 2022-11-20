import Test from "./Test";  // Führt den Konzentrationstest durch
import Form from "./Form";
import Music from "./Music";
import {Introduction, Conclusion} from "./StaticContent";

import {useState} from "react";

import { config } from "./Constants"

export default function App() { // "export default" Macht die Funktion für andere Module verfügbar und zur Hauptfunktion des Moduls.
    const [activeDiv, setActiveDiv] = useState(config.startDiv); // 2 ist gedacht, damit der Test als erstes erscheint.
    const [globTestProgress, setGlobTestProgress] = useState(0);

    // Struktur der Studie
    const divs = [{
        id: 0,
        children: <Introduction handleDivChange={changeDiv}/>
    }, {
        id: 1,
        children: <Test handleDivChange={exitTest} globTestProgress={globTestProgress} reps={config.test1.reps} duration={config.test1.duration}/>
    }, {
        id: 2,
        children: <Music handleDivChange={changeDiv}/>
    }, {
        id: 3,
        children: <Test handleDivChange={exitTest} globTestProgress={globTestProgress} reps={config.test2.reps} duration={config.test2.duration} startState={-1}/>
    }, {
        id: 4,
        children: <Form handleDivChange={terminateTest}/>
    }, {
        id: 5,
        children: <Conclusion />
    }];

    // Regelt den Abschnittwechsel visuell
    function changeDiv(){
        setActiveDiv(activeDiv + 1);
    }
    function exitTest(locTestProgress){
        setGlobTestProgress(globTestProgress + locTestProgress);
        changeDiv();
    }
    function terminateTest(){
        // Sendet die Daten an den Server
        const request = new XMLHttpRequest();
        request.open('POST', `${config.url}mozartstudie`);


        const data = {};
        data.testData = JSON.parse(sessionStorage.getItem('testData'));
        data.personData = JSON.parse(sessionStorage.getItem('personData'));
        request.send(JSON.stringify(data));
        sessionStorage.clear();
        changeDiv();
    }

    function renderActiveDiv(div){
        return (
            <Div key={div.id} isActive={true}>
                {div.children}
            </Div>
        );
    }


    // Rendert die gesamte App
    return (
        <div className="App my-auto">
            {renderActiveDiv(divs[activeDiv])}
        </div>
  );
}

function Div({ children, isActive=false}) {

    return (
        <div className={"section" + (isActive ? " active" : "")}>
            {children}
        </div>
    );
}