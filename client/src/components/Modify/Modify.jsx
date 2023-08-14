import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { validations,validateAll } from '../Form/validations'
import {modRecipe} from '../../redux/actions'
import style from "./Modify.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RECIPES} from '../../Utils/URL';

const Modify = (props) => {
    const { id } = useParams();
    const diets=useSelector((state)=> state.diets);
    const recipes=useSelector((state)=> state.recipes);
    const dispatch = useDispatch();
    const [newRecipe,setNewRecipe]=useState({})
    const [errors, setErrors] = useState({});


    useEffect(() => {
        axios(`${RECIPES}${id}`).then(
          ({ data }) => {
            if (data.title) {
                let recipe = data;
                recipe.diets=[]
                setNewRecipe(data);
            } else {
              window.alert("No recipes found");
            }
          }
        );
        return setNewRecipe({});
      }, [id]);

  
    const handleChecked = function (e) {
      if (e.target.checked) {
        setNewRecipe({
          ...newRecipe,
          diets: [...newRecipe.diets, e.target.id],
        });
      } else {
        setNewRecipe({
          ...newRecipe,
          diets: [...newRecipe.diets].filter((diet) => e.target.id !== diet),
        });
      }
    };

    const handleChange = (event) =>{
    const property = event.target.name;
    const value = event.target.value;
    
     setNewRecipe({ ...newRecipe, [property]: value });
     setErrors(validations({ ...newRecipe, [property]: value }));
     
    

    }
  
    const handleSubmit = (e) => {
      e.preventDefault();

    const emptyErrors=validateAll(newRecipe);
  
      if (Object.keys(errors).length > 0) {
        const errorMessages = Object.values(errors).join('\n');
        alert('The following errors were found:\n' + errorMessages);
        return;
      }

      if(emptyErrors.exist===true){
        const errorMessages = Object.values(emptyErrors).join('\n');
          alert('The following errors were found:\n' + errorMessages);
          return;
      }

      
      
      const recipe=newRecipe;
      
      dispatch(modRecipe(recipe));
      alert('la receta se agrego correctamente');
      setNewRecipe({
        title: '',
        image: '',
        healthScore: 0,
        summary: '',
        instructions: '',
        diets: [],
      });
    
      
      
      
    };
  
    return (
        <div className={style.outside}>
          <div className={style.container}>
        <h1 className={style.title}>Modify Recipe:</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.shortTextContainer}>
          <div className={style.shortText}>
        <div>
          <label className={style.label} htmlFor="title">Title: </label>
          <input className={style.input} type="text" name='title' value={newRecipe.title} onChange={handleChange} />
          <span className={style.error}>{errors.title}</span>
        </div>
        <div>
          <label className={style.label}>Image URL: </label>
          <input className={style.input} type="text" name="image" value={newRecipe.image} onChange={handleChange} />
          <span className={style.error}>{errors.image}</span>
        </div>
        <div>
          <label className={style.label}>Health Score: </label>
          <input className={style.input} type="number" name="healthScore" value={newRecipe.healthScore} onChange={handleChange} />
          <span className={style.error}>{errors.healthScore}</span>
        </div>
        </div>
        </div>
        <div>
          <h4 className={style.label}>Image Preview</h4>
            {newRecipe.image && newRecipe.image.length > 0 ? (
                <img className={style.image} src={newRecipe.image} alt="Imagen" />
            ) : (
                <p>---</p>
            )}
        </div>
        <div className={style.dietsCon}>
          <div className={style.dietsBox}>
          <label className={style.label}>Diets:</label>
          <div className={style.diets}>
          {diets.length > 0 &&
									diets.map((diet) => (
										<label
											htmlFor={diet.id}
										>
											<input
												key={diet.id}
												id={diet.id}
												type='checkbox'
												name={diet.name
													.toLowerCase()
													.replace(' ', '')
													.replace('-', '')}
												onChange={handleChecked}
											/>
											{diet.name}
										</label>
									))}
            </div>
            </div>
        </div>
        <div className={style.longTextCon}>
          <div className={style.longText}>
        <div>
          <div>
          <label className={style.label}>Summary:</label>
          </div>
          <textarea className={style.textArea} value={newRecipe.summary} name="summary" onChange={handleChange} />
          <h4 className={style.error}>{errors.summary}</h4>
        </div>
        <div>
          <div>
          <label className={style.label}>Instructions:</label>
          </div>
          <textarea className={style.textArea} value={newRecipe.instructions} name="instructions" onChange={handleChange} />
          <h4 className={style.error}>{errors.instructions}</h4>
        </div>
        <button className={style.submitButton} type="submit">Submit</button>
        </div>
        </div>
      </form>
      </div>
      </div>
    );
  };
  
  export default Modify;