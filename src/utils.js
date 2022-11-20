export function Button({handleClick, isDisabled=false, children}){
    return(
        <button className={"btn btn-primary d-block mx-auto mt-3" + (isDisabled ? " disabled" : "") }
                onClick={handleClick}>{children}</button>
    )
}