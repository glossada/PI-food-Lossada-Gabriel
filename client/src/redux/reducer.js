import {
	GET_RECIPES,	
	GET_DIETS,
    GET_RECIPE_BY_ID,
	ADD_RECIPES,
	GET_RECIPES_BY_NAME
} from './actions.js';

const initialState = {
    diets: [],
    recipes:[],
	recipeByName:[]
    
 };

 const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: {
			return {
				...state,
				recipes: action.payload,
			};
		}

        case GET_DIETS: {
			return {
				...state,
				diets: action.payload,
			};
		}

        case GET_RECIPE_BY_ID: {
			return {
				...state,
				recipeById: action.payload,
			};
		}

		case  ADD_RECIPES:{
			return{ ...state, recipes: state.recipes.concat(action.payload) };
		}

		case GET_RECIPES_BY_NAME:{
			return {
				...state,
				recipeByName: action.payload,
			};
		}

       default:
          return {...state};
    }
 };
 
 export default rootReducer;