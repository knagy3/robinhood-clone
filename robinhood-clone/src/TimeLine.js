import React, {useState} from 'react';
import "./TimeLine.css";
import { useStateValue } from './StateProvider';

function TimeLine() {
    const [{}, dispatch] = useStateValue();
    const [state, setState] = useState("W");

    const handleClick = (date) => {
        setState(date);
        dispatch({
            type: "SET_DATE",
            choosedDate: date,
        });
    };
    
    return (
        <div className="timeline__container">
            <div className="timeline__buttons__container">
                {/*<div className={ state ? "timeline__button" : "timeline__button active"} onClick={() => handleClick("D")}>LIVE</div>*/}
                <div className={ state==="D" ? "timeline__button active" : "timeline__button "} onClick={() => handleClick("D")}>1D</div>
                <div className={ state==="W" ? "timeline__button active" : "timeline__button "} onClick={() => handleClick("W")}>1W</div>
                <div className={ state==="M" ? "timeline__button active" : "timeline__button "} onClick={() => handleClick("M")}>1M</div>
                <div className={ state==="Y" ? "timeline__button active": "timeline__button "} onClick={() => handleClick("Y")}>1Y</div>                                                                    
            </div>
        </div>
    )
}

export default TimeLine;
