import UserService from "./UserService.js"

class UserController {

    async getUsers              (req, res) { return UserService.getUsers            (req, res); }

    async createUser            (req, res) { return UserService.createUser          (req, res); }

    async getUserById           (req, res) { return UserService.getUserById         (req, res); }

    async modifyUser            (req, res) { return UserService.modifyUser          (req, res); }

    async deleteUser            (req, res) { return UserService.deleteUser          (req, res); }

    async geInActivetUsers      (req, res) { return UserService.getInActivetUsers   (req, res); }

    async makeUserActive        (req, res) { return UserService.makeUserActive    (req, res); }

    async login                 (req, res) { return UserService.login               (req, res); }

    async getProfil             (req, res) { return UserService.getProfil           (req, res); }

    async logout                (req, res) { return UserService.logout              (req, res); }

}


export default new UserController();