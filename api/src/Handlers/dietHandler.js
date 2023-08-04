const getAllDiets = require('../Controllers/controllerDiet')


const getDiets= async (req,res)=>{
    try {
    const diets= await getAllDiets();
    res.status(200).json(diets);  
    } catch (error) {
    res.status(500).json({error:`Se rompio todo: ${error.message}`})
    }
    
}

module.exports=getDiets;