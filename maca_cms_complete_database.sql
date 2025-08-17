-- Create database (uncomment if you need to create the database)
-- CREATE DATABASE IF NOT EXISTS maca_cms;
-- USE maca_cms;

-- Drop tables if they exist to avoid errors
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create announcements table
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_km VARCHAR(255),
  content TEXT NOT NULL,
  content_km TEXT,
  image_path VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_km VARCHAR(255),
  summary TEXT NOT NULL,
  summary_km TEXT,
  content TEXT NOT NULL,
  content_km TEXT,
  image_path VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create media table
CREATE TABLE media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_km VARCHAR(100),
  position VARCHAR(100) NOT NULL,
  position_km VARCHAR(100),
  bio TEXT NOT NULL,
  bio_km TEXT,
  image_path VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_value_km TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create slides table for homepage slideshow
CREATE TABLE slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_km VARCHAR(255),
  description TEXT,
  description_km TEXT,
  image_path VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create programs table
CREATE TABLE programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_km VARCHAR(255),
  description TEXT NOT NULL,
  description_km TEXT,
  image_path VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_activity_log table
CREATE TABLE user_activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  activity_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email, role, is_active) VALUES 
('admin', '$2y$10$8WxmVFxS5mZ.Rq.Vl0XUOuLp9m5BmHRWH6tM3wFOlWUyNLFIFzJlK', 'admin@maca.edu', 'admin', 1);

-- Insert sample announcements
INSERT INTO announcements (title, title_km, content, content_km, is_active, created_at) VALUES 
('Registration for Fall Semester Now Open', 'ការចុះឈ្មោះសម្រាប់ឆមាសរដូវស្លឹកឈើជ្រុះឥឡូវបើកហើយ', '<p>Registration for the Fall 2023 semester is now open for all students. Please log in to the student portal to register for your courses.</p><p>Early registration is available for seniors and juniors from June 1-15, and for all other students from June 16-30.</p><p>For assistance with registration, please contact the Registrar\'s Office.</p>', '<p>ការចុះឈ្មោះសម្រាប់ឆមាសរដូវស្លឹកឈើជ្រុះឆ្នាំ 2023 ឥឡូវនេះបើកសម្រាប់និស្សិតទាំងអស់។ សូមចូលទៅក្នុងផតថលនិស្សិតដើម្បីចុះឈ្មោះសម្រាប់វគ្គសិក្សារបស់អ្នក។</p><p>ការចុះឈ្មោះមុនមានសម្រាប់និស្សិតឆ្នាំចុងក្រោយ និងឆ្នាំទីបីចាប់ពីថ្ងៃទី 1-15 ខែមិថុនា និងសម្រាប់និស្សិតផ្សេងទៀតទាំងអស់ចាប់ពីថ្ងៃទី 16-30 ខែមិថុនា។</p><p>សម្រាប់ជំនួយក្នុងការចុះឈ្មោះ សូមទាក់ទងការិយាល័យចុះឈ្មោះ។</p>', 1, '2023-05-25 10:00:00'),
('Scholarship Applications Due Next Week', 'ពាក្យសុំអាហារូបករណ៍ត្រូវផុតកំណត់នៅសប្តាហ៍ក្រោយ', '<p>This is a reminder that scholarship applications for the upcoming academic year are due by June 15, 2023.</p><p>All required documents must be submitted by the deadline to be considered for scholarships.</p><p>For more information, please visit the Financial Aid Office or contact scholarships@maca.edu.</p>', '<p>នេះគឺជាការរំលឹកថាពាក្យសុំអាហារូបករណ៍សម្រាប់ឆ្នាំសិក្សាខាងមុខត្រូវផុតកំណត់នៅថ្ងៃទី 15 ខែមិថុនា ឆ្នាំ 2023។</p><p>ឯកសារដែលត្រូវការទាំងអស់ត្រូវតែដាក់ជូនត្រឹមកាលបរិច្ឆេទកំណត់ដើម្បីត្រូវបានពិចារណាសម្រាប់អាហារូបករណ៍។</p><p>សម្រាប់ព័ត៌មានបន្ថែម សូមទស្សនាការិយាល័យជំនួយហិរញ្ញវត្ថុ ឬទាក់ទង scholarships@maca.edu។</p>', 1, '2023-06-08 14:30:00'),
('Campus Closure for Independence Day', 'ការបិទបរិវេណសាកលវិទ្យាល័យសម្រាប់ថ្ងៃឯករាជ្យ', '<p>Please note that the campus will be closed on July 4, 2023, in observance of Independence Day.</p><p>All classes and administrative offices will be closed. Regular operations will resume on July 5, 2023.</p><p>We wish everyone a safe and happy holiday!</p>', '<p>សូមកត់សម្គាល់ថាបរិវេណសាកលវិទ្យាល័យនឹងត្រូវបិទនៅថ្ងៃទី 4 ខែកក្កដា ឆ្នាំ 2023 ដើម្បីប្រារព្ធថ្ងៃឯករាជ្យ។</p><p>ថ្នាក់រៀននិងការិយាល័យរដ្ឋបាលទាំងអស់នឹងត្រូវបិទ។ ប្រតិបត្តិការធម្មតានឹងចាប់ផ្តើមឡើងវិញនៅថ្ងៃទី 5 ខែកក្កដា ឆ្នាំ 2023។</p><p>យើងសូមជូនពរឱ្យគ្រប់គ្នាមានថ្ងៃឈប់សម្រាកប្រកបដោយសុវត្ថិភាពនិងរីករាយ!</p>', 1, '2023-06-20 09:15:00');

