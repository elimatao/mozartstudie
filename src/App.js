import Test from "./Test";  // Führt den Konzentrationstest durch
import Form from "./Form";
import Music from "./Music";
import {Introduction, Conclusion} from "./StaticContent";

import {useState} from "react";

export default function App() { // "export default" Macht die Funktion für andere Module verfügbar und zur Hauptfunktion des Moduls.
    const [activeDiv, setActiveDiv] = useState(3); // 2 ist gedacht, damit der Test als erstes erscheint.
    const [globTestProgress, setGlobTestProgress] = useState(0);

    // Struktur der Studie
    const divs = [{
        id: 0,
        children: <Introduction handleDivChange={changeDiv}/>
    }, {
        id: 1,
        children: <Test handleDivChange={exitTest} globTestProgress={globTestProgress}/>
    }, {
        id: 2,
        children: <Music handleDivChange={changeDiv}/>
    }, {
        id: 3,
        children: <Test handleDivChange={exitTest} globTestProgress={globTestProgress}/>
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
        request.open('POST', `https://localhost:8080/mozartstudie`);


        const data = {};
        data.testData = sessionStorage.getItem('testData');
        data.personData = sessionStorage.getItem('personData');
        request.send(data);

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