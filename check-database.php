<?php
// Database configuration
$host = 'localhost';
$dbname = 'maca_cms';
$username = 'root';
$password = '';

echo "<h2>Database Connection Test</h2>";

try {
    // Test database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<p style='color:green'>✓ Successfully connected to the database!</p>";
    
    // Check if users table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    if ($stmt->rowCount() > 0) {
        echo "<p style='color:green'>✓ Users table exists</p>";
        
        // Check if admin user exists
        $stmt = $pdo->query("SELECT * FROM users WHERE username = 'admin'");
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo "<p style='color:green'>✓ Admin user exists</p>";
            echo "<p>Current password hash: " . substr($user['password'], 0, 20) . "...</p>";
        } else {
            echo "<p style='color:red'>✗ Admin user does not exist!</p>";
        }
    } else {
        echo "<p style='color:red'>✗ Users table does not exist!</p>";
        
        // Create users table
        echo "<p>Creating users table...</p>";
        $pdo->exec("CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        echo "<p style='color:green'>✓ Users table created successfully</p>";
    }
    
    // Create a new admin user with a fresh password hash
    echo "<h3>Creating/Updating Admin User</h3>";
    
    $admin_username = 'admin';
    $admin_password = 'admin123';
    $admin_email = 'admin@maca.edu';
    $hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);
    
    echo "<p>New password hash: " . $hashed_password . "</p>";
    
    // Check if admin exists and update or create
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $admin_username);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE username = :username");
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':username', $admin_username);
        $stmt->execute();
        echo "<p style='color:green'>✓ Admin password updated successfully!</p>";
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (username, password, email) VALUES (:username, :password, :email)");
        $stmt->bindParam(':username', $admin_username);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':email', $admin_email);
        $stmt->execute();
        echo "<p style='color:green'>✓ Admin user created successfully!</p>";
    }
    
    // Create other required tables if they don't exist
    echo "<h3>Checking Other Required Tables</h3>";
    
    $required_tables = ['announcements', 'news', 'media'];
    
    foreach ($required_tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "<p style='color:green'>✓ $table table exists</p>";
        } else {
            echo "<p style='color:red'>✗ $table table does not exist!</p>";
            
            // Create the missing table
            echo "<p>Creating $table table...</p>";
            
            if ($table == 'announcements') {
                $pdo->exec("CREATE TABLE IF NOT EXISTS announcements (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    image_path VARCHAR(255),
                    is_active TINYINT(1) DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )");
            } elseif ($table == 'news') {
                $pdo->exec("CREATE TABLE IF NOT EXISTS news (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    summary TEXT NOT NULL,
                    content TEXT NOT NULL,
                    image_path VARCHAR(255),
                    is_active TINYINT(1) DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )");
            } elseif ($table == 'media') {
                $pdo->exec("CREATE TABLE IF NOT EXISTS media (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    file_path VARCHAR(255) NOT NULL,
                    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )");
            }
            
            echo "<p style='color:green'>✓ $table table created successfully</p>";
        }
    }
    
    echo "<h3>Login Credentials</h3>";
    echo "<p><strong>Username:</strong> admin</p>";
    echo "<p><strong>Password:</strong> admin123</p>";
    echo "<p>You can now try logging in with these credentials.</p>";
    
    echo "<h3>Next Steps</h3>";
    echo "<ol>";
    echo "<li>Try logging in with the credentials above</li>";
    echo "<li>If login still fails, check the login.php file for any issues</li>";
    echo "<li>For security, delete this file after successful login</li>";
    echo "</ol>";
    
} catch(PDOException $e) {
    echo "<p style='color:red'>Database Error: " . $e->getMessage() . "</p>";
    
    if (strpos($e->getMessage(), "Unknown database") !== false) {
        echo "<h3>Database does not exist!</h3>";
        echo "<p>Please create the 'maca_cms' database in phpMyAdmin first:</p>";
        echo "<ol>";
        echo "<li>Log in to phpMyAdmin</li>";
        echo "<li>Click 'New' in the left sidebar</li>";
        echo "<li>Enter 'maca_cms' as the database name</li>";
        echo "<li>Click 'Create'</li>";
        echo "<li>Then refresh this page</li>";
        echo "</ol>";
    }
}
?>
