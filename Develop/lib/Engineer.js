// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// const Engineer = require("../lib/Employee")

class Engineer {
    constructor(id, name, email, github) {
        this.id = id;
        this.name = name;
        this.email = email;
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