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

// write function to wrap the prompt questions and promise

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
        // write inquirer method to distinquish between which role is selected 
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
        // write promise function after initial prompt questions

        .then(function (res) {
            if (res.role === 'Manager') {
                // if role is manager -- create instance of manager and add response data
                const manager = new Manager(res.name, res.id, res.email, res.officeNumber)
                // push new instance to the array 'allEmployees'
                allEmployees.push(manager)
            } else if (res.role === 'Engineer') {
                // if role is engineer -- create instance of engineer and add response data
                const engineer = new Engineer(res.name, res.id, res.email, res.github)
                // push new instance to array 'allEmployees'
                allEmployees.push(engineer)
            } else if (res.role === 'Intern') {
                // if role is intern -- create instance of intern and add response data
                const intern = new Intern(res.name, res.id, res.email, res.school)
                // push new instance to array 'allEmployees'
                allEmployees.push(intern)
            }
            if (res.otherEmployees === true) {
                startPrompt()
            } else {
                const renderEmployee = render(allEmployees);
                fs.writeFile(outputPath, renderEmployee, function (err) {
                    if (err) {
                        return (err);
                    }
                })
            }
        });
};
startPrompt();