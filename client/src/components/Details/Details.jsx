import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { RECIPES} from '../../Utils/URL';

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
      <div >
         <h1>ID: {recipe.id}</h1>
         <h1>Title: {recipe.title}</h1>
         <img src={recipe.image} alt="" />
         <h4>{recipe.healthScore}</h4>
         <h4>Diets:</h4>
         {recipe.diets && Array.isArray(recipe.diets) && (
  <ul>
    {recipe.diets.map((diet, index) => (
      <li key={index}>{diet}</li>
    ))}
  </ul>
)}
        <h4>Summary:</h4>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <h4>Instructions:</h4>
        <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
   );
}