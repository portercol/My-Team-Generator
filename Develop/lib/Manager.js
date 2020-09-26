// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Manager = require("../lib/Employee")

class Manager {
    constructor(id, name, email, officeNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.officeNumber = officeNumber;
    }

    getId() {
        return this.id
    };

    getName() {
        return this.name
    };

    getEmail() {
        return this.email
    };

    getOfficeNumber() {
        return this.officeNumber
    };

    getRole() {
        return this.role
    };
};
module.exports = Manager;