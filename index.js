const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

function inputManagerData(){
inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the Manager's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the Manager's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Manager's email address?",
    },
    {
      type: 'input',
      name: 'officenumber',
      message: "What is the Manager's office number?",
    },
])
//make sure to give parameters individually not as object
.then((managerData) => { 
    const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officenumber
      );
    //console.log(newManager);  
    menu();
});  
}

//create menu
function menu(){
 inquirer.prompt([
    {
      type: 'checkbox',
      name: 'teammembers',
      message: "Please, choose from the following options:",
      choices: 
      ['Add an engineer',
      'Add an intern',
      'Finish building the team'
      ]
    },
 ])
//check what was the picked menu point
.then((answer) => {
    const selectedAnswer = answer.teammembers;
    
    if (selectedAnswer.length === 0) {
      console.log('You did not select any option.');
    } 
    else if (selectedAnswer.includes('Add an engineer')){
      inputEngineerData();
    }
    else if (selectedAnswer.includes('Add an intern')){
      inputInternData();
    }
    else if (selectedAnswer.includes('Finish building the team')){
      finish();
    }  

});  
}

//calling the start function
inputManagerData();

// function to gather Engineer data
function inputEngineerData(){
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "What is the engineer's name?",
        },
        {
          type: 'input',
          name: 'id',
          message: "What is the engineer's employee ID?",
        },
        {
          type: 'input',
          name: 'email',
          message: "What is the engineer's email address?",
        },
        {
          type: 'input',
          name: 'github',
          message: "What is the engineer's gitHub name?",
        },
    ])
    //make sure to give parameters individually not as object
    .then((engineerData) => { 
        const newEngineer = new Engineer(
          engineerData.name,
          engineerData.id,
          engineerData.email,
          engineerData.github
          );
        console.log(newEngineer);  
        menu();
    });  
    }