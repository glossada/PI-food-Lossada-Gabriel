const containsNumber = /\d/;

const validateTitle = (data) => {
  const errors = {};
  if (!data.title) {
    errors.title = 'El título es requerido.';
  } else if (containsNumber.test(data.title)) {
    errors.title = 'El título no puede contener números.';
  }
  return errors;
};

const validateImage = (data) => {
  const errors = {};
  if (!data.image) {
    errors.image = 'La imagen es requerida.';
  }
  return errors;
};

const validateHealthScore = (data) => {
  const errors = {};
  const healthScoreNumber = Number(data.healthScore);

  if (!data.healthScore) {
    errors.healthScore = 'El puntaje de salud es requerido.';
  } else if (isNaN(healthScoreNumber)) {
    errors.healthScore = 'El puntaje de salud debe ser un número válido.';
  } else if (healthScoreNumber < 0 || healthScoreNumber > 100) {
    errors.healthScore = 'El puntaje de salud debe estar entre 0 y 100.';
  }
  return errors;
};

const validateInstructions = (data) => {
  const errors = {};
  if (!data.instructions) {
    errors.instructions = 'Las instrucciones son requeridas.';
  } else if (data.instructions.length > 1000) {
    errors.instructions = 'Las instrucciones deben tener como máximo 1000 caracteres.';
  }
  return errors;
};

const validateSummary = (data) => {
  const errors = {};
  if (!data.summary) {
    errors.summary = 'El resumen es requerido.';
  } else if (data.length > 200) {
    errors.summary = 'El resumen debe tener como máximo 200 caracteres.';
  }
  return errors;
};

export { validateTitle, validateImage,validateHealthScore,validateInstructions,validateSummary };