INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Resturant"),
        ("Retail"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineering Manager", 110000, 1),
        ("Engineering Lead", 90000, 1),
        ("Staff Engineer", 70000, 1),
        ("Human Rescources", 73000, 2),
        ("Accountant", 70000, 2),
        ("Floor Manager", 95000, 3),
        ("Floor Sr. Analyst", 82000, 3),
        ("Floor Analyst", 50000, 3),
        ("Sales Manager", 60000, 4),
        ("Sales Assoicate", 30000, 4),
        ("Legal Manager", 110000, 5),
        ("Lawyer", 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("janet", "martinez",  1, NULL),
        ("frank", "man",  2, 1),
        ("ben", "jobs",  3, 1), 
        ("Julia", "rangel",  4, NULL), 
        ("kate", "diaz",  5, 4),
        ("tome", "couper",  6, NULL), 
        ("bill", "milani",  7, 6), 
        ("tom", "cruiz",  8, 6), 
        ("kevin", "jackson",  9, NULL), 
        ("blake", "tomas",  10, 9), 
        ("rob", "deer",  11, NULL), 
        ("jess", "vega",  12, 11);