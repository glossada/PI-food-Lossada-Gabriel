const containsNumber = /\d/;

const validations = (data) => {
  const errors = {};

  if (!data.title) {
    errors.title = 'Title is required.';
  } else if (containsNumber.test(data.title)) {
    errors.title = 'El título no puede contener números.';
  }

  if (!data.image) {
    errors.image = 'Image URL is required.';
  }

  const healthScoreNumber = Number(data.healthScore);
  if (!data.healthScore) {
    errors.healthScore = 'Health score is required.';
  } else if (isNaN(healthScoreNumber)) {
    errors.healthScore = 'Health score must be a valid number.';
  } else if (healthScoreNumber < 0 || healthScoreNumber > 100) {
    errors.healthScore = 'Health score must be between 0 and 100.';
  }

  if (!data.instructions) {
    errors.instructions = 'Instructions are required.';
  } else if (data.instructions.length > 1000) {
    errors.instructions = 'Instructions must be less than 1000 characters.';
  }

  if (!data.summary) {
    errors.summary = 'Summary is required.';
  } else if (data.summary.length > 200) {
    errors.summary = 'Summary must be less than 200 characters.';
  }

  return errors;
};

const validateAll =(newRecipe)=>{
  const errors={
    exist:false
  }

  if (newRecipe.title.length===0) {
    errors.exist=true;
    errors.title='Missing title';
  }

   if (newRecipe.image.length===0) {
    errors.exist=true;
    errors.image='Missing image URL';
   }

    if (newRecipe.healthScore === 0) {
      errors.exist=true;
      errors.healthScore='Missing Health Score';
    }

    if (newRecipe.summary.length===0) {
      errors.exist=true;
      errors.summary='Missing summary';
    }

    if (newRecipe.instructions.length===0) {
      errors.exist=true;
      errors.instructions='Missing instructions';
    }

    if (newRecipe.diets.length===0) {
      errors.exist=true;
      errors.diets='Missing diets';
    }

    return errors;
}

export { validations, validateAll };