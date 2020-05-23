# Tracking Employees

I made a command line application for keeping track of employees.

GIF HERE

## Table of Contents

* [Description](#description)
* [Technologies Used](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Acknowledgements](#acknowledgements)

## Description

This application was developed with the following user story in mind:

*As a business owner/
I want to be able to view and manage the departments, roles, and employees in my company/
So that I can organize and plan my business*

The database was created with three tables:

**Employee:** contains the employee name and links them to a role and manager

**Role:** contains a job title with a salary and is linked to a department

**Department:** contains the department name and id

These are the options the app provides:
* View all employees
* View all employees by department
* VIew all employees by manager
* View all roles
* View all departments
* Add employee
* Add department
* Add role
* Update employee role
* Update employee manager
* Remove employee
* Remove role

## Technologies Used

MySQL was used to create the database and tables\
node inquirer and console table were used to create the command line interface\
JavaScript was used to create the functions

## Installation

To install the necessary dependencies run npm i on the command line.\
User will need to create a .env file and enter their environment variables\
Finally copy the schema and seed data into MySQL and run to create the database\
Now application is ready to use!

## Usage

Either run **npm start** or **node server.js** on the command line to start the application.\
Select the relevant prompts to view, add, update, or remove employees as well as their managers, roles, and departments

## Acknowledgements

I would like to thank UW Coding bootcamp. Special shoutout to tutor Namita Shenai, instructor John Young and TA's Abdul Aziz and Ben Vaagen.