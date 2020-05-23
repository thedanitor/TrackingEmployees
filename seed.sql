DROP DATABASE IF EXISTS trackerDB;
CREATE DATABASE trackerDB;
USE trackerDB;

CREATE TABLE department (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INTEGER(5),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER (5),
manager_id INTEGER (5),
  PRIMARY KEY (id)
);

-- Add department
INSERT INTO department (name)
VALUES 
("Delivery"), 
("Research"), 
("Human Resources"), 
("Medical");

-- Add role
INSERT INTO role (title, salary, department_id)
VALUES
("Delivery Boy", 30000, 1), 
("Captain", 50000, 1), 
("Cook", 40000, 1), 
("Scientist", 100000, 2), 
("Intern", 15000, 3), 
("Bureaucrat", 80000, 3);

-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Philip J.", "Fry", 1, 2), 
("Turanga", "Leela", 2, 4), 
("Bender", "Rodriguez", 3, 2),
("Hubert J.", "Farnsworth", 4, NULL), 
("Amy", "Wong", 5, 4), 
("Hermes", "Conrad", 6, NULL);