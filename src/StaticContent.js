import {Button} from "./utils";

export function Introduction({handleDivChange}){
    return(
        <>
            <h1>Hallo</h1>
            <p>Das ist die Mozartstudie</p>
            <h1>Anleitung</h1>
            <p>So funktioniert's</p>
            <Button handleClick={handleDivChange}>Weiter</Button>
        </>
   );
}

export function Conclusion(){
    return(
        <>
            <h1>Tschüss</h1>
            <p>Vielen Dank für deine Teilnahme</p>
            <p>Du kannst dieses Fenster jetzt schließen.</p>
        </>
    );
}