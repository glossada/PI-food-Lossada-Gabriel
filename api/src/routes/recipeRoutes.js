const express = require('express');
const recipeRouter=express.Router();
const {postRecipe, getRecipeById, getRecipesByName,putRecipe,delRecipe}=require('../Handlers/recipeHandler');

recipeRouter.get('/:id', (req,res)=>{
getRecipeById(req,res);
});

recipeRouter.get('/',(req,res)=>{
    getRecipesByName(req,res);
})

recipeRouter.post('/',(req,res)=>{
    postRecipe(req,res);
})

recipeRouter.put('/',(req,res)=>{
    putRecipe(req,res);
})

recipeRouter.delete('/:id',(req,res)=>{
    delRecipe(req,res);
})

module.exports= recipeRouter;