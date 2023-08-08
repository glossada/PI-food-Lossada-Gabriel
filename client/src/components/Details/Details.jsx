import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { RECIPES} from '../../Utils/URL';
import style from "./Details.module.css";

export default function SearchBar(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    axios(`${RECIPES}${id}`).then(
      ({ data }) => {
        if (data.title) {
          
            setRecipe(data);
        } else {
          window.alert("No recipes found");
        }
      }
    );
    return setRecipe({});
  }, [id]);
   

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
        </div>
      </div>
   );
}