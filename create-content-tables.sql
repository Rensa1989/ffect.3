-- Create tables for popular jobs, majors, and career paths

-- Create popular_jobs table
CREATE TABLE IF NOT EXISTS popular_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    title_kh VARCHAR(100),
    description TEXT NOT NULL,
    description_kh TEXT,
    image_path VARCHAR(255),
    salary_range VARCHAR(100),
    requirements TEXT,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create popular_majors table
CREATE TABLE IF NOT EXISTS popular_majors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    title_kh VARCHAR(100),
    description TEXT NOT NULL,
    description_kh TEXT,
    image_path VARCHAR(255),
    institutions TEXT,
    skills_gained TEXT,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create career_paths table
CREATE TABLE IF NOT EXISTS career_paths (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    title_kh VARCHAR(100),
    description TEXT NOT NULL,
    description_kh TEXT,
    image_path VARCHAR(255),
    progression_steps TEXT,
    required_education TEXT,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for popular jobs
INSERT INTO popular_jobs (title, title_kh, description, description_kh, salary_range, requirements, is_active, display_order) VALUES
('Software Developer', 'អ្នកអភិវឌ្ឍន៍កម្មវិធី', 'Designs, develops, and tests software applications for various platforms.', 'រចនា អភិវឌ្ឍ និងធ្វើតេស្តកម្មវិធីសម្រាប់វេទិកាផ្សេងៗ។', '$70,000 - $120,000', 'Bachelor\'s degree in Computer Science or related field, programming skills in languages like Java, Python, or C++.', 1, 1),
('Data Scientist', 'អ្នកវិទ្យាសាស្ត្រទិន្នន័យ', 'Analyzes and interprets complex data to help organizations make better decisions.', 'វិភាគ និងបកស្រាយទិន្នន័យស្មុគស្មាញដើម្បីជួយស្ថាប័នធ្វើការសម្រេចចិត្តឱ្យបានប្រសើរជាងមុន។', '$90,000 - $150,000', 'Master\'s or PhD in Statistics, Mathematics, Computer Science, or related field. Skills in Python, R, SQL, and machine learning.', 1, 2),
('UX/UI Designer', 'អ្នករចនា UX/UI', 'Creates user-friendly interfaces and experiences for websites and applications.', 'បង្កើតចំណុចប្រទាក់និងបទពិសោធន៍ងាយស្រួលប្រើប្រាស់សម្រាប់គេហទំព័រនិងកម្មវិធី។', '$60,000 - $110,000', 'Bachelor\'s degree in Design, HCI, or related field. Proficiency in design tools like Adobe XD, Figma, or Sketch.', 1, 3),
('Marketing Manager', 'អ្នកគ្រប់គ្រងទីផ្សារ', 'Develops and implements marketing strategies to promote products or services.', 'អភិវឌ្ឍ និងអនុវត្តយុទ្ធសាស្ត្រទីផ្សារដើម្បីផ្សព្វផ្សាយផលិតផល ឬសេវាកម្ម។', '$65,000 - $120,000', 'Bachelor\'s degree in Marketing, Business, or related field. Experience in digital marketing, content creation, and campaign management.', 1, 4);

-- Insert sample data for popular majors
INSERT INTO popular_majors (title, title_kh, description, description_kh, institutions, skills_gained, is_active, display_order) VALUES
('Computer Science', 'វិទ្យាសាស្ត្រកុំព្យូទ័រ', 'Study of computers and computational systems, including programming, algorithms, and software development.', 'ការសិក្សាអំពីកុំព្យូទ័រ និងប្រព័ន្ធគណនា រួមទាំងការសរសេរកម្មវិធី ក្បួនដោះស្រាយ និងការអភិវឌ្ឍន៍កម្មវិធី។', 'MIT, Stanford, UC Berkeley, Harvard', 'Programming, problem-solving, analytical thinking, software development, data structures', 1, 1),
('Business Administration', 'រដ្ឋបាលអាជីវកម្ម', 'Study of business operations including management, marketing, finance, and entrepreneurship.', 'ការសិក្សាអំពីប្រតិបត្តិការអាជីវកម្ម រួមទាំងការគ្រប់គ្រង ទីផ្សារ ហិរញ្ញវត្ថុ និងសហគ្រិនភាព។', 'Harvard Business School, Wharton, London Business School', 'Management, leadership, financial analysis, strategic planning, communication', 1, 2),
('Engineering', 'វិស្វកម្ម', 'Application of scientific and mathematical principles to design and build machines, structures, and systems.', 'ការអនុវត្តគោលការណ៍វិទ្យាសាស្ត្រ និងគណិតវិទ្យាដើម្បីរចនា និងសាងសង់ម៉ាស៊ីន រចនាសម្ព័ន្ធ និងប្រព័ន្ធ។', 'MIT, Stanford, Caltech, Georgia Tech', 'Problem-solving, technical skills, design thinking, project management, analytical skills', 1, 3),
('Psychology', 'ចិត្តវិទ្យា', 'Study of the human mind and behavior, including cognitive processes, development, and social interactions.', 'ការសិក្សាអំពីចិត្តនិងឥរិយាបថរបស់មនុស្ស រួមទាំងដំណើរការការយល់ដឹង ការអភិវឌ្ឍ និងអន្តរកម្មសង្គម។', 'Stanford, Harvard, Yale, UC Berkeley', 'Research, analysis, critical thinking, communication, empathy, counseling', 1, 4);

-- Insert sample data for career paths
INSERT INTO career_paths (title, title_kh, description, description_kh, progression_steps, required_education, is_active, display_order) VALUES
('Medical Professional', 'អ្នកជំនាញផ្នែកវេជ្ជសាស្ត្រ', 'A career in healthcare, diagnosing and treating patients with various medical conditions.', 'អាជីពនៅក្នុងវិស័យថែទាំសុខភាព ធ្វើរោគវិនិច្ឆ័យ និងព្យាបាលអ្នកជំងឺដែលមានជំងឺផ្សេងៗ។', '1. Pre-med studies, 2. Medical School, 3. Residency, 4. Fellowship (optional), 5. Board Certification, 6. Practice Medicine', 'Bachelor\'s degree, Medical School (MD or DO), Residency program, Fellowship (for specialization)', 1, 1),
('Software Engineering', 'វិស្វកម្មកម្មវិធី', 'A career focused on designing, developing, and maintaining software systems.', 'អាជីពដែលផ្តោតលើការរចនា ការអភិវឌ្ឍ និងការថែទាំប្រព័ន្ធកម្មវិធី។', '1. Junior Developer, 2. Software Engineer, 3. Senior Engineer, 4. Lead Developer, 5. Software Architect, 6. CTO', 'Bachelor\'s degree in Computer Science or related field, certifications, continuous learning', 1, 2),
('Finance Professional', 'អ្នកជំនាញហិរញ្ញវត្ថុ', 'A career in managing financial resources, investments, and economic strategies.', 'អាជីពក្នុងការគ្រប់គ្រងធនធានហិរញ្ញវត្ថុ ការវិនិយោគ និងយុទ្ធសាស្ត្រសេដ្ឋកិច្ច។', '1. Financial Analyst, 2. Senior Analyst, 3. Investment Manager, 4. Finance Director, 5. CFO', 'Bachelor\'s degree in Finance, Accounting, or Economics, MBA, CFA certification', 1, 3),
('Education', 'ការអប់រំ', 'A career focused on teaching, developing curriculum, and supporting student learning.', 'អាជីពដែលផ្តោតលើការបង្រៀន ការអភិវឌ្ឍកម្មវិធីសិក្សា និងការគាំទ្រការរៀនសូត្ររបស់សិស្ស។', '1. Teacher, 2. Lead Teacher, 3. Department Head, 4. Assistant Principal, 5. Principal, 6. District Administrator', 'Bachelor\'s degree in Education, Master\'s degree for advancement, teaching certification, EdD or PhD for higher positions', 1, 4);
