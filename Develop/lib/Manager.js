const Employee = require("../lib/Employee");
// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const employee = require("../lib/Employee")

class Manager extends Employee{
    constructor(id, name, email, officeNumber) {
       super(name, id, email)
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
        return "Manager"
    };
};
module.exports = Manager;