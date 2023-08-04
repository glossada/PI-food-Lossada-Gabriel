const express = require('express');
const dietRouter=express.Router();
const getDiets=require('../Handlers/dietHandler')

dietRouter.get('/',(req,res)=>{
    getDiets(req,res);
});

module.exports=dietRouter;