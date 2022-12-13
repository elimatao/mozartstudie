import YouTube from "react-youtube";
import {config} from "./Constants";
import {useEffect, useState} from "react";

export default function Music({handleDivChange}){

    let mediaOptions = [{
        name: "Zauberflöte",
        youtubeId: "FncKQV-jTpM",
        id: 4
    }, {
        name: "Innuendo",
        youtubeId: "lD5J-lroElM",
        id: 3
    }, {
        name: "Quevedo",
        youtubeId: "YGKMcq7srCU",
        id: 2,
        end: "360"
    }, {
        name: "",
        youtubeId: "",
        id: 1
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

    if (media["id"] === 1){
        return (
            <MusicCountDown handleDivChange={()=>{
                saveData(media["id"]);
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
                onEnd={() => {saveData(media["id"]); handleDivChange();}}
                // host="https://www.youtube-nocookie.com" --- Geht leider nicht.
                style={{borderRadius: ".375rem",border: "1px solid black", background: "black"}}
            />
        </>
    )
}

function MusicCountDown({handleDivChange}){
    let [remTime, setRemTime] = useState(config.music.duration);

    useEffect(()=>{
        if(remTime>0){
            setTimeout(()=>setRemTime(remTime-1), 1000);
        } else{
            handleDivChange();
        }
    })

    return <p>Bitte warte: {remTime} Sekunden verbleibend.</p>
}

function saveData(mediaId){
    let personData = JSON.parse(sessionStorage.getItem("personData"));
    if (personData === null) personData = {};

    personData.mediaId = mediaId;
    sessionStorage.setItem("personData", JSON.stringify(personData));
}
