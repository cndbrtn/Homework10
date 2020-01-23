const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");


let employeeArr = [];


const promptTeam = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Team member name:",
                name: "name"
            },

            {
                type: "input",
                message: "Team member ID:",
                name: "id"
            },

            {
                type: "input",
                message: "Team member email:",
                name: "email"
            },

            {
                type: "list",
                message: "Team member role:",
                name: "role",
                choices: ["Engineer", "Manager", "Intern"]
            }

        ]).then(function (data) {

            if (data.role === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Office number:",
                            name: "officenum"
                        }
                    ]).then(function (mdata) {
                        let manager = new Manager(data.name, data.id, data.email, mdata.officenum);
                        employeeArr.push(manager)
                        console.log(`Manager selected: ${manager.name}`);
                        again();
                    })
            }
            else if (data.role === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "GitHub username:",
                            name: "github"
                        }
                    ]).then(function (edata) {
                        let engineer = new Engineer(data.name, data.id, data.email, edata.github);
                        employeeArr.push(engineer)
                        console.log(`Engineer: ${engineer.name}, GitHub: ${engineer.github}`);
                        again();
                        console.log(`Employee array looks like: ${JSON.stringify(employeeArr)}`)
                    })
            }
            else if (data.role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "School:",
                            name: "school"
                        }
                    ]).then(function (idata) {
                        let intern = new Intern(data.name, data.id, data.email, idata.school);
                        employeeArr.push(intern);
                        console.log(`Employee array looks like: ${JSON.stringify(employeeArr)}`);
                        again();
                    })
            }
        })
};

promptTeam();

const again = function () {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Add another team member?",
                name: "add"
            }
        ]).then(function (data) {
            if (data.add === true) {
                console.log("You want MORE???");
                promptTeam();
            } else {
                console.log(`Final Array: ${JSON.stringify(employeeArr)}`)
                fs.writeFileSync(outputPath, render(employeeArr));
            }
        })
};

