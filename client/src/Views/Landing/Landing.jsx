import React from "react";
import style from "./Landing.module.css";

const Landing = (props) =>{

    const handleClick = (event) => {
        event.preventDefault();
        props.getIn();
      };

    return (
        <div className={style.container}>
            <div>
            <h1>Super FOOD APP for dumb people</h1>
            </div>
            <div>
            <button onClick={handleClick}>JUMP IN!</button>
            </div>

        </div>
      );
}

export default Landing;