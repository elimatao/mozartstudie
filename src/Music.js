import YouTube from "react-youtube";

export default function Music({handleDivChange}){
    var mediaOptions = [{
        name: "Mozart",
        youtubeId: "OkFyG6Xg2i0"
    }, {
        name: "Quevedo",
        youtubeId: "FflHntvNFx4"
    },{
        name: "Queen",
        youtubeId: "lD5J-lroElM"
    }]

    const opts = {
        width: "100%",
        height: "256px", // 128px
        playerVars: {
            start: "0",
            controls: 2,
        }
    }

    return (
        <>
            <p>Bitte setze deine Kopfhörer auf...</p>
            <YouTube
                videoId={mediaOptions[0]["youtubeId"]}
                title={mediaOptions[0]["name"]}
                opts={opts}
                onEnd={() => {saveData(mediaOptions[0]["name"]); handleDivChange();}}
                // host="https://www.youtube-nocookie.com" --- Geht leider nicht.
                style={{borderRadius: ".375rem",border: "1px solid black", background: "black"}}
            />
        </>
    )
}

function saveData(mediaName){
    let personData = JSON.parse(sessionStorage.getItem("personData"));
    personData.mediaName = mediaName;
    sessionStorage.setItem("personData", JSON.stringify(personData));
}




