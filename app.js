const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const allEmployees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function startPrompt() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "list",
            name: "role",
            message: "What is your role?",
            choices:
                [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
            when: function (res) {
                return res.role === 'Manager'
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            when: function (res) {
                return res.role === 'Engineer'
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is your school name?",
            when: function (res) {
                return res.role === 'Intern'
            }
        },
        {
            type: "confirm",
            name: "otherEmployees",
            message: "Are there any more employees?"
            // if yes to more employees - how would we do that?
        }
    ])

        .then(function (res) {
            if (res.role === 'Manager') {
                const manager = new Manager(res.name, res.id, res.email, res.officeNumber)
                allEmployees.push(manager)
                console.log("Manager selected");
            } else if (res.role === 'Engineer') {
                const engineer = new Engineer(res.name, res.id, res.email, res.github)
                allEmployees.push(engineer)
                console.log("Engineer selected");
            } else if (res.role === 'Intern') {
                const intern = new Intern(res.name, res.id, res.email, res.school)
                allEmployees.push(intern)
                console.log("Intern selected");
            }
            if (res.otherEmployees === true) {
                startPrompt()
            } else {
                const renderEmployee = render(allEmployees);
                fs.writeFile(outputPath, renderEmployee, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                })
            }
        });
};
startPrompt();