import Joi from 'joi';

// Validation schema for creating an email
const createEmailSchema = Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(2000).required(),
    destination_email: Joi.string().email().required(),
    // file : Joi.object().optional().keys({
    //     originalname: Joi.string().required(),
    //     mimetype: Joi.string().required(),
    //     size: Joi.number().max(10 * 1024 * 1024).optional() // Max size 10MB
    // })
    document : Joi.string().optional(),
});


export default {
    createEmailSchema,
}; 