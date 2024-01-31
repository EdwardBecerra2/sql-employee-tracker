INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Interconnected"),
        ("Sales"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineering Manager", 120000, 1),
        ("Engineering Lead", 100000, 1),
        ("Staff Engineer", 80000, 1),
        ("Finance Manager", 85000, 2),
        ("Accountant", 70000, 2),
        ("Brand Advocate Manager", 95000, 3),
        ("Brand Advocate Sr. Analyst", 82000, 3),
        ("Brand Advocate Analyst", 70000, 3),
        ("Sales Manager", 75000, 4),
        ("Salesperson", 65000, 4),
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