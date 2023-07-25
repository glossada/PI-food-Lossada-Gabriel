const axios = require('axios');
const {Recipe, Diet}=require('../db');
const {FOOD_API, QUERY_KEY}= require('../uttils/urls');
const {API_KEY } = process.env;
const { Op } = require('sequelize');

const pocesarInstrucciones=(receta)=>{
    receta.instructions = receta.instructions.replace(/<\/?p>/g, "");
        return receta.instructions;
}

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
    const recipeFiltered=recetas.filter(receta => receta.title.toLowerCase().includes(name.toLowerCase()));
    return recipeFiltered;
}

///
const getAllRecipesApi= async (res)=>{
    try {
        const {data}= await axios.get(`${FOOD_API}/complexSearch${QUERY_KEY}${API_KEY}&addRecipeInformation=true&number=100`);
        const recipesMod=procesarRecetas(data.results);
        return recipesMod;
        } catch (error) {
            res.status(500).json({error:`Se rompio todo: ${error.message}`});
        }
}

const getAllRecipeBd= async (res)=>{
    try {
        const recipeFind= await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                  attributes:[]
                }
              }
            
        });

        const recipeMod=processRecipesBulkBd(recipeFind)

        return recipeMod;
    } catch (error) {
        res.status(500).json({error:`Se rompio todo: ${error.message}`});
    }
}

const getAllRecipeBdByName= async (res,name)=>{
    try {
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

        const recipeMod=processRecipesBulkBd(recipeFind)

        return recipeMod;
    } catch (error) {
        res.status(500).json({error:`Se rompio todo: ${error.message}`});
    }
}

///
const getRecipeById= async(req,res)=>{
    const {id}=req.params;
    try {
        if(Number.isInteger(Number(id))){
            const {data}= await axios.get(`${FOOD_API}${id}/information/${QUERY_KEY}${API_KEY}`);
            if(data){
                const recetasMod= precesarRecetaApi(data);
                res.status(200).json(recetasMod)
            }else{
                res.status(404).json({error:'receta no encontrada'});
            }
        }else{
            const recipeFind= await Recipe.findByPk(id, {
                include:{
                      model: Diet,
                      attributes: ['name'],
                      through:{
                        attributes:[]
                      }
                    }
                  
            });
            const recipeMod=processRecipeBd(recipeFind)
            if(recipeMod){
                res.status(200).json(recipeMod)
            }else{
                res.status(404).json({error:'receta no encontrada'});
            }
        }
        
    } catch (error) {
        res.status(500).json({error:`Se rompio todo: ${error.message}`});
    }

}

const getRecipesByName= async (req,res)=>{
    const {name}=req.query;
    if(Number.isInteger(Number(name))){
        res.status(400).json({error:'no puede ser un numero'})
    }
    if(!name){
    const recipesApi= await getAllRecipesApi(res);
    const recipesBd= await getAllRecipeBd(res);
    const allRecipes=[...recipesApi, ...recipesBd];
    res.status(200).json(allRecipes);
    }else{
    const recipesApi= await getAllRecipesApi(res); 
    const recipeApiFiltered=titleFilterRecipe(recipesApi,name);
    const recipeBdFiltered=await getAllRecipeBdByName(res,name);
    const allRecipes=[...recipeApiFiltered, ...recipeBdFiltered];
    if(allRecipes.length===0){
        res.status(404).json({error:'no se encontraron coincidencias'})
    }

    res.status(200).json(allRecipes);
    }
    

}

const postRecipe = async (req,res)=>{
    const {title,image,summary,healthScore,instructions,diets} = req.body;

    if(!title||!image||!summary||!healthScore||!instructions){
        res.status(401).json({error:'Faltan Datos!'});
    }
    const recipe={
        title:title,
        image:image,
        summary:summary,
        healthScore:healthScore,
        instructions:instructions,
    }

    try {
        const newRecipe= await Recipe.create(recipe);
        newRecipe.addDiets(diets);
        res.status(200).json(newRecipe);
    } catch (error) {
        res.status(500).json({error:'no se cargo un sorete'});
    }

}


module.exports={
    postRecipe,
    getRecipeById,
    getRecipesByName,
}