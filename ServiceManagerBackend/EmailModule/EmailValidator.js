import Joi from 'joi';

// Validation schema for creating an email
const createEmailSchema = Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(2000).required(),
    source_user_id: Joi.number().integer().required(),
    destination_user_id: Joi.number().integer().required()
});


export default {
    createEmailSchema,
}; 