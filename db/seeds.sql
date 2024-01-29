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
VALUES  ("dale", "doeback",  1, NULL),
        ("sebas", "coldren",  2, 1), 
        ("erik", "espitia",  3, 1), 
        ("matt", "alaverado",  4, NULL), 
        ("ozzy", "rifas",  5, 4),
        ("danny", "escalante",  6, NULL), 
        ("paul", "walker",  7, 6), 
        ("dom", "toretto",  8, 6), 
        ("andrew", "bill",  9, NULL), 
        ("pat", "morales",  10, 9), 
        ("tiffany", "martinez",  11, NULL), 
        ("jack", "black",  12, 11);