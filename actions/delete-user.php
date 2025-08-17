<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Include database connection
require_once '../config/database.php';

// Include functions
require_once '../includes/functions.php';

// Check if user is logged in and is admin
if (!isLoggedIn() || !isAdmin()) {
    $_SESSION['message'] = "You don't have permission to perform this action.";
    $_SESSION['message_type'] = "danger";
    
    // Use JavaScript redirect instead of header()
    echo "<script>window.location.href = '../index.php?page=login';</script>";
    exit;
}

// Check if ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    $_SESSION['message'] = "Invalid user ID.";
    $_SESSION['message_type'] = "danger";
    
    // Use JavaScript redirect instead of header()
    echo "<script>window.location.href = '../index.php?page=manage-users';</script>";
    exit;
}

$user_id = $_GET['id'];

// Get current language
$currentLang = getCurrentLanguage();

// Prevent deleting your own account
if ($_SESSION['user_id'] == $user_id) {
    $_SESSION['message'] = $currentLang == 'en' ? "You cannot delete your own account." : "អ្នកមិនអាចលុបគណនីផ្ទាល់ខ្លួនរបស់អ្នកបានទេ។";
    $_SESSION['message_type'] = "danger";
    
    // Use JavaScript redirect instead of header()
    echo "<script>window.location.href = '../index.php?page=manage-users';</script>";
    exit;
}

// Delete user
try {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    
    $_SESSION['message'] = $currentLang == 'en' ? "User deleted successfully." : "អ្នកប្រើប្រាស់ត្រូវបានលុបដោយជោគជ័យ។";
    $_SESSION['message_type'] = "success";
} catch(PDOException $e) {
    $_SESSION['message'] = $currentLang == 'en' ? "Error deleting user: " . $e->getMessage() : "កំហុសក្នុងការលុបអ្នកប្រើប្រាស់៖ " . $e->getMessage();
    $_SESSION['message_type'] = "danger";
}

// Use JavaScript redirect instead of header()
echo "<script>window.location.href = '../index.php?page=manage-users';</script>";
exit;
?>
