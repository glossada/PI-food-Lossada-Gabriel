const axios = require('axios');

const API_BASE_URL = 'https://api-de-comidas.com';
const INITIAL_DATA_LIMIT = 50;

let cachedRecipes = [];

const loadData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recetas?limit=${INITIAL_DATA_LIMIT}`);
    cachedRecipes = response.data;
    return cachedRecipes;
  } catch (error) {
    console.error(error);
    throw new Error('Error al cargar los datos iniciales.');
  }
};

module.exports = {
  cachedRecipes,
  loadData,
};
