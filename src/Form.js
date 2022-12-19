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
                <label className="" htmlFor="gender">Welches Geschlecht hast du?</label>
                <div className="">
                    <select className="form-control" id="gender" defaultValue="-">
                        <option value="w">weiblich</option>
                        <option value="m">männlich</option>
                        <option value="d">nicht-binär</option>
                        <option value="-">keine Angabe</option>
                    </select>
                </div>
            </div>
        </div>
    )

    let personData = JSON.parse(sessionStorage.getItem("personData"));
    if(personData === null || personData["mediaId"] === 1){
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
                        <select className="form-control" id="usedHeadphones" defaultValue="0">
                            <option value="0">Nein</option>
                            <option value="1">Ja</option>
                        </select>
                    </div>
                </div>
                <div className="form-group col-6">
                    <label className="" htmlFor="enjoyedMedia">Wie hat dir die Musik gefallen?</label>
                    <div className="">
                        <select className="form-control" id="enjoyedMedia" defaultValue="4">
                            <option value="4">Hat mir sehr gefallen</option>
                            <option value="3">Hat mir eher gefallen</option>
                            <option value="2">Hat mir eher nicht gefallen</option>
                            <option value="1">Hat mir überhaupt nicht gefallen</option>
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