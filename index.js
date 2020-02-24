const fs = require('fs');
const { exec, spawn } = require('child_process');
const inquirer = require('inquirer');

let path = '';
const packageData = `{
    "name": "${path}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "mocha spec"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/northcoders/BE-callback-heaven.git"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    
    "homepage": "",
    "dependencies": {
      "chai": "^4.2.0",
      "inquirer": "^7.0.4",
      "mocha": "^7.0.1"
    }
  }`;

function command() {
  inquirer
    .prompt([
      {
        type: 'input',
        default: 'my-new-project',
        name: 'project-name',
        message: 'Insert project name'
      }
    ])
    .then(answer => {
      path = answer['project-name'];
      fs.mkdir(path, err => {
        if (err) throw err;
        fs.writeFile(`./${path}/index.js`, '', err => {
          if (err) throw err;
        });
        fs.mkdir(`./${path}/spec`, err => {
          if (err) throw err;
          fs.writeFile(`./${path}/spec/index.spec.js`, '', err => {
            if (err) throw err;
          });
        });
        fs.writeFile(`./${path}/package.json`, packageData, err => {
          if (err) throw err;
          spawn(`npm`, [`install`, `--prefix`, `./${path}`]);
        });
        fs.writeFile(`./${path}/README.md`, 'Insert README here...', err => {
          if (err) throw err;
        });
        fs.writeFile(`./${path}/.eslintrc`, '', err => {
          if (err) throw err;
        });
        fs.writeFile(`./${path}/.gitignore`, 'node_modules', err => {
          if (err) throw err;
        });
        exec(`git init ./${path}`, err => {
          if (err) throw err;
        });
      });
    });
}

module.exports = command;
