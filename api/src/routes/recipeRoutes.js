const express = require('express');
const recipeRouter=express.Router();
const {postRecipe, getRecipeById, getRecipesByName}=require('../controllers/recipeController');

recipeRouter.get('/:id', (req,res)=>{
getRecipeById(req,res);
});

recipeRouter.get('/',(req,res)=>{
    getRecipesByName(req,res);
})

recipeRouter.post('/',(req,res)=>{
    postRecipe(req,res);
})

module.exports= recipeRouter;