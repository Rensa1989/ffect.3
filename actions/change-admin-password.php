<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Check if user is logged in and has admin privileges
if (!isLoggedIn() || !isAdmin()) {
    $_SESSION['message'] = "You don't have permission to perform this action.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $admin_id = isset($_POST['admin_id']) ? intval($_POST['admin_id']) : 0;
    $new_password = isset($_POST['new_password']) ? $_POST['new_password'] : '';
    $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';
    
    // Validate inputs
    if (empty($admin_id) || empty($new_password) || empty($confirm_password)) {
        $_SESSION['message'] = "All fields are required.";
        $_SESSION['message_type'] = "danger";
        header('Location: ../index.php?page=dashboard');
        exit;
    }
    
    // Check if passwords match
    if ($new_password !== $confirm_password) {
        $_SESSION['message'] = "Passwords do not match.";
        $_SESSION['message_type'] = "danger";
        header('Location: ../index.php?page=dashboard');
        exit;
    }
    
    // Check password strength
    if (strlen($new_password) < 8) {
        $_SESSION['message'] = "Password must be at least 8 characters long.";
        $_SESSION['message_type'] = "danger";
        header('Location: ../index.php?page=dashboard');
        exit;
    }
    
    try {
        // Hash the new password
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        
        // Update the password in the database
        $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE id = :id AND role = 'admin'");
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':id', $admin_id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $_SESSION['message'] = "Admin password has been updated successfully.";
            $_SESSION['message_type'] = "success";
        } else {
            $_SESSION['message'] = "Failed to update password. Admin not found.";
            $_SESSION['message_type'] = "danger";
        }
    } catch (PDOException $e) {
        $_SESSION['message'] = "Database error: " . $e->getMessage();
        $_SESSION['message_type'] = "danger";
    }
    
    header('Location: ../index.php?page=dashboard');
    exit;
} else {
    // If not a POST request, redirect to dashboard
    header('Location: ../index.php?page=dashboard');
    exit;
}
?>
