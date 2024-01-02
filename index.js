const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//if output is not exists yet, we create it
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const render = require("./src/page-template.js");

//array to store team members objects
const teamArr = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

function inputManagerData(){
inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the Manager's name?",
      validate: val => /^[a-zA-Z]+$/g.test(val),
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the Manager's employee ID?",
      validate: val => /^[1-9]+$/.test(val),
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Manager's email address?",
      validate: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    },
    {
      type: 'input',
      name: 'officenumber',
      message: "What is the Manager's office number?",
      validate: val => /^[1-9]+$/.test(val),
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
    
    teamArr.push(newManager);
    menu();
});  

}

//calling the start function
inputManagerData();

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
      menu();
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



// function to gather Engineer data
function inputEngineerData(){
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "What is the engineer's name?",
          validate: val => /^[a-zA-Z]+$/g.test(val),
        },
        {
          type: 'input',
          name: 'id',
          message: "What is the engineer's employee ID?",
          validate: val => /^[1-9]+$/.test(val),
        },
        {
          type: 'input',
          name: 'email',
          message: "What is the engineer's email address?",
          validate: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        },
        {
          type: 'input',
          name: 'github',
          message: "What is the engineer's gitHub name?",
          validate: val => /^[a-zA-Z0-9]+$/.test(val),
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
        //console.log(newEngineer);  
        
        menu();
        return teamArr.push(newEngineer);
    });
    
    }

// function to gather Intern data
function inputInternData(){
  inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?",
        validate: val => /^[a-zA-Z]+$/g.test(val),
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the intern's employee ID?",
        validate: val => /^[1-9]+$/.test(val),
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the intern's email address?",
        validate: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      },
      {
        type: 'input',
        name: 'school',
        message: "What is the name of the intern's school?",
        validate: val => /^[a-zA-Z0-9]+$/.test(val),
      },
  ])
  //make sure to give parameters individually not as object
  .then((internData) => { 
      const newIntern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
        );
        
      menu(); 
      return teamArr.push(newIntern);
  }); 

  }    

  function finish(){
    const htmlContent = render(teamArr); // Generate the HTML content

  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('HTML file is ready: ' + outputPath);
    }
    process.exit(0);
  });
}