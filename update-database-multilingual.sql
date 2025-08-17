-- Add Khmer language fields to announcements table
ALTER TABLE announcements 
ADD COLUMN title_km VARCHAR(255) AFTER title,
ADD COLUMN content_km TEXT AFTER content;

-- Add Khmer language fields to news table
ALTER TABLE news 
ADD COLUMN title_km VARCHAR(255) AFTER title,
ADD COLUMN summary_km TEXT AFTER summary,
ADD COLUMN content_km TEXT AFTER content;

-- Add Khmer language fields to team_members table
ALTER TABLE team_members 
ADD COLUMN name_km VARCHAR(100) AFTER name,
ADD COLUMN position_km VARCHAR(100) AFTER position,
ADD COLUMN bio_km TEXT AFTER bio;

-- Add Khmer language fields to site_settings table
ALTER TABLE site_settings 
ADD COLUMN setting_value_km TEXT AFTER setting_value;

-- Update existing site settings with Khmer values
UPDATE site_settings SET setting_value_km = 'MACA - ការអប់រំ មុខវិជ្ជា និងអាជីព' WHERE setting_key = 'site_name';
UPDATE site_settings SET setting_value_km = 'MACA ផ្តល់ជូននូវធនធានអប់រំគ្រប់ជ្រុងជ្រោយ ការណែនាំអាជីព និងឱកាសកម្មសិក្សា។' WHERE setting_key = 'site_description';
