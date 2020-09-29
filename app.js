const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Develop/lib/htmlRenderer");
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
            //console.log(res)
            if (res.otherEmployees === true) {
                startPrompt()
            } else {
                const renderEmployee = render(allEmployees);
                fs.writeFile("team.html", renderEmployee, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    //console.log("Employee html generated!");
                })
            }
        });
};
startPrompt()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```