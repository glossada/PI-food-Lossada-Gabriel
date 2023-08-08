import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { validateTitle, validateImage,validateHealthScore,validateInstructions,validateSummary } from './validations'
import {addRecipe} from '../../redux/actions'
import style from "./Form.module.css";

const Form = (props) => {
    const diets=useSelector((state)=> state.diets);
    const dispatch = useDispatch();

    const [newRecipe,setNewRecipe]=useState({
        title:'',
        image:'',
        healthScore:0,
        summary:'',
        instructions:'',
        diets:[],

    })
    const [errors, setErrors] = useState({});


  
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

     if (property === "title") {
      const error= validateTitle({ ...newRecipe, [property]: value });
      setErrors({...errors, title:error.title});
     }

     if (property === "image") {
       const error= validateImage({ ...newRecipe, [property]: value });
       setErrors({...errors, image:error.image});
     }

      if (property === "healthScore") {
       const error= validateHealthScore({ ...newRecipe, [property]: value });
       setErrors({...errors, healthScore:error.healthScore});
      }

      if (property === "summary") {
       const error= validateSummary({ ...newRecipe, [property]: value });
       setErrors({...errors, summary:error.summary});
      }

      if (property === "instructions") {
       const error= validateInstructions({ ...newRecipe, [property]: value });
      setErrors({...errors, instructions:error.instructions});
      }

    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes hacer lo que necesites con los datos del formulario,
      // como enviarlos a un servidor o realizar alguna acción con ellos.
      if (Object.keys(errors).length > 0) {
        const errorMessages = Object.values(errors).join('\n');
        alert('Se encontraron los siguientes errores:\n' + errorMessages);
        return;
      }
      
      const recipe=newRecipe;
      
      dispatch(addRecipe(recipe));
      alert('la receta se agrego correctamente');
      setNewRecipe(...newRecipe,{
        title:'',
        image:'',
        healthScore:0,
        summary:'',
        instructions:'',
        diets:[],

    });
    
      // Luego, puedes reiniciar el estado para limpiar el formulario si lo deseas.
      
      
    };
  
    return (
        <div className={style.outside}>
          <div className={style.container}>
        <h1>New Recipe:</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.shortTextContainer}>
          <div className={style.shortText}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name='title' value={newRecipe.title} onChange={handleChange} />
          <span>{errors.title}</span>
        </div>
        <div>
          <label>Image: </label>
          <input  type="text" name="image" value={newRecipe.image} onChange={handleChange} />
          <span>{errors.image}</span>
        </div>
        <div>
          <label>Health Score: </label>
          <input type="number" name="healthScore" value={newRecipe.healthScore} onChange={handleChange} />
          <span>{errors.healthScore}</span>
        </div>
        </div>
        </div>
        <div>
          <label>Diets:</label>
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
        <div>
          <label>Summary:</label>
          <textarea value={newRecipe.summary} name="summary" onChange={handleChange} />
          <span>{errors.summary}</span>
        </div>
        <div>
          <label>Instructions:</label>
          <textarea value={newRecipe.instructions} name="instructions" onChange={handleChange} />
          <span>{errors.instructions}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
    );
  };
  
  export default Form;