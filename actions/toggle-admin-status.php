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

if (isset($_GET['id'])) {
    $admin_id = intval($_GET['id']);
    
    try {
        // Prevent admin from deactivating themselves
        if ($admin_id == $_SESSION['user_id']) {
            $_SESSION['message'] = "You cannot change your own role.";
            $_SESSION['message_type'] = "danger";
            header('Location: ../index.php?page=dashboard');
            exit;
        }
        
        // Get current role
        $stmt = $pdo->prepare("SELECT role FROM users WHERE id = :id");
        $stmt->bindParam(':id', $admin_id);
        $stmt->execute();
        $user = $stmt->fetch();

        // Toggle role between 'admin' and 'editor'
        $new_role = (isset($user['role']) && $user['role'] == 'admin') ? 'editor' : 'admin';

        // Update user role
        $stmt = $pdo->prepare("UPDATE users SET role = :role WHERE id = :id");
        $stmt->bindParam(':role', $new_role);
        $stmt->bindParam(':id', $admin_id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $_SESSION['message'] = "User role has been updated successfully.";
            $_SESSION['message_type'] = "success";
        } else {
            $_SESSION['message'] = "Failed to update user role. User not found.";
            $_SESSION['message_type'] = "danger";
        }
    } catch (PDOException $e) {
        $_SESSION['message'] = "Database error: " . $e->getMessage();
        $_SESSION['message_type'] = "danger";
    }
    
    header('Location: ../index.php?page=dashboard');
    exit;
} else {
    $_SESSION['message'] = "Invalid request.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php?page=dashboard');
    exit;
}
?>
