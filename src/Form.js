import {Button} from "./utils";

export default function Form({handleDivChange}){
    var baseForm = (
        <div className="row">
            <div className="form-group col-6">
                <label className="" htmlFor="age">Wie alt bist du?</label>
                <div className="">
                    <input className="form-control" type="number" id="age" min="5" max="99" required />
                </div>
            </div>
            <div className="form-group col-6">
                <label className="" htmlFor="gender">Was ist dein Geschlecht?</label>
                <div className="">
                    <select className="form-control" id="gender">
                        <option value="w">Weiblich</option>
                        <option value="m">Männlich</option>
                        <option value="d">Divers</option>
                        <option value="" selected>keine Angabe</option>
                    </select>
                </div>
            </div>
        </div>
    )

    let personData = JSON.parse(sessionStorage.getItem("personData"));
    if(personData === null || personData["mediaName"] === ""){
        return (
            <>
                {baseForm}
                <Button handleClick={() => {saveData(); handleDivChange();}}>Weiter</Button>
            </>

        )
    }
    return (
        <>
            {baseForm}

            <div className="row">
                <div className="form-group col-6">
                    <label className="" htmlFor="usedHeadphones">Hast du Kopfhörer verwendet?</label>
                    <div className="">
                        <select className="form-control" id="usedHeadphones">
                            <option value="0" selected>Nein</option>
                            <option value="1">Ja</option>
                        </select>
                    </div>
                </div>
                <div className="form-group col-6">
                    <label className="" htmlFor="enjoyedMedia">Wie hat dir die Musik gefallen?</label>
                    <div className="">
                        <select className="form-control" id="enjoyedMedia">
                            <option value="5" selected>Hat mir sehr gefallen</option>
                            <option value="4">OK</option>
                            <option value="3">Besser als Unterricht</option>
                            <option value="2">Laaaangweilig</option>
                            <option value="1">Schlimmste Zeit meines Lebens</option>
                        </select>
                    </div>
                </div>
            </div>
            <Button handleClick={() => {saveData(); handleDivChange();}}>Weiter</Button>
        </>
    )
}

function saveData(){
    let personData = JSON.parse(sessionStorage.getItem("personData"));

    if (personData === null) personData = {};

    personData.age = document.getElementById("age").value;
    personData.gender = document.getElementById("gender").value;
    try{
        personData.usedHeadphones = document.getElementById("usedHeadphones").value;
        personData.enjoyedMedia = document.getElementById("enjoyedMedia").value;
    } catch (e) {
        personData.usedHeadphones = null;
        personData.enjoyedMedia = null;
    }

    sessionStorage.setItem("personData", JSON.stringify(personData));
}