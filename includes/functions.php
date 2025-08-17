<?php
// Prevent direct access to this file
if (!defined('INCLUDED')) {
    header('HTTP/1.0 403 Forbidden');
    exit;
}

/**
 * Check if user is logged in
 * 
 * @return bool True if user is logged in, false otherwise
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Check if user is an admin
 * 
 * @return bool True if user is an admin, false otherwise
 */
function isAdmin() {
    return isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1;
}

/**
 * Get text based on selected language
 * 
 * @param string $en English text
 * @param string $kh Khmer text
 * @return string Text in the selected language
 */
function getLangText($en, $kh) {
    $lang = $_SESSION['lang'] ?? 'en';
    if ($lang == 'kh') {
        return '<span class="khmer-text">' . $kh . '</span>';
    }
    return $en;
}

/**
 * Format date for display
 * 
 * @param string $date Date string
 * @param string $format Format string
 * @return string Formatted date
 */
function formatDate($date, $format = 'M d, Y') {
    return date($format, strtotime($date));
}

/**
 * Truncate text to a specific length
 * 
 * @param string $text Text to truncate
 * @param int $length Maximum length
 * @param string $append Text to append if truncated
 * @return string Truncated text
 */
function truncateText($text, $length = 100, $append = '...') {
    $text = strip_tags($text);
    if (strlen($text) > $length) {
        $text = substr($text, 0, $length);
        $text = substr($text, 0, strrpos($text, ' '));
        $text .= $append;
    }
    return $text;
}

/**
 * Generate a random string
 * 
 * @param int $length Length of the string
 * @return string Random string
 */
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

/**
 * Sanitize input data
 * 
 * @param string $data Data to sanitize
 * @return string Sanitized data
 */
function sanitize($data) {
    global $conn;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($conn) {
        $data = mysqli_real_escape_string($conn, $data);
    }
    return $data;
}

/**
 * Alias for sanitize() to maintain backward compatibility
 */
function sanitizeInput($data) {
    return sanitize($data);
}

/**
 * Upload a file
 * 
 * @param array $file File data from $_FILES
 * @param string $destination Destination directory
 * @param array $allowedTypes Allowed file types
 * @param int $maxSize Maximum file size in bytes
 * @return array Result with status and message
 */
function uploadFile($file, $destination = 'uploads/', $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'], $maxSize = 5242880) {
    // Check if file was uploaded
    if (!isset($file) || $file['error'] != 0) {
        return ['status' => false, 'message' => 'Error uploading file.'];
    }
    
    // Check file size
    if ($file['size'] > $maxSize) {
        return ['status' => false, 'message' => 'File is too large. Maximum size is ' . ($maxSize / 1048576) . 'MB.'];
    }
    
    // Check file type
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExtension, $allowedTypes)) {
        return ['status' => false, 'message' => 'Invalid file type. Allowed types: ' . implode(', ', $allowedTypes)];
    }
    
    // Create destination directory if it doesn't exist
    if (!file_exists($destination)) {
        mkdir($destination, 0777, true);
    }
    
    // Generate unique filename
    $newFilename = generateRandomString() . '_' . time() . '.' . $fileExtension;
    $targetPath = $destination . $newFilename;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return ['status' => true, 'message' => 'File uploaded successfully.', 'path' => $targetPath];
    } else {
        return ['status' => false, 'message' => 'Error moving uploaded file.'];
    }
}

/**
 * Get site settings
 * 
 * @param string $settingName Setting name
 * @param mixed $default Default value if setting not found
 * @return mixed Setting value or default
 */
function getSiteSetting($settingName, $default = '') {
    global $conn;
    if (!$conn) {
        return $default;
    }
    
    $query = "SELECT value FROM site_settings WHERE setting_name = '$settingName'";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return $row['value'];
    }
    
    return $default;
}

/**
 * Update site setting
 * 
 * @param string $settingName Setting name
 * @param mixed $value Setting value
 * @return bool True if successful, false otherwise
 */
