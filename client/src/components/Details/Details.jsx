import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RECIPES} from '../../Utils/URL';
import style from "./Details.module.css";
import { Link } from "react-router-dom";
import { MODIFY } from "../../Utils/ROUTES"; 
import { getRecipesById } from "../../redux/actions";
import loadingGif from '../img/ee1d081c5bdf966b058c1a6588e73e8a.gif';

export default function SearchBar(props) {
  const { id } = useParams();
  const recipeById= useSelector((state) => state.recipeById);
  const[recipe,setRecipe]=useState({})
  const [isFromBd ,setIsFromBd]=useState(true);
  const dispatch = useDispatch();


  
  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [id]);

  useEffect(() => {
    setRecipe(recipeById)
  }, [recipeById]);
   
  useEffect(()=>{
    if(Number.isInteger(Number(id))){
      setIsFromBd(false)
    }
  },[id])

  /*if (recipe) {
    return <div>
       <img className={style.loadinGif} src={loadingGif} alt="Cargando..." />
       <h2>Cargando...</h2>
    </div>;
  }*/


   return (
      <div className={style.outside}>
        <div className={style.container}>
          <div className={style.titleCon}>
         <h1 className={style.title}>{recipe.title}</h1>
         </div>
         <img className={style.image} src={recipe.image} alt="" />
         <div className={style.idHealthCon}>
         <div className={style.idHealth}>
         <h4>ID: {recipe.id}</h4>
         <h4>Health score: {recipe.healthScore}</h4>
         </div>
         </div>
         <div className={style.dietsContainer}>
        <div className={style.diets}>
        <h4 className={style.dieTitle}>Diets:</h4>
         {recipe.diets && Array.isArray(recipe.diets) && (
  <ul>
    {recipe.diets.map((diet, index) => (
      <li key={index}>{diet}</li>
    ))}
  </ul>
)}
</div>
</div>
        <div className={style.conText}>
          <div className={style.tooMuchText}>
            <div className={style.summary}>
        <h4>Summary:</h4>
        <p className={style.text} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
            <div className={style.instructions}>
        <h4>Instructions:</h4>
        <p className={style.text} dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          </div>
        </div>
        <div className={style.modify}>
        {isFromBd ? (
                <Link className={style.link} to={`${MODIFY}/${id}`}>
                    <h1 className={style.title}>Modify Recipe</h1>
                </Link>
            ) : (
                <p></p>
            )}
        </div>
        </div>
      </div>
   );
}