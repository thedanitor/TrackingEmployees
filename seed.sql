-- Add to department
INSERT INTO department (name)
VALUES 
("Delivery"), 
("Research"), 
("Human Resources"), 
("Medical");

-- Add to role
INSERT INTO role (title, salary, department_id)
VALUES
("Delivery Boy", 30000, 1), 
("Captain", 50000, 1), 
("Cook", 40000, 1), 
("Scientist", 100000, 2), 
("Intern", 15000, 3), 
("Bureaucrat", 80000, 3);

-- Add to employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Philip J.", "Fry", 1, 2), 
("Turanga", "Leela", 2, 4), 
("Bender", "Rodriguez", 3, 2),
("Hubert J.", "Farnsworth", 4, NULL), 
("Amy", "Wong", 5, 4), 
("Hermes", "Conrad", 6, NULL);