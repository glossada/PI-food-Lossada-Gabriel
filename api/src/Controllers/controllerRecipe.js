const axios = require('axios');
const {Recipe, Diet}=require('../db');
const {FOOD_API, QUERY_KEY}= require('../uttils/urls');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {results} = require('../otros/recipes.json')

const pocesarInstrucciones=(receta)=>{
    receta.instructions = receta.instructions.replace(/<\/?p>/g, "");
        return receta.instructions;
};

const processRecipeBd=(receta)=>{
    const array=receta.diets;
    const dietsMod=[];
    for (let i = 0; i < array.length; i++) {
        dietsMod.push(array[i].name);
        
    }
    const recipeMod={
        id:receta.id,
        title:receta.title,
        image:receta.image,
        summary:receta.summary,
        healthScore:receta.healthScore,
        instructions:receta.instructions,
        diets:dietsMod,
    }
    return recipeMod;
}

const processRecipeBasicsBd=(receta)=>{
    const array=receta.diets;
    const dietsMod=[];
    for (let i = 0; i < array.length; i++) {
        dietsMod.push(array[i].name);
        
    }
    const recipeMod={
        id:receta.id,
        title:receta.title,
        healthScore:receta.healthScore,
        image:receta.image,
        diets:dietsMod,
    }
    return recipeMod;
}

const processRecipesBulkBd=(recetas)=>{
    let recetasMod=[];
    for (let i = 0; i < recetas.length; i++) { 
    recetasMod.push(processRecipeBasicsBd(recetas[i]));
    }
    return recetasMod;
}

const precesarRecetaApi=(receta)=>{
    const recetaMod={
        id:receta.id,
        title:receta.title,
        image:receta.image,
        summary:receta.summary,
        healthScore:receta.healthScore,
        instructions:pocesarInstrucciones(receta),
        diets:receta.diets,
    };
    return recetaMod
    
}

const onlyBasicRecipe=(receta)=>{
   
    const recetaMod={
        id:receta.id,
        title:receta.title,
        healthScore:receta.healthScore,
        image:receta.image,
        diets:receta.diets,
    };
    return recetaMod;
}

const  procesarRecetas=(recetas)=>{
    let recetasMod=[];
    for (let i = 0; i < recetas.length; i++) { 
    recetasMod.push(onlyBasicRecipe(recetas[i]));
    }
    return recetasMod;
    
}

const titleFilterRecipe=(recetas,name)=>{
    if(recetas.length>0){
    const recipeFiltered=recetas.filter(receta => receta.title.toLowerCase().includes(name.toLowerCase()));
    return recipeFiltered;
    }else{
        return []
    }
}

//RECORDAR PONER LA API!!!!!!
const getAllRecipesApi= async ()=>{
        const {data}= await axios.get(`${FOOD_API}/complexSearch${QUERY_KEY}${API_KEY}&addRecipeInformation=true&number=100`);
        //const data= results;
        if(data){
        //const recipesMod=procesarRecetas(data);
        const recipesMod=procesarRecetas(data.results);
        return recipesMod;
        }else{
            return [];
        }
        
        
}

const getAllRecipeBd= async ()=>{
        const recipeFind= await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                  attributes:[]
                }
              }
            
        });
        if(recipeFind.length>0){
        const recipeMod=processRecipesBulkBd(recipeFind)
        return recipeMod;
        }else{
            return []
        }    
}

const getAllRecipeBdByName= async (name)=>{
    
        const recipeFind= await Recipe.findAll({
            where: {
              title: {
                [Op.iLike]: `%${name}%`
              }
            },
            include: {
              model: Diet,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          });
        
        if(recipeFind.length>0){
        const recipeMod=processRecipesBulkBd(recipeFind);
        return recipeMod;
        }else{     
        return [];
        }
    
}

///esto se exporta

const getRecipeByIdApi = async(id)=>{
    const {data}= await axios.get(`${FOOD_API}${id}/information/${QUERY_KEY}${API_KEY}`);
            if(data){
                const recetasMod= precesarRecetaApi(data);
                return recetasMod;
            }else{
                return null;
            }
};

const getRecipeByIdBd =  async (id)=>{
    const recipeFind= await Recipe.findByPk(id, {
        include:{
              model: Diet,
              attributes: ['name'],
              through:{
                attributes:[]
              }
            }
          
    });
    
    if(recipeFind){
        const recipeMod=processRecipeBd(recipeFind)
        return recipeMod
    }else{
        return null;
    }
}

const getAllRecipesByName =async (name)=>{  
    
        const recipesApi= await getAllRecipesApi(); 
        const recipeApiFiltered=titleFilterRecipe(recipesApi,name);
        const recipeBdFiltered=await getAllRecipeBdByName(name);
        const allRecipes=[...recipeApiFiltered, ...recipeBdFiltered];
        return allRecipes; 
    
}

const getAllRecipes= async () =>{
    const recipesApi= await getAllRecipesApi();
    const recipesBd= await getAllRecipeBd();
    const allRecipes=[...recipesApi, ...recipesBd];
    return allRecipes;
}

const createRecipe= async ({title,image,summary,healthScore,instructions,diets})=>{
    const recipe={
        title:title,
        image:image,
        summary:summary,
        healthScore:healthScore,
        instructions:instructions,
    }
    const newRecipe= await Recipe.create(recipe);
    newRecipe.addDiets(diets);
    return newRecipe;
}

const updateRecipe= async (recipeId,{title,image,summary,healthScore,instructions,diets})=>{
    
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
        throw new Error('Recipe not found');
    }

    recipe.title = title;
        recipe.image = image;
        recipe.summary = summary;
        recipe.healthScore = healthScore;
        recipe.instructions = instructions;
        await recipe.save();

        await recipe.setDiets(diets);

        return recipe;
}

const deleteRecipe= async(id)=>{
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
        throw new Error('Recipe not found');
    }

    await recipe.destroy();
    return id


}


module.exports={
    getRecipeByIdApi,
    getRecipeByIdBd,
    getAllRecipesByName,
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
