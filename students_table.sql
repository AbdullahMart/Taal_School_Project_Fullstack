-- Students table for app_db
USE app_db;

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
('Emma', 'Thompson', 'United Kingdom', 22, 'Female', 'Bachelor', 'Computer Science'),
('Lukas', 'Müller', 'Germany', 24, 'Male', 'Master', 'Data Science'),
('Sofia', 'Garcia', 'Spain', 21, 'Female', 'High School', 'Artificial Intelligence'),
('Hiroshi', 'Tanaka', 'Japan', 23, 'Male', 'PhD', 'Cyber Security'),
('Amara', 'Diallo', 'Senegal', 25, 'Female', 'Bachelor', 'Software Engineering'),
('Mateo', 'Rossi', 'Italy', 22, 'Male', 'Bachelor', 'Web Development');
