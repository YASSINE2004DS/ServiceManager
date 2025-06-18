import Joi from 'joi';

const composantSchema = Joi.object({

  quantite: Joi.number().positive().required().min(1).messages({
    'any.required': 'La quantité est requise',
    'number.base': 'La quantité doit être un nombre',
    'number.positive': 'La quantité doit être positive'
  }),

  prix_unitaire: Joi.number().positive().required().messages({
    'any.required': 'Le prix unitaire est requis',
    'number.base': 'Le prix unitaire doit être un nombre',
    'number.positive': 'Le prix unitaire doit être positif'
  }),

  id_exportation: Joi.number().integer().required().optional().messages({
    'any.required': 'L\'ID du Exportation est requis',
    'number.base': 'L\'ID du Exportation doit être un nombre entier'
  }),

  id_composant: Joi.number().integer().required().messages({
    'any.required': 'L\'ID du composant est requis',
    'number.base': 'L\'ID du composant doit être un nombre entier'
  })

});


const exportationSchema = Joi.object({
  date_exportation: Joi.date().required().messages({
    'any.required': 'La date d\'exportation est requise',
    'date.base': 'La date d\'exportation doit être une date valide'
  }),
  date_demande: Joi.date().required().optional().messages({
    'any.required': 'La date de demande est requise',
    'date.base': 'La date de demande doit être une date valide'
  }),
  id_entreprise: Joi.number().integer().required().messages({
    'any.required': 'L\'ID de l\'entreprise est requis',
    'number.base': 'L\'ID de l\'entreprise doit être un nombre entier'
  }),
  composants: Joi.array().items(composantSchema).min(1).required().messages({
    'array.base': 'Les composants doivent être une liste',
    'array.min': 'Au moins un composant est requis',
    'any.required': 'La liste des composants est requise'
  })
});


export default {
    composantSchema,
    exportationSchema
}