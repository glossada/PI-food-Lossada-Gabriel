import {
	GET_RECIPES,	
	GET_DIETS,
    GET_RECIPE_BY_ID,
	ADD_RECIPES,
	GET_RECIPES_BY_NAME,
	MOD_RECIPES,
	DEL_RECIPES
} from './actions.js';

const initialState = {
    diets: [],
    recipes:[],
	recipesByName:[],
	recipeById:{},
    
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
				recipesByName: action.payload,
			};
		}

		case MOD_RECIPES:
            const { id } = action.payload;
            const updatedRecipes = state.recipes.map(recipe => {
                if (recipe.id === id) {
                    return {
                        ...recipe,
                        ...action.payload,
                    };
                }
                return recipe;
            });
            return {
                ...state,
                recipes: updatedRecipes,
            };
			case  DEL_RECIPES:{
				const deletedRecipeId = action.payload;
            const updatedRecipes = state.recipes.filter(recipe => recipe.id !== deletedRecipeId);
            return {
                ...state,
                recipes: updatedRecipes,
            };
			}
		

       default:
          return {...state};
    }
 };
 
 export default rootReducer;