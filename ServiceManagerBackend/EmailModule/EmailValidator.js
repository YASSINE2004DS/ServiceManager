import Joi from 'joi';

// Validation schema for creating an email
const createEmailSchema = Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(2000).required(),
    destination_email: Joi.string().email().required()
});


export default {
    createEmailSchema,
}; 