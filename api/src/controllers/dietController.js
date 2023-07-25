const axios = require('axios');
const {Recipe, Diet}=require('../db');
const {FOOD_API, QUERY_KEY}= require('../uttils/urls');
const {API_KEY } = process.env;
const { Op } = require('sequelize');

const dietsFromRecipe=(recetas)=>{
    let diets=[];
    for (let i = 0; i < recetas.length; i++) { 
    diets=[...diets,...recetas[i].diets];
    }
    let dietsUnique=[...new Set(diets)];
    const DietsFormated = dietsUnique.map(name => ({ name }));
    return DietsFormated;
}

const getAlldietsApi= async (res)=>{
    try {
        const {data}= await axios.get(`${FOOD_API}/complexSearch${QUERY_KEY}${API_KEY}&addRecipeInformation=true&number=100`);
        const diets=dietsFromRecipe(data.results);
        return diets;
        } catch (error) {
            res.status(500).json({error:`Se rompio todo: ${error.message}`});
        }
}

const getDiets= async (req,res)=>{
    try {
    const diets= await Diet.findAll();
    if(diets.length===0){
    const diets= await getAlldietsApi(res);
    const dietsCreated=await Diet.bulkCreate(diets);
    res.status(200).json({mje:'las dietas se cargaron correctamente',diets:dietsCreated});
    }else{
    res.status(200).json({mje:'las dietas ya se enncuentran cargadas',diets:diets});    
    }
    } catch (error) {
        res.status(500).json({error:`Se rompio todo: ${error.message}`})
    }
    
}

module.exports=getDiets;