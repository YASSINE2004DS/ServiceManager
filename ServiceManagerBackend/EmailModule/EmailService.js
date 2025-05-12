import EmailValidator from './EmailValidator.js';
const { createEmailSchema } = EmailValidator;
import Models from '../DatabaseModule/ModelAssociations.js';
const { Email } = Models;

class EmailService {

    async createEmail(req, res) {
        // Validate the email informations.
        const { error, value } = createEmailSchema.validate(req.body);
        if(error) return res.status(400).json({ Error: error.details[0].message });
        

        // Create the new email.
        try{
            const email = await Email.create(
                {
                    title: value.title,
                    content: value.content,
                    status: 'unread',
                    source_user_id: value.source_user_id,
                    destination_user_id: value.destination_user_id
                }
            );
            
            // Email created successfully.
            return res.status(201).json({
                message: 'Email created successfully',
                emailId: email.email_id
            });

        }catch(error){
            return res.status(500).json({ Error: error.message });
        }

    }

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
