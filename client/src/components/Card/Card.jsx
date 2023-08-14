import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../redux/actions";

const Card = (props) =>{
    const [isFromBd ,setIsFromBd]=useState(true);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(Number.isInteger(Number(props.id))){
          setIsFromBd(false)
        }
      },[props.id])

    const onClose=(id)=>{
        dispatch(deleteRecipe(id))
    }

    return (
        <div className={style.container}>
            {isFromBd ? (<button className={style.button} onClick={() => onClose(props.id)}>
                 X 
            </button>):(<p></p>)}
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