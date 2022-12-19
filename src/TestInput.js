import { Button } from "./utils";
import { useState, useEffect } from "react";

export default function TestInput({currInput, setCurrInput}){

    useEffect(()=>{
          window.onkeydown  = (e) => {
            if (e.code === "KeyX"){
                setCurrInput(currInput + "x");
            } else if (e.code === "Space"){
                e.preventDefault(); // Verhindert das Scrolling
                setCurrInput(currInput + "_");
            } else if (e.code === "Backspace"){
                setCurrInput(currInput.slice(0, -1));
            }
        }
    })

    return(
        <div className="mx-auto" style={{width: "fit-content"}}>
            <Button color="success" handleClick={({target}) => {
                setCurrInput(currInput + "x");
                target.blur(); // Nimmt den Fokus vom Button wieder weg.
                                // Damit wird verhindert, dass z.Bsp. <Space> auf den Button anstatt des Textes angewendet wird.
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
    )

}