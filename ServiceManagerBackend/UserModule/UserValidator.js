import Joi from 'joi';

const createUserSchema = Joi.object(
{
    first_name: Joi.string().min(2).max(50).required(),

    last_name:  Joi.string().min(2).max(50).required(),

    email:      Joi.string().email().required(),

    password:   Joi.string().min(5).max(200).required(),

    role:       Joi.string().valid('Admin', 'User').default('User'),
});

const updateUserSchema = Joi.object(
{
    first_name: Joi.string().min(2).max(50),

    last_name:  Joi.string().min(2).max(50),

    email:      Joi.string().email(),

    password:   Joi.string().min(5).max(200),

    role:       Joi.string().valid('Admin', 'User'),
});

const loginUserSchema = Joi.object(
{
    email:      Joi.string().email().required(),

    password:   Joi.string().min(5).max(200).required(),
});


export default {
    createUserSchema,
    updateUserSchema,
    loginUserSchema
};