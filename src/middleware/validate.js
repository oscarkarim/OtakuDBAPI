export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => {
      const field = detail.context.key; // Nombre del campo
      const type = detail.type; // Tipo de error de Joi

      // Mensajes de error personalizados
      switch (type) {
        case "number.base":
          return `El campo "${field}" debe ser un número.`;
        case "number.integer":
          return `El campo "${field}" debe ser un número entero.`;
        case "string.base":
          return `El campo "${field}" debe ser una cadena de texto.`;
        case "string.max":
          return `El campo "${field}" no debe exceder los ${detail.context.limit} caracteres.`;
        case "string.uri":
          return `El campo "${field}" debe ser una URI válida.`;
        case "any.required":
          return `El campo "${field}" es obligatorio.`;
        case "array.base":
          return `El campo "${field}" debe ser un array.`;
        case "array.includes":
          return `El campo "${field}" contiene elementos inválidos.`;
        case "number.min":
          return `El campo "${field}" debe ser mayor o igual a ${detail.context.limit}.`;
        case "number.max":
          return `El campo "${field}" debe ser menor o igual a ${detail.context.limit}.`;
        default:
          return `Valor inválido para el campo "${field}".`;
      }
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next(); // Continúa si no hay errores
};

export const validateGet = (schema, target = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[target], { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => {
      const field = detail.context.key; // Nombre del campo
      const type = detail.type; // Tipo de error de Joi

      switch (type) {
        case "string.base":
          return `El campo "${field}" debe ser una cadena de texto.`;
        case "number.base":
          return `El campo "${field}" debe ser un número.`;
        case "number.integer":
          return `El campo "${field}" debe ser un número entero.`;
        case "number.min":
          return `El campo "${field}" debe ser mayor o igual a ${detail.context.limit}.`;
        case "number.positive":
          return `El campo "${field}" debe ser un número positivo (mayor que cero).`;
        default:
          return `Valor inválido para el campo "${field}".`;
      }
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
};


export const validatePatch = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => {
      const field = detail.context.key; // Nombre del campo
      const type = detail.type; // Tipo de error de Joi

      // Mensajes de error personalizados
      switch (type) {
        case "number.base":
          return `El campo "${field}" debe ser un número.`;
        case "number.integer":
          return `El campo "${field}" debe ser un número entero.`;
        case "string.base":
          return `El campo "${field}" debe ser una cadena de texto.`;
        case "string.max":
          return `El campo "${field}" no debe exceder los ${detail.context.limit} caracteres.`;
        case "string.uri":
          return `El campo "${field}" debe ser una URI válida.`;
        case "any.required":
          return `El campo "${field}" es obligatorio.`;
        case "array.base":
          return `El campo "${field}" debe ser un array.`;
        case "array.includes":
          return `El campo "${field}" contiene elementos inválidos.`;
        case "number.min":
          return `El campo "${field}" debe ser mayor o igual a ${detail.context.limit}.`;
        case "number.max":
          return `El campo "${field}" debe ser menor o igual a ${detail.context.limit}.`;
        default:
          return `Valor inválido para el campo "${field}".`;
      }
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next(); // Continúa si no hay errores
};