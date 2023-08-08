import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) =>{

   

    return (
        <div className={style.container}>
            <Link className={style.link} to={`/detail/${props.id}`}>
            <div className={style.titleCon}>
            <h2 className={style.title}>{props.title}</h2>
            </div>
            </Link>
            <h4 className={style.heatlScore}>Healt score: {props.healthScore}</h4>
            <img className={style.image}  src={props.image} alt="" />
            <div className={style.dietsContainer}>
            <div className={style.diets}>
            {props.diets.map(diet =>{
                return <li key={diet.id}>{diet}</li>
            })}
            </div>
            </div>

        </div>
      );
}

export default Card;