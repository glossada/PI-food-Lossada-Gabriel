import React from "react";
import { Link } from "react-router-dom";

const Card = (props) =>{

   

    return (
        <div >
            <Link to={`/detail/${props.id}`}>
            <h2>{props.title}</h2>
            </Link>
            <h4>{props.healthScore}</h4>
            <img  src={props.image} alt="" />
            {props.diets.map(diet =>{
                return <li key={diet.id}>{diet}</li>
            })}
            

        </div>
      );
}

export default Card;