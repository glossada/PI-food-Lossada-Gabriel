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

const getAlldietsApi= async ()=>{
        const {data}= await axios.get(`${FOOD_API}/complexSearch${QUERY_KEY}${API_KEY}&addRecipeInformation=true&number=100`);
        if(data){
        const diets=dietsFromRecipe(data.results);
        return diets;
        }else{
            return null
        }
}

const getAllDiets = async()=>{
    const diets= await Diet.findAll();
    if(diets.length===0){
    const diets= await getAlldietsApi();
    const dietsCreated=await Diet.bulkCreate(diets);
    return dietsCreated;
    }else{
    return diets;    
    }
}


module.exports=getAllDiets;