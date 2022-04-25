// set up consts
const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//give questionsnode

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the title of this project?"
        },
        {
            type: "input",
            name: "description",
            message: "What is about of this project?"
        },
        {
            type: "input",
            name: "installation",
            message: "Are any other installation needed for this project?"
        },
        {
            type: "input",
            name: "usage",
            message: "What is the usage of this project?"
        },
        {
            type: "input",
            name: "test",
            message: "Dose this project been tested?"
        },
        {
            type: "checkbox",
            name: "license",
            message: "What types of license to apply?",
            choices: [
                "[MIT License](LICENSE.txt)",
                "[GNU GPLv3 License](COPYING.txt)",
            ]
        },
        {
            type: "input",
            name: "email",
            message: "What is the sponsor's email of this project?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the github username of this project?"
        },

    ]);
}

//generate according by answers
function generate(answers) {
    return `# ${answers.title}

#### Table of Contents
1. [Project Description](#description)
2. [Installation Instructions](#installation)
3. [Usage Information](#usage)
6. [Test Instructions](#test)
7. [License](#license)
8. [Questions](#contact)
## description
* ${answers.description}
## installation
* ${answers.installation}
## usage
* ${answers.usage}
## test
* ${answers.description}
## license
* ${answers.license}
## contact
* Any additional infomation needed, please reach out to ${answers.email}
* My Github : [${answers.github}](http://github.com/${answers.github})`;
}

//give back to users
promptUser()
    .then(function(answers) {
        const readme = generate(answers);


        return writeFileAsync("README.md", readme);
    })
    .then(function() {
        console.log("README.md has been created!");
    })
    .catch(function(err) {
        console.log(err);
    });