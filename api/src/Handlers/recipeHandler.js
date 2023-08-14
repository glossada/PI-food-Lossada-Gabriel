const axios = require('axios');
const {getRecipeByIdApi,getRecipeByIdBd,getAllRecipesByName,getAllRecipes,createRecipe,updateRecipe,deleteRecipe}=require('../Controllers/controllerRecipe')

///
const getRecipeById= async(req,res)=>{
    const {id}=req.params;
    try {
        if(Number.isInteger(Number(id))){
            const recetaApi= await getRecipeByIdApi(id);
            if(recetaApi){
                res.status(200).json(recetaApi)
            }else{
                res.status(404).json({mje:'Recipe not found'})
            }
        }else{
            const recetaBd= await getRecipeByIdBd(id);
            if(recetaBd){
                res.status(200).json(recetaBd)
            }else{
                res.status(404).json({mje:'Recipe not found'});
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
    try {
        if (!name) {
            const allRecipes = await getAllRecipes();
            res.status(200).json(allRecipes);
        } else {
            const allRecipesByName = await getAllRecipesByName(name);
            
            if (allRecipesByName.length === 0) {
                res.status(404).json({ message: 'Receta no encontrada' });
            } else {
                res.status(200).json(allRecipesByName);
            }
        }
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error: ${error.message}` });
    }
    
    

}


const postRecipe = async (req,res)=>{
    const {title,image,summary,healthScore,instructions,diets} = req.body;

    if(!title||!image||!summary||!healthScore||!instructions || diets.length===0){
        res.status(401).json({error:'Missing data!'});
    }
    
    try {
        const newRecipe= await createRecipe({title,image,summary,healthScore,instructions,diets});
        res.status(200).json(newRecipe);
    } catch (error) {
        res.status(500).json({error:'Recipe not created'});
    }

}

const putRecipe = async (req,res)=>{
    const {id,title,image,summary,healthScore,instructions,diets} = req.body;

    if(!id||!title||!image||!summary||!healthScore||!instructions || diets.length===0){
        res.status(401).json({error:'Missing data!'});
    }
    
    try {
        const modRecipe= await updateRecipe(id,{title,image,summary,healthScore,instructions,diets});
        res.status(200).json(modRecipe);
    } catch (error) {
        res.status(500).json({error:'Recipe not modified'});
    }

}

const delRecipe = async (req,res)=>{
    const {id}=req.params;
    try {
        const recipeId= await deleteRecipe(id);
        res.status(200).json(recipeId);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


module.exports={
    postRecipe,
    getRecipeById,
    getRecipesByName,
    putRecipe,
    delRecipe
}