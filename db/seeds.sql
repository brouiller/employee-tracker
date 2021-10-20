INSERT INTO
    departments (name)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ("Accountant", 80000, 2),
    ("Lawyer", 65000, 3),
    ("Developer", 120000, 1),
    ("Paralegal", 64000, 3),
    ("CPA", 81000, 2),
    ("PE", 125000, 1),
    ("Clerk", 63000, 2);

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Dane", 5, NULL),
    ("Jon", "Don", 2, NULL),
    ("Jenna", "Denna", 3, NULL),
    ("Joe", "Doe", 4, 2),
    ("Jeff", "Deff", 1, 1),
    ("Judy", "Duty", 6, 3),
    ("James", "Dames", 7, 5),
    ("Janet", "Dammit", 7, 3),
    ("Jordy", "DaFordy", 4, 2);