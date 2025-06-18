import Joi      from 'joi';

const ComposantValidator = Joi.object({
  id_composant: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      'number.base': 'ID du composant doit être un nombre.',
      'number.integer': 'ID du composant doit être un entier.',
      'number.min': 'ID du composant doit être supérieur ou égal à 1.',
    }),

  name: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Le nom du composant doit être une chaîne de caractères.',
      'string.empty': 'Le nom du composant est obligatoire.',
      'string.max': 'Le nom du composant ne doit pas dépasser 100 caractères.',
      'any.required': 'Le nom du composant est requis.',
    }),

  categorie: Joi.string()
    .valid(
      'Résistance',
      'Condensateur',
      'Diode',
      'Microcontrôleur',
      'Connecteur',
      'LED',
      'Transistor',
      'Capteur',
      'Communication',
      'Affichage',
      'Driver',
      'Régulateur',
      'Commutation',
      'Temps Réel',
      'Alimentation'
    )
    .required()
    .messages({
      'string.base': 'La catégorie doit être une chaîne de caractères.',
      'any.only': 'La catégorie doit être une des valeurs autorisées.',
      'any.required': 'La catégorie du composant est requise.',
    }),

  stock_quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'La quantité en stock doit être un nombre.',
      'number.integer': 'La quantité en stock doit être un entier.',
      'number.min': 'La quantité en stock ne peut pas être négative.',
      'any.required': 'La quantité en stock est requise.',
    }),

  min_stock_level: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le seuil minimum doit être un nombre.',
      'number.integer': 'Le seuil minimum doit être un entier.',
      'number.min': 'Le seuil minimum ne peut pas être négatif.',
      'any.required': 'Le seuil minimum est requis.',
    }),

  location: Joi.string()
    .max(10)
    .required()
    .messages({
      'string.base': "L'emplacement doit être une chaîne de caractères.",
      'string.empty': "L'emplacement est obligatoire.",
      'string.max': "L'emplacement ne doit pas dépasser 10 caractères.",
      'any.required': "L'emplacement est requis.",
    }),

  unit_cost: Joi.number()
    .precision(4)
    .min(0)
    .required()
    .messages({
      'number.base': 'Le coût unitaire doit être un nombre.',
      'number.min': 'Le coût unitaire ne peut pas être négatif.',
      'any.required': 'Le coût unitaire est requis.',
    }),

  lead_time_days: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le délai de livraison doit être un nombre.',
      'number.integer': 'Le délai de livraison doit être un entier.',
      'number.min': 'Le délai de livraison ne peut pas être négatif.',
      'any.required': 'Le délai de livraison est requis.',
    }),

  status: Joi.string()
    .valid('Active', 'Obsolete')
    .required()
    .messages({
      'string.base': 'Le statut doit être une chaîne de caractères.',
      'any.only': 'Le statut doit être "Active" ou "Obsolete".',
      'any.required': 'Le statut est requis.',
    }),

  source_id_entreprise: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': "L'identifiant de l'entreprise source doit être un nombre.",
      'number.integer': "L'identifiant de l'entreprise source doit être un entier.",
    }),
});


const ComposantUpdateValidator = Joi.object({
  id_composant: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      'number.base': 'ID du composant doit être un nombre.',
      'number.integer': 'ID du composant doit être un entier.',
      'number.min': 'ID du composant doit être supérieur ou égal à 1.',
    }),

  name: Joi.string()
    .max(100)
    .messages({
      'string.base': 'Le nom du composant doit être une chaîne de caractères.',
      'string.empty': 'Le nom du composant est obligatoire.',
      'string.max': 'Le nom du composant ne doit pas dépasser 100 caractères.',
      'any.required': 'Le nom du composant est requis.',
    }),

  categorie: Joi.string()
    .valid(
      'Résistance',
      'Condensateur',
      'Diode',
      'Microcontrôleur',
      'Connecteur',
      'LED',
      'Transistor',
      'Capteur',
      'Communication',
      'Affichage',
      'Driver',
      'Régulateur',
      'Commutation',
      'Temps Réel',
      'Alimentation'
    )
    .messages({
      'string.base': 'La catégorie doit être une chaîne de caractères.',
      'any.only': 'La catégorie doit être une des valeurs autorisées.',
      'any.required': 'La catégorie du composant est requise.',
    }),

  stock_quantity: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'La quantité en stock doit être un nombre.',
      'number.integer': 'La quantité en stock doit être un entier.',
      'number.min': 'La quantité en stock ne peut pas être négative.',
      'any.required': 'La quantité en stock est requise.',
    }),

  min_stock_level: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Le seuil minimum doit être un nombre.',
      'number.integer': 'Le seuil minimum doit être un entier.',
      'number.min': 'Le seuil minimum ne peut pas être négatif.',
      'any.required': 'Le seuil minimum est requis.',
    }),

  location: Joi.string()
    .max(10)
    .messages({
      'string.base': "L'emplacement doit être une chaîne de caractères.",
      'string.empty': "L'emplacement est obligatoire.",
      'string.max': "L'emplacement ne doit pas dépasser 10 caractères.",
      'any.required': "L'emplacement est requis.",
    }),

  unit_cost: Joi.number()
    .precision(4)
    .min(0)
    .messages({
      'number.base': 'Le coût unitaire doit être un nombre.',
      'number.min': 'Le coût unitaire ne peut pas être négatif.',
      'any.required': 'Le coût unitaire est requis.',
    }),

  lead_time_days: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Le délai de livraison doit être un nombre.',
      'number.integer': 'Le délai de livraison doit être un entier.',
      'number.min': 'Le délai de livraison ne peut pas être négatif.',
      'any.required': 'Le délai de livraison est requis.',
    }),

  status: Joi.string()
    .valid('Active', 'Obsolete')
    .messages({
      'string.base': 'Le statut doit être une chaîne de caractères.',
      'any.only': 'Le statut doit être "Active" ou "Obsolete".',
      'any.required': 'Le statut est requis.',
    }),

  source_id_entreprise: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': "L'identifiant de l'entreprise source doit être un nombre.",
      'number.integer': "L'identifiant de l'entreprise source doit être un entier.",
    }),
});

export default {ComposantValidator , ComposantUpdateValidator};