-- Add multilingual columns to popular_jobs table
ALTER TABLE popular_jobs
ADD COLUMN title_kh VARCHAR(255) DEFAULT NULL,
ADD COLUMN description_kh TEXT DEFAULT NULL;

-- Add multilingual columns to popular_majors table
ALTER TABLE popular_majors
ADD COLUMN title_kh VARCHAR(255) DEFAULT NULL,
ADD COLUMN description_kh TEXT DEFAULT NULL;

-- Add multilingual columns to career_paths table
ALTER TABLE career_paths
ADD COLUMN title_kh VARCHAR(255) DEFAULT NULL,
ADD COLUMN description_kh TEXT DEFAULT NULL;
