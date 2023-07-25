const express = require('express');
const dietRouter=express.Router();
const getDiets=require('../controllers/dietController')

dietRouter.get('/',(req,res)=>{
    getDiets(req,res);
});

module.exports=dietRouter;