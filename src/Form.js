import {Button} from "./utils";

export default function Form({handleDivChange}){
    return (
        <>
            <div className="row">
                <div className="form-group col-6">
                    <label className="" htmlFor="age">Alter</label>
                    <div className="">
                        <input className="form-control" type="number" id="age" min="5" max="99" required />
                    </div>
                </div>
                <div className="form-group col-6">
                    <label className="" htmlFor="gender">Geschlecht</label>
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
            <Button handleClick={() => {saveData(); handleDivChange();}}>Weiter</Button>
        </>
    )
}

function saveData(){
    let personData = JSON.parse(sessionStorage.getItem("personData"));

    if (personData === null) personData = {};

    personData.age = document.getElementById("age").value;
    personData.gender = document.getElementById("gender").value;

    sessionStorage.setItem("personData", JSON.stringify(personData));
}