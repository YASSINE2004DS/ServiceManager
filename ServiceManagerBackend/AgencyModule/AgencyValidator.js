import Joi from 'joi';

// Validation schema for creating  an agency
const VerifyDataAgencyCreating = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  
    adresse: Joi.string().max(60),  // validate adress
  
    start_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .message('start_time must be in HH:mm format'),
  
    end_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .message('end_time must be in HH:mm format'),
  
    current: Joi.string().default(1)
  });

  // Validation schema for  updating an agency
const VerifyDataAgencyupdating = Joi.object(
{
    name: Joi.string().min(2).max(50),
  
    adresse: Joi.string().max(60), 
  
    start_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .message('start_time must be in HH:mm format'),
  
    end_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .message('end_time must be in HH:mm format'),
  
    current: Joi.string().default(1)
});


export default {
    VerifyDataAgencyCreating,
    VerifyDataAgencyupdating
};