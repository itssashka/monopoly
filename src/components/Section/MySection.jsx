import React from "react";
import Line from "../UI/Line";

const MySection = ({ title, children }) => {
    return (
        <div className="section">
            <div className="section_title">{title}</div>
            <Line />
            {children}          
        </div>
    ); 
};

export default MySection;
