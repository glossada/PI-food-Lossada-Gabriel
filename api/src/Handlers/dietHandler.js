const getAllDiets = require('../Controllers/controllerDiet')


const getDiets= async (req,res)=>{
    try {
    const diets= await getAllDiets();
    res.status(200).json(diets);  
    } catch (error) {
    res.status(500).json({error:`Here, have a nice error only for you <3: ${error.message}`})
    }
    
}

module.exports=getDiets;