-- Insert sample news
INSERT INTO news (title, title_km, summary, summary_km, content, content_km, is_active, created_at) VALUES 
('MACA Students Win National Competition', 'និស្សិត MACA ឈ្នះការប្រកួតថ្នាក់ជាតិ', 'A team of MACA students has won first place in the National Academic Challenge, bringing home the prestigious award for the first time in the institution\'s history.', 'ក្រុមនិស្សិត MACA បានឈ្នះលេខ 1 ក្នុងការប្រកួតប្រជែងសិក្សាថ្នាក់ជាតិ ដោយនាំយកពានរង្វាន់ដ៏មានកិត្តិយសមកផ្ទះជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រនៃស្ថាប័ន។', '<p>A team of five MACA students has won first place in the National Academic Challenge, bringing home the prestigious award for the first time in the institution\'s history.</p><p>The team, consisting of Sarah Johnson, Michael Chen, Emily Rodriguez, David Kim, and Lisa Patel, competed against 50 other institutions from across the country in a rigorous three-day competition that tested their knowledge in various academic disciplines.</p><p>"We are incredibly proud of our students for this remarkable achievement," said Dr. James Wilson, President of MACA. "Their success is a testament to their hard work, dedication, and the quality of education at MACA."</p><p>The National Academic Challenge is one of the most prestigious competitions for higher education institutions, with a focus on critical thinking, problem-solving, and interdisciplinary knowledge.</p><p>The winning team will be honored at a special ceremony on campus next month.</p>', '<p>ក្រុមនិស្សិត MACA ចំនួនប្រាំនាក់បានឈ្នះលេខ 1 ក្នុងការប្រកួតប្រជែងសិក្សាថ្នាក់ជាតិ ដោយនាំយកពានរង្វាន់ដ៏មានកិត្តិយសមកផ្ទះជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រនៃស្ថាប័ន។</p><p>ក្រុមដែលមានសមាជិក Sarah Johnson, Michael Chen, Emily Rodriguez, David Kim និង Lisa Patel បានប្រកួតប្រជែងជាមួយស្ថាប័នចំនួន 50 ផ្សេងទៀតពីទូទាំងប្រទេសក្នុងការប្រកួតដ៏តឹងរឹងរយៈពេលបីថ្ងៃដែលបានសាកល្បងចំណេះដឹងរបស់ពួកគេក្នុងវិន័យសិក្សាផ្សេងៗ។</p><p>"យើងមានមោទនភាពយ៉ាងខ្លាំងចំពោះនិស្សិតរបស់យើងសម្រាប់សមិទ្ធិផលដ៏អស្ចារ្យនេះ" លោកបណ្ឌិត James Wilson ប្រធាន MACA បានមានប្រសាសន៍។ "ជោគជ័យរបស់ពួកគេគឺជាសក្ខីភាពនៃការខិតខំប្រឹងប្រែង ការប្តេជ្ញាចិត្ត និងគុណភាពនៃការអប់រំនៅ MACA។"</p><p>ការប្រកួតប្រជែងសិក្សាថ្នាក់ជាតិគឺជាការប្រកួតប្រជែងដ៏មានកិត្តិយសបំផុតមួយសម្រាប់ស្ថាប័នឧត្តមសិក្សា ដោយផ្តោតលើការគិតប្រកបដោយការវិភាគ ការដោះស្រាយបញ្ហា និងចំណេះដឹងអន្តរវិន័យ។</p><p>ក្រុមឈ្នះនឹងត្រូវបានគោរពនៅក្នុងពិធីពិសេសមួយនៅក្នុងបរិវេណសាកលវិទ្យាល័យនៅខែក្រោយ។</p>', 1, '2023-05-15 11:45:00'),
('New Career Center Opening Next Month', 'មជ្ឈមណ្ឌលអាជីពថ្មីបើកនៅខែក្រោយ', 'MACA is excited to announce the opening of a state-of-the-art Career Center designed to provide students with comprehensive career guidance and resources.', 'MACA មានសេចក្តីរីករាយក្នុងការប្រកាសពីការបើកមជ្ឈមណ្ឌលអាជីពទំនើបដែលត្រូវបានរចនាឡើងដើម្បីផ្តល់ជូននិស្សិតនូវការណែនាំអាជីពនិងធនធានគ្រប់ជ្រុងជ្រោយ។', '<p>MACA is excited to announce the opening of a state-of-the-art Career Center designed to provide students with comprehensive career guidance and resources.</p><p>The new facility, located in the Student Services Building, will offer career counseling, resume and interview workshops, job search assistance, and networking opportunities with industry professionals.</p><p>"Our goal is to ensure that every MACA student is well-prepared for the job market and has the resources they need to succeed in their chosen career," said Maria Gonzalez, Director of Career Services.</p><p>The Career Center will also feature a technology lab with specialized software for career exploration and job searching, as well as private rooms for virtual interviews.</p><p>The grand opening ceremony will take place on July 15, 2023, at 10:00 AM, and all students, faculty, and staff are invited to attend.</p>', '<p>MACA មានសេចក្តីរីករាយក្នុងការប្រកាសពីការបើកមជ្ឈមណ្ឌលអាជីពទំនើបដែលត្រូវបានរចនាឡើងដើម្បីផ្តល់ជូននិស្សិតនូវការណែនាំអាជីពនិងធនធានគ្រប់ជ្រុងជ្រោយ។</p><p>អគារថ្មីដែលមានទីតាំងនៅក្នុងអគារសេវាកម្មនិស្សិតនឹងផ្តល់ជូននូវការប្រឹក្សាយោបល់អាជីព សិក្ខាសាលាស្តីពីប្រវត្តិរូបសង្ខេបនិងការសម្ភាសន៍ ជំនួយក្នុងការស្វែងរកការងារ និងឱកាសបង្កើតបណ្តាញជាមួយអ្នកជំនាញក្នុងឧស្សាហកម្ម។</p><p>"គោលដៅរបស់យើងគឺដើម្បីធានាថានិស្សិត MACA គ្រប់រូបត្រូវបានត្រៀមខ្លួនយ៉ាងល្អសម្រាប់ទីផ្សារការងារ និងមានធនធានដែលពួកគេត្រូវការដើម្បីទទួលបានជោគជ័យក្នុងអាជីពដែលពួកគេបានជ្រើសរើស" លោកស្រី Maria Gonzalez នាយិកាសេវាកម្មអាជីពបានមានប្រសាសន៍។</p><p>មជ្ឈមណ្ឌលអាជីពក៏នឹងមានមន្ទីរពិសោធន៍បច្ចេកវិទ្យាជាមួយនឹងកម្មវិធីឯកទេសសម្រាប់ការស្វែងរកអាជីពនិងការស្វែងរកការងារ ព្រមទាំងបន្ទប់ឯកជនសម្រាប់ការសម្ភាសន៍តាមអ៊ីនធឺណិតផងដែរ។</p><p>ពិធីសម្ពោធជាផ្លូវការនឹងប្រព្រឹត្តទៅនៅថ្ងៃទី 15 ខែកក្កដា ឆ្នាំ 2023 នៅម៉ោង 10:00 ព្រឹក ហើយនិស្សិត សាស្ត្រាចារ្យ និងបុគ្គលិកទាំងអស់ត្រូវបានអញ្ជើញឱ្យចូលរួម។</p>', 1, '2023-06-10 13:20:00'),
('MACA Launches New Online Learning Platform', 'MACA ដាក់ឱ្យដំណើរការវេទិកាសិក្សាតាមអ៊ីនធឺណិតថ្មី', 'In response to the growing demand for flexible learning options, MACA has launched a new online learning platform that offers a wide range of courses and programs.', 'ឆ្លើយតបនឹងតម្រូវការកើនឡើងសម្រាប់ជម្រើសនៃការសិក្សាដែលមានភាពបត់បែន MACA បានដាក់ឱ្យដំណើរការវេទិកាសិក្សាតាមអ៊ីនធឺណិតថ្មីមួយដែលផ្តល់ជូននូវវគ្គសិក្សានិងកម្មវិធីជាច្រើន។', '<p>In response to the growing demand for flexible learning options, MACA has launched a new online learning platform that offers a wide range of courses and programs.</p><p>The platform, called MACA Online, features interactive learning materials, video lectures, discussion forums, and virtual collaboration tools designed to provide an engaging and effective learning experience.</p><p>"We recognize that many students need flexibility in their education due to work, family, or other commitments," said Dr. Sarah Thompson, Vice President of Academic Affairs. "MACA Online allows us to meet those needs while maintaining the high academic standards that MACA is known for."</p><p>The initial offering includes 50 courses across various disciplines, with plans to expand the catalog in the coming months. Students can enroll in individual courses or complete entire programs online.</p><p>For more information about MACA Online, visit the Academic Affairs Office or check the MACA website.</p>', '<p>ឆ្លើយតបនឹងតម្រូវការកើនឡើងសម្រាប់ជម្រើសនៃការសិក្សាដែលមានភាពបត់បែន MACA បានដាក់ឱ្យដំណើរការវេទិកាសិក្សាតាមអ៊ីនធឺណិតថ្មីមួយដែលផ្តល់ជូននូវវគ្គសិក្សានិងកម្មវិធីជាច្រើន។</p><p>វេទិកានេះដែលមានឈ្មោះថា MACA Online មានសម្ភារៈសិក្សាអន្តរកម្ម ការបង្រៀនតាមវីដេអូ វេទិកាពិភាក្សា និងឧបករណ៍សហការតាមអ៊ីនធឺណិតដែលត្រូវបានរចនាឡើងដើម្បីផ្តល់នូវបទពិសោធន៍សិក្សាដែលទាក់ទាញនិងមានប្រសិទ្ធភាព។</p><p>"យើងទទួលស្គាល់ថានិស្សិតជាច្រើនត្រូវការភាពបត់បែនក្នុងការអប់រំរបស់ពួកគេដោយសារការងារ គ្រួសារ ឬការប្តេជ្ញាចិត្តផ្សេងទៀត" លោកស្រីបណ្ឌិត Sarah Thompson អនុប្រធានផ្នែកកិច្ចការសិក្សាបានមានប្រសាសន៍។ "MACA Online អនុញ្ញាតឱ្យយើងបំពេញតម្រូវការទាំងនោះខណៈពេលដែលរក្សាបានស្តង់ដារសិក្សាខ្ពស់ដែល MACA ត្រូវបានគេស្គាល់។"</p><p>ការផ្តល់ជូនដំបូងរួមមានវគ្គសិក្សាចំនួន 50 ក្នុងវិន័យផ្សេងៗគ្នា ដោយមានផែនការពង្រីកកាតាឡុកនៅប៉ុន្មានខែខាងមុខ។ និស្សិតអាចចុះឈ្មោះក្នុងវគ្គសិក្សាជាលក្ខណៈបុគ្គល ឬបញ្ចប់កម្មវិធីទាំងមូលតាមអ៊ីនធឺណិត។</p><p>សម្រាប់ព័ត៌មានបន្ថែមអំពី MACA Online សូមទស្សនាការិយាល័យកិច្ចការសិក្សា ឬពិនិត្យមើលគេហទំព័រ MACA។</p>', 1, '2023-06-18 09:30:00');

