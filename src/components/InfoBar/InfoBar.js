import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import "./InfoBar.css";

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} className="onlineIcon" alt="online images" />
      <h3>{room}</h3>
    </div>
    <div className="RightInnerContainer">
      <a href="/">
        <img src={closeIcon} className="closeIcon" alt="close Images" />
      </a>
    </div>
  </div>
);

export default InfoBar;
