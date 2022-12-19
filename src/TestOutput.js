
export default function TestOutput({currInput, renderedStrL, renderedStrR}){
    return (
        <div className="form-control" style={{position: "relative"}}>
            <div id="nextActiveInputHighlighter"></div>
            <div className="concentration-test-text pb-2">
                <span className="concentration-test-text-left">
                    <div style={{float: "right"}}>
                        {renderedStrL}
                    </div>
                </span>
                <span className="concentration-test-text-right">
                    <div style={{float: "left"}}>
                        {renderedStrR}
                    </div>
                </span>
            </div>
            <div className="concentration-test-text" id="test-input">
                <span className="concentration-test-text-left">
                    <div style={{float: "right"}}>
                        {currInput}
                    </div>
                </span>
            </div>
        </div>
    )
}