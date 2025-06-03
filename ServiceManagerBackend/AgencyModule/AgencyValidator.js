import Joi from 'joi';

// Validation schema for creating  an agency
const VerifyDataAgencyCreating = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  
    adress: Joi.string().max(60).allow('' , null),  // validate adress
  
    start_time: Joi.string().allow('' , null)
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$')).
    messages({
      'string.pattern.base': 'start_time doit être au format HH:mm (par exemple, 09:30 ou 14:00).'
    }),

   end_time: Joi.string().allow('' , null)
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$')).
    messages({
      'string.pattern.base': 'end_time doit être au format HH:mm (par exemple, 09:30 ou 14:00).'
    }),
  
    current: Joi.string().default(1)
  });

  // Validation schema for  updating an agency
const VerifyDataAgencyupdating = Joi.object(
{
    name: Joi.string().min(2).max(50),
  
    adress: Joi.string().max(60).allow('' , null), 
  
    start_time: Joi.string().allow('' , null)
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$')).
    messages({
      'string.pattern.base': 'start_time doit être au format HH:mm (par exemple, 09:30 ou 14:00).'
    }),

   end_time: Joi.string().allow('' , null)
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$')).
    messages({
      'string.pattern.base': 'end_time doit être au format HH:mm (par exemple, 09:30 ou 14:00).'
    }),
  
    current: Joi.string()
});


export default {
    VerifyDataAgencyCreating,
    VerifyDataAgencyupdating
};