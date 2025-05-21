import joi from 'joi';

const ValidateCreatingIntervention = joi.object({
    intervention_id: joi.number().required(),

    date: joi.date().required(),

    team: joi.string().max(50).required(),

    reference: joi.string().max(100).required(),

    post: joi.string().max(100).required(),

    maintenance_type: joi.string().max(50).required(),

    status: joi.boolean().required().default(true),

    work_order_number: joi.number().required(),

    work_autorisation_number: joi.number().required(),
     
    planification: joi.boolean().required().default(false),

    reception: joi.boolean().required().default(true),

    start_time: joi.string().required(),

    end_time: joi.string().required(),

    comment : joi.string().max(3000) , 

    validate : joi.boolean().required().default(true),

    section_id: joi.number().required(),

    user_id: joi.number().required()
});

const ValidateUpdatingIntervention = joi.object({
    intervention_id: joi.number(),

    date: joi.date(),

    team: joi.string().max(50),

    reference: joi.string().max(100),

    post: joi.string().max(100),

    maintenance_type: joi.string().max(50),

    status: joi.boolean().default(true),

    work_order_number: joi.number(),

    work_autorisation_number: joi.number(),
     
    planification: joi.boolean().default(true),

    reception: joi.boolean().default(true),

    start_time: joi.string(),

    end_time: joi.string(),

    comment : joi.string().max(3000),

    validate : joi.boolean().default(true),

    section_id: joi.number(),

    user_id: joi.number()
});   

export default { ValidateCreatingIntervention, ValidateUpdatingIntervention };
// This code defines two Joi validation schemas for creating and updating an intervention entity.