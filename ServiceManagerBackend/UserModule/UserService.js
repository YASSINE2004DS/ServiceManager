import bcrypt from 'bcryptjs';

import Schema from './UserValidator.js'; // Contains the validation schemas.
import Models from '../DatabaseModule/ModelAssociations.js'; // Contains the database models.
import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; // Contains the authentication operations.

const { createUserSchema, updateUserSchema, loginUserSchema } = Schema;
const { User, Agency } = Models;

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
            res.status(500).json({ Error: error.message });
        }
    }

    async createUser(req, res) {
        // Validate the user informations.
        const { error, value } = createUserSchema.validate(req.body);
        if (error) return res.status(400).json({ Error: error.details[0].message });

        // Check if the email is already existe.
        const existingUser = await User.findOne({ where: { email: value.email } });
        if (existingUser) return res.status(400).json({ Error: 'Email already in use!' });

        // hash the password.
        const hashedPassword = await bcrypt.hash(value.password, 10);

        // Get the current agency
        const currentAgency = await Agency.findOne({ where: { current: true } });
        if (!currentAgency) return res.status(400).json({ Error: 'No Agency is in active' });

        // Create the new user.
        try {
            const user = await User.create({
                first_name: value.first_name,
                last_name: value.last_name,
                email: value.email,
                password: hashedPassword,
                role: value.role,
                agency_id: currentAgency.agency_id,
            });

            res.status(201).json({
                message: 'User Created Successfully',
                userId: user.user_id,
                email: user.email,
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getUserById(req, res) {
        try {
            // Check if the user exist and valid.
            const userId = req.params.id;
            if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User id not valid!' });

            // Get the user from the database.
            const user = await User.findOne({
                where: { user_id: userId },
                attributes: { exclude: ['password'] },
            });

            // If the user not exist.
            if (!user) return res.status(400).json({ Error: `No user has the id : ${userId}` });

            // Return the user informations
            return res.json(user);
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    async modifyUser(req, res) {
        // Check if the user exist and valid.
        const userId = req.params.id;
        if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User id not valid!' });

        // Check if the user exist in our database.
        const user = await User.findOne({ where: { user_id: userId } });
        if (!user) return res.status(400).json({ Error: `No user has the id : ${userId}` });

        // Check the request format
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) return res.status(400).json({ Error: error.details[0].message });

        // Hash the password if exist
        if (value.password) value.password = await bcrypt.hash(value.password, 10);

        try {
            // update the user
            await user.update(value);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deleteUser(req, res) {
        // Check if the user ID is valid.
        const userId = req.params.id;
        if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User ID is not valid!' });

        try {
            // Find the user in the database.
            const user = await User.findOne({ where: { user_id: userId } });

            // If the user does not exist, return an error.
            if (!user) {
                return res.status(400).json({ Error: `No user found with ID: ${userId}` });
            }

            // Delete the user from the database.
            console.log('Deleting user:', userId);
            await user.destroy();
            console.log('User deleted');

            // Send a success response.
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getInActivetUsers(req, res) {
        try {
            const users = await User.findAll({ where: { active: false } });
            res.json(users);
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    async makeUserActive(req, res) {
        try {
            // Check if the user exist and valid.
            const userId = req.params.id;
            if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User id not valid!' });

            // Check if the user exist in our database.
            const user = await User.findOne({ where: { user_id: userId } });

            // If the user does not exist, return an error.
            if (!user) {
                return res.status(400).json({ Error: `No user found with ID: ${userId}` });
            }

            // Update the user's active status to true.
            user.active = true;
            await user.save();

            return res.status(200).json({ message: 'User activated successfully' });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async login(req, res) {
        // Check the request format.
        const { error, value } = loginUserSchema.validate(req.body);
        if (error)
            return res.status(400).json({
                Error: 'Invalid request format!',
                description: error.details[0].message,
            });

        try {
            // Get the email and the password.
            const { email, password } = value;

            // Check if the user exist.
            const user = await User.findOne({ where: { email: email } });
            if (!user) return res.status(401).json({ message: 'User does not exist!' });

            // Check if the password is correct.
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password!' });

            // Generate the jwt token.
            const token = await AuthMiddleware.generateToken(user);

            return res.status(200).json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    active: user.active,
                },
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getProfil(req, res) {
        // Check if the user exist and valid.
        const userId = req.user.user_id;
        console.log(userId);
        if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User id not valid!' });

        // Get the user from the database.
        try {
            const user = await User.findOne({
                where: { user_id: userId },
                attributes: { exclude: ['password'] },
            });

            // If the user not exist.
            if (!user) return res.status(400).json({ Error: `No user has the id : ${userId}` });

            // Return the user informations
            return res.json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async logout(req, res) {
        // TODO: Implement the logout function.
    }

    async isActive(req, res) {
        // Get the user from the database
        // Check if the user exist and valid.
        const userId = req.params.id;
        if (isNaN(Number(userId))) return res.status(400).json({ Error: 'User id not valid!' });

        // Get the user from the database.
        const user = await User.findOne({
            where: { user_id: userId },
            attributes: { exclude: ['password'] },
        });

        // If the user not exist.
        if (!user) return res.status(400).json({ Error: `No user has the id : ${userId}` });

        const isActive = user.active;

        return res.status(200).json({ active: isActive });
    }

    handleError(error, res) {
        // Using switch case to handle different error types.
        switch (error.name) {
            case 'SequelizeValidationError':
                // Handles validation errors (e.g., missing or invalid fields).
                const validationErrors = error.errors.map((err) => err.message);

                return res.status(400).json({
                    Error: 'Validation errors: ',
                    description: validationErrors.join(', '),
                });

            case 'SequelizeUniqueConstraintError':
                // Handles unique constraint violations (e.g., duplicate email).
                return res.status(400).json({
                    Error: 'Unique constraint violation: ',
                    description: error.errors[0].message,
                });

            case 'SequelizeForeignKeyConstraintError':
                // Handles foreign key constraint violations (e.g., non-existent agency_id).
                return res
                    .status(400)
                    .json({ Error: 'Foreign key constraint error: ', description: error.message });

            case 'SequelizeDatabaseError':
                // Handles database-related errors (e.g., SQL issues or constraint violations).
                return res
                    .status(500)
                    .json({ Error: 'Database error: ', description: error.message });

            default:
                // Handles any other errors (e.g., server errors, business logic issues).
                return res.status(500).json({ Error: 'Internal server error' });
        }
    }
}

export default new UserService();
