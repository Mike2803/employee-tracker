DROP TABLE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE `department` (
    `id` int NOT NULL,
    `name` varchar(30) DEFAULT NULL
);


CREATE TABLE `role` (
    `id` int NOT NULL,
    `title` varchar(30) DEFAULT NULL,
    `salary` decimal(30,0) DEFAULT NULL,
    `department_id` int DEFAULT NULL
);


CREATE TABLE `employee` (
    `id` int NOT NULL,
    `first_name` varchar(30) DEFAULT NULL,
    `last_name` varchar(30) DEFAULT NULL,
    `role_id` int DEFAULT NULL,
    `manager_id` int DEFAULT NULL
);



ALTER TABLE `employee`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `role`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `department`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;