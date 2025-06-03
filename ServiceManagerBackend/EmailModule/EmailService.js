import EmailValidator from './EmailValidator.js';
const { createEmailSchema } = EmailValidator;
import Models from '../DatabaseModule/ModelAssociations.js';
const { Email, User } = Models;
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';


class EmailService {


     async createEmail(req , res) {
        // Validate the email informations.
        const { error, value } = createEmailSchema.validate(req.body);
        if(error) return res.status(400).json({ Error: error.details[0].message });

        // get the destination user id from the database.
        try{
            const destinationUser = await User.findOne({ where: { email: value.destination_email }});
            if(!destinationUser) return res.status(404).json({ Error: 'Adresse Email n\'existe pas' });

            const destinationUserId = destinationUser.user_id;

            // Create the email in the database.
            const email = await Email.create(
                {
                    title: value.title,
                    content: value.content,
                    source_user_id: req.user.user_id,
                    destination_user_id: destinationUserId
                }
            );

            // Send the email using nodemailer.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: value.destination_email,
                subject: value.title,
                text: value.content , 
                attachments: req.file ?[
                        {
                             filename: req.file.originalname,
                             path: path.resolve(req.file.path)  // ✔️ Chemin absolu vers le fichier
                        }
                    ] : []
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

        //    fs.unlink(path.resolve(req.file.path), (err) => {
        //         if (err) {
        //           console.error("Erreur lors de la suppression du fichier :", err);
        //         } else {
        //             console.log("Fichier supprimé avec succès");
        //         }
        //     });

        } catch(error){
            return res.status(500).json({ Error: error.message});
        }
     }

    // async createEmail(req, res) {
    //     // Validate the email informations.
    //     const { error, value } = createEmailSchema.validate(req.body);
    //     if(error) return res.status(400).json({ Error: error.details[0].message });
    //     console.log(req.user);

    //     // get the destination user id from the database.
    //     try{
    //         const destinationUser = await User.findOne({ where: { email: value.destination_email }});
    //         if(!destinationUser) return res.status(404).json({ Error: 'Destination user not found' });

    //         const destinationUserId = destinationUser.user_id;
    //         const email = await Email.create(
    //             {
    //                 title: value.title,
    //                 content: value.content,
    //                 status: 'unread',
    //                 source_user_id: req.user.user_id,
    //                 destination_user_id: destinationUserId
    //             }
    //         );

    //         // Email created successfully.
    //         return res.status(201).json({
    //             message: 'Email created successfully',
    //             emailId: email.email_id
    //         });

    //     } catch(error){
    //         return res.status(500).json({ Error: error.message });
    //     }
    // }

    async getEmailsBySourceUserId(req, res) {
        // Get the user id from the request.
        const { userid } = req.params;

        // Get the emails by user id.
        try {
            const emails = await Email.findAll({ where: { source_user_id: userid }});
            return res.status(200).json(emails);
        } catch (error) {
            return res.status(500).json({ Error: error.message });
        }
    }

    async getEmailsByDestinationUserId(req, res) {
        // Get the user id from the request.
        const { userid } = req.params;

        // Get the emails by user id.
        try {
            const emails = await Email.findAll({ where: { destination_user_id: userid }});
            return res.status(200).json(emails);
        } catch (error) {
            return res.status(500).json({ Error: error.message });
        }
    }

    async getEmailById(req, res) {
        // Get the email id from the request.
        const { id } = req.params;

        // Get the email by id.
        try {
            const email = await Email.findByPk(id);
            return res.status(200).json(email);
        } catch (error) {
            return res.status(500).json({ Error: error.message });
        }
    }

    async readEmail(req, res) {
        // Get the email id from the request.
        const { id } = req.params;

        // Update the email status to read.
        try {
            await Email.update({ status: 'read' }, { where: { email_id: id }});
            return res.status(200).json({ message: 'Email read successfully' });
        } catch (error) {
            return res.status(500).json({ Error: error.message });
        }
    }

}

export default new EmailService();
