import Joi from 'joi';

const entrepriseSchema = Joi.object({
name: Joi.string()
    .max(50)
    .required()
    .label("Nom de l'entreprise")
    .messages({
        'string.empty': "Le nom de l'entreprise ne doit pas être vide",
        'string.max': "Le nom de l'entreprise ne doit pas dépasser 50 caractères",
        'any.required': "Le nom de l'entreprise est requis",
    }),

    address: Joi.string()
        .allow(null)
        .label('Adresse'),

    adresse_email: Joi.string()
        .email({ tlds: { allow: false } }) // pour éviter les erreurs sur les domaines personnalisés
        .allow(null)
        .label('Adresse e-mail'),

    pays: Joi.string()
        .max(40)
        .allow(null)       
        .label('Pays'),

   type_entreprise: Joi.string()
    .valid('importation', 'exportation')
    .required()
    .label("Type d'entreprise")
    .messages({
        'any.only': "Le type d'entreprise doit être soit 'importation' soit 'exportation'",
        'string.empty': "Le type d'entreprise est obligatoire",
        'any.required': "Le type d'entreprise est requis"
    }),

    locale: Joi.boolean()
        .default(true)
        .required()
        .label('Entreprise locale')
        .messages({
        'any.required': "locale est requis"
         }),
});

const entrepriseSchemaForUpdate = Joi.object({
    name: Joi.string()
        .max(50)
        .label('Nom de l\'entreprise'),

    address: Joi.string()
        .allow(null)
        .label('Adresse'),

    adresse_email: Joi.string()
        .email({ tlds: { allow: false } }) // pour éviter les erreurs sur les domaines personnalisés
        .allow(null)
        .label('Adresse e-mail'),

    pays: Joi.string()
        .max(40)
        .allow(null)        
        .label('Pays'),

    type_entreprise: Joi.string()
        .valid('importation', 'exportation')
        .label('Type d\'entreprise'),

    locale: Joi.boolean()
        .default(true)
        .label('Entreprise locale')
});

export default {entrepriseSchema , entrepriseSchemaForUpdate} ;
