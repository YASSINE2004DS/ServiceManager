import bcrypt from 'bcryptjs'

import Schema from './UserValidator.js';
import Models from '../DatabaseModule/ModelAssociations.js'
const { createUserSchema, updateUserSchema } = Schema;
const { User, Agency } = Models

/**
 * @class UserService
 * @brief This class encapsulates the business logic for all user-related operations.
 *        It interacts with the data layer (e.g., a database) to perform CRUD operations.
 */

class UserService {
    async getUsers(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } });
            res.json(users);
        } catch (error) {
            res.status(500).json({ Error : error.message });
        }
    }

    async createUser(req, res){
        // Validate the user informations.
        const { error, value } = createUserSchema.validate(req.body);
        if(error) return res.status(400).json({ Error: error.details[0].message });

        // Check if the email is already existe.
        const existingUser = await User.findOne({ where: { email: value.email } });
        if(existingUser) return res.status(400).json({ Error: 'Email already in use!'});

        // hash the password.
        const hashedPassword = await bcrypt.hash(value.password, 10);

        // Get the current agency
        const currentAgency = await Agency.findOne({ where: { current: true }});
        if(!currentAgency) return res.status(400).json({ Error: 'No Agency is in active'});

        // Create the new user.
        try {

            const user = await User.create({
                first_name  : value.first_name,
                last_name   : value.last_name,
                email       : value.email,
                password    : hashedPassword,
                role        : value.role,
                agency_id   : currentAgency.agency_id
            });

            res.status(201).json(
            {
                message: "User Created Successfully",
                userId: user.user_id,
                email: user.email
            });

        } catch (error) {

            // Using switch case to handle different error types.
            switch (error.name) {

                case 'SequelizeValidationError':
                    // Handles validation errors (e.g., missing or invalid fields).
                    const validationErrors = error.errors.map(err => err.message);

                    return res.status(400).json({   Error: 'Validation errors: ',
                                                    description: validationErrors.join(', ')
                                                });


                case 'SequelizeUniqueConstraintError':
                    // Handles unique constraint violations (e.g., duplicate email).
                    return res.status(400).json({   Error: 'Unique constraint violation: ',
                                                    description: error.errors[0].message
                                                });


                case 'SequelizeForeignKeyConstraintError':
                    // Handles foreign key constraint violations (e.g., non-existent agency_id).
                    return res.status(400).json({   Error: 'Foreign key constraint error: ',
                                                    description: error.message
                                                });


                case 'SequelizeDatabaseError':
                    // Handles database-related errors (e.g., SQL issues or constraint violations).
                    return res.status(500).json({   Error: 'Database error: ',
                                                    description: error.message
                                                });

                default:
                    // Handles any other errors (e.g., server errors, business logic issues).
                    return res.status(500).json({   Error: 'Internal server error' });
            }
        }
    }

    async getUserById(req, res){
        try {
            // Check if the user exist and valid.
            const userId = req.params.id;
            if(isNaN(Number(userId)))
                return res.status(400).json({ Error: "User id not valid!" });

            // Get the user from the database.
            const user = await User.findOne({
                                        where: { user_id: userId },
                                        attributes: { exclude: ['password'] }
                                    });


            // If the user not exist.
            if(!user) return res.status(400).json({ Error: `No user has the id : ${userId}` });

            // Return the user informations
            return res.json(user);
        } catch (error) {
            res.status(500).json({ Error : error.message });
        }
    }

    async modifyUser(req, res){
        

    }

    async deleteUser(req, res){
        // TODO : Implement all logic for delete a user by his ID.
        res.send('Delete user');
    }
}

export default new UserService();