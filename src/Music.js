import YouTube from "react-youtube";
import {CountDown, Button} from "./utils";
import {useState} from "react";
import {config} from "./Constants";

export default function Music({handleDivChange}){
    let mediaOptions = [{
        name: "Mozart",
        youtubeId: "OkFyG6Xg2i0"
    }, {
        name: "Quevedo",
        youtubeId: "FflHntvNFx4"
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
            <p>Please wait: {<CountDown duration={config.music.duration} func={() => {saveData(media["name"]); handleDivChange();}}/>} seconds remaining.</p>
        )
    }

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

function saveData(mediaName){
    let personData = JSON.parse(sessionStorage.getItem("personData"));
    if (personData === null) personData = {};

    personData.mediaName = mediaName;
    sessionStorage.setItem("personData", JSON.stringify(personData));
}
