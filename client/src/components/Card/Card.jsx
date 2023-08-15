import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../redux/actions";

const Card = (props) =>{
    const [isFromBd ,setIsFromBd]=useState(true);
    const [confirmDel,setConfirmDel]=useState(false)
    const dispatch=useDispatch();

    useEffect(()=>{
        if(Number.isInteger(Number(props.id))){
          setIsFromBd(false)
        }
      },[props.id])

    const onX=()=>{
        setConfirmDel(true)
    }

    const onNo=()=>{
      setConfirmDel(false)
    }

    const onYes=(id)=>{
      dispatch(deleteRecipe(id))
      setConfirmDel(false)
    }



    return (
        <div className={style.container}>
            {isFromBd ? (<button className={style.button} onClick={() => onX()}>
                 X 
            </button>):(<p></p>)}
            {confirmDel ? (
    <div>
        <p className={style.message}>Do you want to delete this recipe?</p>
        <button className={style.button} onClick={() => onNo()}>No</button>
        <button className={style.button} onClick={() => onYes(props.id)}>Yes</button>
    </div>
) : (<p></p>)}
            <Link className={style.link} to={`/detail/${props.id}`}>
            <div className={style.titleCon}>
            <h2 className={style.title}>{props.title}</h2>
            </div>
            </Link>
            <h4 className={style.heatlScore}>Healt score: {props.healthScore}</h4>
            <img className={style.image}  src={props.image} alt="" />
            <div className={style.dietsContainer}>
            <div className={style.diets}>
            {props.diets.map((diet,index) =>{
                return <li key={index}>{diet}</li>
            })}
            </div>
            </div>

        </div>
      );
}

export default Card;