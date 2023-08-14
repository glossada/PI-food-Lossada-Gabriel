import axios from 'axios';
import {RECIPES, DIETS} from '../Utils/URL'

export const GET_DIETS = 'GET_DIETS';
export const ADD_RECIPES='ADD_RECIPES';
export const MOD_RECIPES='MOD_RECIPES';
export const DEL_RECIPES='DEL_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';

export function getRecipes() {
	return (dispatch) => {
		axios.get(RECIPES)
		.then((response) => {
			dispatch({ type: GET_RECIPES, payload: response.data });
		});
	};
}

export function getDiets() {
	return (dispatch) => {
		axios.get(DIETS)
		.then((response) => {
			dispatch({ type: GET_DIETS, payload: response.data });
		});
	};
}

export function getRecipesById(id) {
	return (dispatch) => {
		axios.get(`${RECIPES}${id}`)
		.then((response) => {
			dispatch({ type: GET_RECIPE_BY_ID, payload: response.data });
		});
	};
}

export function getRecipesByName(name) {
	return (dispatch) => {
		axios.get(`${RECIPES}?name=${name}`)
		.then((response) => {
			dispatch({ type: GET_RECIPES_BY_NAME, payload: response.data });
		}).catch((error) => {
			if (error.response && error.response.status === 404) {
				alert('Recipe not found.');
			} else {
				console.error('An error occurred:', error.message);
			}
		});
	};
}

export const addRecipe =  (recipe) => {
	return async (dispatch) => {
	   const {data}= await axios.post(RECIPES, recipe)
		  
		   return dispatch({
			 type: ADD_RECIPES,
			 payload: data,
		  });
	   
	};
  };

  export const modRecipe =  (recipe) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.put(RECIPES, recipe);

			return dispatch({
				type: MOD_RECIPES,
				payload: data,
			 });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
		  
	   
	};
  };

  export const deleteRecipe = (id) => {
	const endpoint = RECIPES + id;
	return async (dispatch) => {
	   const {data}= await axios.delete(endpoint);
	   
		  return dispatch({
			 type: DEL_RECIPES,
			 payload: data,
	   });
	};
  };