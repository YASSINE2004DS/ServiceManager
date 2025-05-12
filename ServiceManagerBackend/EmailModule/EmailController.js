import EmailService from "./EmailService.js"

class EmailController {

    async createEmail(req, res){
        return EmailService.createEmail(req, res);
    }

    async getEmailsBySourceUserId(req, res){
        return EmailService.getEmailsBySourceUserId(req, res);
    }

    async getEmailsByDestinationUserId(req, res){
        return EmailService.getEmailsByDestinationUserId(req, res);
    }

    async getEmailById(req, res){
        return EmailService.getEmailById(req, res);
    }

    async readEmail(req, res){
        return EmailService.readEmail(req, res);
    }

}

export default new EmailController();
