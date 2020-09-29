const Employee = require("../lib/Employee");
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const employee = require("../lib/Employee")

class Engineer extends Employee{
    constructor(id, name, email, github) {
        super(name, id, email)
        this.github = github;
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

    getGithub() {
        return this.github
    };

    getRole() {
        return "Engineer"
    };
};
module.exports = Engineer;