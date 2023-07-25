const { Router } = require('express');
const recipeRouter=require('./recipeRoutes');
const dietRouter=require('./dietRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);



module.exports = router;
