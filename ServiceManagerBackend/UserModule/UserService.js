import bcrypt from 'bcryptjs';

import Schema from './UserValidator.js'; // Contains the validation schemas.
import Models from '../DatabaseModule/ModelAssociations.js'; // Contains the database models.
import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; // Contains the authentication operations.
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
            const users = await User.findAll({
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC']], // Trier par date de création
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    async createUser(req, res) {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ Error: error.details[0].message });
        }
        try {
            const existingUser = await User.findOne({ where: { email: value.email } });
            if (existingUser) {
                return res.status(409).json({ Error: 'Email déjà utilisé!' });
            }
            const hashedPassword = await bcrypt.hash(value.password, 10);
            const currentAgency = await Agency.findOne({ where: { current: true } });
            if (!currentAgency) {
                return res.status(404).json({ Error: 'aucune agence active' });
            }
            const user = await User.create({
                ...value,
                password: hashedPassword,
                agency_id: currentAgency.agency_id,
            });
            res.status(201).json({ message: 'User created successfully', userId: user.user_id });
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

   
            
                        // Send the email using nodemailer.
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS
                            }
                        });
            
     const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; color: #333; }
                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 600px; margin: 20px auto; }
                .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
                .header h1 { color: #003366; font-size: 24px; margin: 0; }
                .content { padding: 20px 0; line-height: 1.6; }
                .button-container { text-align: center; margin: 30px 0; }
                .button { background-color: #FF6F00; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; }
                .footer { text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; }
                .footer a { color: #003366; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Bienvenue chez Safarelec!</h1>
                </div>
                <div class="content">
                    <p>Cher/Chère ${user.first_name + ' ' + user.last_name || 'utilisateur'},</p>
                    <p>Nous avons le plaisir de vous informer que votre compte sur **Safarelec** a été activé avec succès ! 🎉</p>
                    <p>Vous pouvez désormais vous connecter et profiter pleinement de toutes nos fonctionnalités.</p>

                    <div class="button-container">
                        <a href="http://localhost:3001/login" class="button">Se connecter maintenant</a>
                    </div>

                    <p>Votre identifiant (Email) : <strong>${user.email}</strong></p>
                    <p>Si vous avez des questions ou rencontrez des difficultés, n'hésitez pas à nous contacter.</p>
                </div>
                <div class="footer">
                    <p>Cordialement,<br>L'équipe de Safarelec</p>
                    <p><a href="http://localhost:3001">Notre site web</a></p>
                    <p>Ceci est un e-mail automatique, merci de ne pas y répondre directement.</p>
                </div>
            </div>
        </body>
        </html>
    `;
                        const mailOptions = {
                            from: "safarelec" + process.env.EMAIL_USER,
                            to: user.email,
                            subject: `Votre compte Safarelec est maintenant actif ! 🎉`,
                            html: emailHtml,
                        };
            
                        await transporter.sendMail(mailOptions, (error) => {
                            if (error) {
                                return res.status(500).json({ Error: error.message});
                            } else {
                                return res.status(201).json({
                                    message: 'Email sent successfully',
                                    emailId: email.email_id
                                });
                            }
                        });

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
            if (!user) return res.status(401).json({ message: "Email n'existe pas!" });

            // Check if the password is correct.
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                return res.status(401).json({ message: 'Mot de passe incorrect!' });

            // Generate the jwt token.
            const token = await AuthMiddleware.generateToken(user);

            return res.status(200).json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: user.user_id,
                    email: user.email,
                    role: user.role,
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
