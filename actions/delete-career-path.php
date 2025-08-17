<?php
include '../config/database.php';
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $_SESSION['message'] = "You must be logged in to perform this action.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php?page=login');
    exit;
}

// Check if ID is provided
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    $_SESSION['message'] = "Invalid career path ID.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php?page=manage-career-paths');
    exit;
}

$career_id = (int)$_GET['id'];

try {
    // First, get the image path to delete the file
    $stmt = $pdo->prepare("SELECT image_path FROM career_paths WHERE id = :id");
    $stmt->bindParam(':id', $career_id);
    $stmt->execute();
    $career = $stmt->fetch();
    
    // Delete the career path from database
    $stmt = $pdo->prepare("DELETE FROM career_paths WHERE id = :id");
    $stmt->bindParam(':id', $career_id);
    $stmt->execute();
    
    // Delete the image file if it exists
    if ($career && !empty($career['image_path']) && file_exists('../' . $career['image_path'])) {
        unlink('../' . $career['image_path']);
    }
    
    $_SESSION['message'] = "Career path deleted successfully.";
    $_SESSION['message_type'] = "success";
} catch(PDOException $e) {
    $_SESSION['message'] = "Error deleting career path: " . $e->getMessage();
    $_SESSION['message_type'] = "danger";
}

header('Location: ../index.php?page=manage-career-paths');
exit;
?>
