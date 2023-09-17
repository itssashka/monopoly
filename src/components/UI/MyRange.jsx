import React from "react";

const MyRange = ({min = 3, max = 6, value, setValue, title }) => {
    return (
        <div className="range">
            <div className="range_title">
                {title}
            </div>
            <input
                type="range"
                value={value}
                max={max}
                min={min}
                onChange={(e)=> setValue(e)}
            />
            <div className="range_value">
                {value}
            </div>
        </div>
    );
};

export default MyRange;
