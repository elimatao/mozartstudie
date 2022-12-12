import YouTube from "react-youtube";
import {CountDown, Button} from "./utils";
import {config} from "./Constants";
import {useState} from "react";

export default function Music({handleDivChange}){

    let mediaOptions = [{
        name: "Mozart",
        youtubeId: "FncKQV-jTpM"
    }, {
        name: "Quevedo",
        youtubeId: "YGKMcq7srCU",
        end: "360"
    },{
        name: "Queen",
        youtubeId: "lD5J-lroElM"
    }, {
        name: "",
        youtubeId: ""
    }];

    const opts = {
        width: "100%",
        height: "256px", // 128px
        playerVars: {
            start: "0",
            controls: config.music.controls
        }
    };

    const mediaIndex = Math.floor(Math.random() * mediaOptions.length)
    const media = (mediaOptions[mediaIndex]);

    if (media["name"] === ""){
        return (
            <MusicCountDown handleDivChange={()=>{
                saveData(media["name"]);
                handleDivChange();
            }} />
        )
    }
    try{
        opts.playerVars.end = media["end"];
    } catch (e){}

    return (
        <>
            <p>Bitte setze deine Kopfhörer auf...</p>
            <YouTube
                videoId={media["youtubeId"]}
                title={media["name"]}
                opts={opts}
                onEnd={() => {saveData(media["name"]); handleDivChange();}}
                // host="https://www.youtube-nocookie.com" --- Geht leider nicht.
                style={{borderRadius: ".375rem",border: "1px solid black", background: "black"}}
            />
        </>
    )
}

function MusicCountDown({handleDivChange}){
    let [remTime, setRemTime] = useState(config.music.duration);

    if (remTime > 0){
        return (
            <p>Bitte warte: {<CountDown remTime={remTime} setRemTime={setRemTime}/>} Sekunden verbleibend.</p>
        )
    } else {
        handleDivChange();
    }
}

function saveData(mediaName){
    let personData = JSON.parse(sessionStorage.getItem("personData"));
    if (personData === null) personData = {};

    personData.mediaName = mediaName;
    sessionStorage.setItem("personData", JSON.stringify(personData));
}