function updateSiteSetting($settingName, $value) {
    global $conn;
    if (!$conn) {
        return false;
    }
    
    $settingName = sanitize($settingName);
    $value = sanitize($value);
    
    // Check if setting exists
    $query = "SELECT id FROM site_settings WHERE setting_name = '$settingName'";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        // Update existing setting
        $query = "UPDATE site_settings SET value = '$value' WHERE setting_name = '$settingName'";
    } else {
        // Insert new setting
        $query = "INSERT INTO site_settings (setting_name, value) VALUES ('$settingName', '$value')";
    }
    
    return mysqli_query($conn, $query);
}

/**
 * Get all announcements
 * 
 * @param int $limit Number of announcements to get
 * @param int $offset Offset for pagination
 * @return array Announcements
 */
function getAnnouncements($limit = 10, $offset = 0) {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM announcements WHERE lang = '$lang' ORDER BY created_at DESC LIMIT $offset, $limit";
    $result = mysqli_query($conn, $query);
    
    $announcements = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $announcements[] = $row;
        }
    }
    
    return $announcements;
}

/**
 * Get all news articles
 * 
 * @param int $limit Number of news articles to get
 * @param int $offset Offset for pagination
 * @return array News articles
 */
function getNews($limit = 10, $offset = 0) {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM news WHERE lang = '$lang' ORDER BY created_at DESC LIMIT $offset, $limit";
    $result = mysqli_query($conn, $query);
    
    $news = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $news[] = $row;
        }
    }
    
    return $news;
}

/**
 * Get all team members
 * 
 * @return array Team members
 */
function getTeamMembers() {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM team_members WHERE lang = '$lang' ORDER BY position ASC";
    $result = mysqli_query($conn, $query);
    
    $teamMembers = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $teamMembers[] = $row;
        }
    }
    
    return $teamMembers;
}

/**
 * Get all popular jobs
 * 
 * @param int $limit Number of jobs to get
 * @return array Popular jobs
 */
function getPopularJobs($limit = 6) {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM popular_jobs WHERE lang = '$lang' ORDER BY id DESC LIMIT $limit";
    $result = mysqli_query($conn, $query);
    
    $jobs = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $jobs[] = $row;
        }
    }
    
    return $jobs;
}

/**
 * Get all popular majors
 * 
 * @param int $limit Number of majors to get
 * @return array Popular majors
 */
function getPopularMajors($limit = 6) {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM popular_majors WHERE lang = '$lang' ORDER BY id DESC LIMIT $limit";
    $result = mysqli_query($conn, $query);
    
    $majors = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $majors[] = $row;
        }
    }
    
    return $majors;
}

/**
 * Get all career paths
 * 
 * @param int $limit Number of career paths to get
 * @return array Career paths
 */
function getCareerPaths($limit = 6) {
    global $conn;
    if (!$conn) {
        return [];
    }
    
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM career_paths WHERE lang = '$lang' ORDER BY id DESC LIMIT $limit";
    $result = mysqli_query($conn, $query);
    
    $careers = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $careers[] = $row;
        }
    }
    
    return $careers;
}

/**
 * Get a specific popular job by ID
 * 
 * @param int $id Job ID
 * @return array|null Job data or null if not found
 */
function getPopularJobById($id) {
    global $conn;
    if (!$conn) {
        return null;
    }
    
    $id = (int)$id;
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM popular_jobs WHERE id = $id AND lang = '$lang'";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }
    
    return null;
}

/**
 * Get a specific popular major by ID
 * 
 * @param int $id Major ID
 * @return array|null Major data or null if not found
 */
function getPopularMajorById($id) {
    global $conn;
    if (!$conn) {
        return null;
    }
    
    $id = (int)$id;
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM popular_majors WHERE id = $id AND lang = '$lang'";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }
    
    return null;
}

/**
 * Get a specific career path by ID
 * 
 * @param int $id Career path ID
 * @return array|null Career path data or null if not found
 */
function getCareerPathById($id) {
    global $conn;
    if (!$conn) {
        return null;
    }
    
    $id = (int)$id;
    $lang = $_SESSION['lang'] ?? 'en';
    $query = "SELECT * FROM career_paths WHERE id = $id AND lang = '$lang'";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }
    
    return null;
}