-- Insert default team members
INSERT INTO team_members (name, name_km, position, position_km, bio, bio_km, is_active, display_order) VALUES 
('Dr. Sarah Johnson', 'បណ្ឌិត Sarah Johnson', 'Founder & Director', 'ស្ថាបនិក និងនាយិកា', 'With over 20 years of experience in education, Dr. Johnson founded MACA to help students navigate their educational journey.', 'ជាមួយនឹងបទពិសោធន៍ជាង 20 ឆ្នាំក្នុងវិស័យអប់រំ បណ្ឌិត Johnson បានបង្កើត MACA ដើម្បីជួយនិស្សិតក្នុងដំណើរអប់រំរបស់ពួកគេ។', 1, 1),
('Prof. Michael Chen', 'សាស្ត្រាចារ្យ Michael Chen', 'Academic Advisor', 'ទីប្រឹក្សាផ្នែកសិក្សា', 'Prof. Chen specializes in career development and helps students align their education with their career goals.', 'សាស្ត្រាចារ្យ Chen មានជំនាញក្នុងការអភិវឌ្ឍអាជីព និងជួយនិស្សិតក្នុងការតម្រឹមការអប់រំរបស់ពួកគេជាមួយនឹងគោលដៅអាជីពរបស់ពួកគេ។', 1, 2),
('Emily Rodriguez', 'Emily Rodriguez', 'Career Counselor', 'អ្នកប្រឹក្សាអាជីព', 'Emily has helped hundreds of students find internships and job opportunities in their desired fields.', 'Emily បានជួយនិស្សិតរាប់រយនាក់ក្នុងការស្វែងរកកម្មសិក្សានិងឱកាសការងារក្នុងវិស័យដែលពួកគេចង់បាន។', 1, 3),
('David Kim', 'David Kim', 'Online Learning Director', 'នាយកផ្នែកសិក្សាតាមអ៊ីនធឺណិត', 'David oversees our online learning platform and ensures students have access to quality education from anywhere.', 'David មើលការខុសត្រូវលើវេទិកាសិក្សាតាមអ៊ីនធឺណិតរបស់យើង និងធានាថានិស្សិតមានលទ្ធភាពទទួលបានការអប់រំដែលមានគុណភាពពីគ្រប់ទីកន្លែង។', 1, 4);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_value_km) VALUES
('site_name', 'MACA - Education, Majors and Careers', 'MACA - ការអប់រំ មុខវិជ្ជា និងអាជីព'),
('site_description', 'MACA provides comprehensive educational resources, career guidance, and internship opportunities.', 'MACA ផ្តល់ជូននូវធនធានអប់រំគ្រប់ជ្រុងជ្រោយ ការណែនាំអាជីព និងឱកាសកម្មសិក្សា។'),
('contact_email', 'info@maca.edu', 'info@maca.edu'),
('contact_phone', '+855 23 456 789', '+855 23 456 789'),
('contact_address', 'Street 123, Phnom Penh, Cambodia', 'ផ្លូវលេខ 123, រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា'),
('facebook_  'Street 123, Phnom Penh, Cambodia', 'ផ្លូវលេខ 123, រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា'),
('facebook_url', 'https://facebook.com/maca', 'https://facebook.com/maca'),
('twitter_url', 'https://twitter.com/maca', 'https://twitter.com/maca'),
('instagram_url', 'https://instagram.com/maca', 'https://instagram.com/maca'),
('linkedin_url', 'https://linkedin.com/company/maca', 'https://linkedin.com/company/maca'),
('hero_title', 'Welcome to MACA', 'សូមស្វាគមន៍មកកាន់ MACA'),
('hero_subtitle', 'Your partner in education and career development', 'ដៃគូរបស់អ្នកក្នុងការអប់រំនិងការអភិវឌ្ឍអាជីព');

-- Insert sample slides for homepage slideshow
INSERT INTO slides (title, title_km, description, description_km, image_path, link, is_active, display_order) VALUES
('Welcome to MACA', 'សូមស្វាគមន៍មកកាន់ MACA', 'Your partner in education and career development', 'ដៃគូរបស់អ្នកក្នុងការអប់រំនិងការអភិវឌ្ឍអាជីព', '/uploads/slides/slide1.jpg', '', 1, 1),
('Discover Your Path', 'ស្វែងរកផ្លូវរបស់អ្នក', 'Explore majors and career options that match your interests', 'ស្វែងយល់ពីមុខវិជ្ជានិងជម្រើសអាជីពដែលត្រូវនឹងចំណាប់អារម្មណ៍របស់អ្នក', '/uploads/slides/slide2.jpg', '/program', 1, 2),
('Expert Guidance', 'ការណែនាំពីអ្នកជំនាញ', 'Get advice from our experienced career counselors', 'ទទួលបានដំបូន្មានពីអ្នកប្រឹក្សាអាជីពដែលមានបទពិសោធន៍របស់យើង', '/uploads/slides/slide3.jpg', '/contact', 1, 3);

-- Insert sample programs
INSERT INTO programs (title, title_km, description, description_km, image_path, is_active, display_order) VALUES
('Online Learning', 'ការសិក្សាតាមអ៊ីនធឺណិត', 'Access quality education from anywhere with our flexible online learning programs.', 'ទទួលបានការអប់រំដែលមានគុណភាពពីគ្រប់ទីកន្លែងជាមួយនឹងកម្មវិធីសិក្សាតាមអ៊ីនធឺណិតដែលមានភាពបត់បែនរបស់យើង។', '/uploads/programs/online-learning.jpg', 1, 1),
('Career Counseling', 'ការប្រឹក្សាអាជីព', 'Get personalized guidance to help you make informed decisions about your career path.', 'ទទួលបានការណែនាំផ្ទាល់ខ្លួនដើម្បីជួយអ្នកធ្វើការសម្រេចចិត្តដែលមានព័ត៌មានគ្រប់គ្រាន់អំពីផ្លូវអាជីពរបស់អ្នក។', '/uploads/programs/career-counseling.jpg', 1, 2),
('Internship Opportunities', 'ឱកាសកម្មសិក្សា', 'Gain practical experience through our extensive network of industry partners.', 'ទទួលបានបទពិសោធន៍ជាក់ស្តែងតាមរយៈបណ្តាញដ៏ទូលំទូលាយនៃដៃគូឧស្សាហកម្មរបស់យើង។', '/uploads/programs/internship.jpg', 1, 3);

-- Create sample contact messages
INSERT INTO contact_messages (name, email, subject, message, is_read, created_at) VALUES
('John Smith', 'john.smith@example.com', 'Information Request', 'I would like to get more information about your career counseling services.', 0, '2023-06-25 09:15:00'),
('Maria Garcia', 'maria.garcia@example.com', 'Appointment Request', 'I would like to schedule an appointment with a career counselor next week.', 0, '2023-06-26 14:30:00'),
('David Lee', 'david.lee@example.com', 'Feedback', 'I just wanted to say that your online learning platform has been very helpful for me. Thank you!', 1, '2023-06-27 11:45:00');

-- Create sample user activity logs
INSERT INTO user_activity_log (user_id, activity_type, description, ip_address, created_at) VALUES
(1, 'login', 'Admin user logged in', '192.168.1.1', '2023-06-25 08:30:00'),
(1, 'update', 'Updated site settings', '192.168.1.1', '2023-06-25 08:45:00'),
(1, 'create', 'Created new announcement', '192.168.1.1', '2023-06-25 09:15:00'),
(1, 'logout', 'Admin user logged out', '192.168.1.1', '2023-06-25 10:30:00');
