-- Students table for career_academy
USE career_academy;

CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    country VARCHAR(100),
    age INT,
    gender VARCHAR(50),
    education_level VARCHAR(100),
    field_of_study VARCHAR(100)
);

-- Sample data
INSERT INTO students (first_name, last_name, country, age, gender, education_level, field_of_study) VALUES
;
