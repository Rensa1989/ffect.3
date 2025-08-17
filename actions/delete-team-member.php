<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Check if user is logged in
if (!isLoggedIn()) {
    $_SESSION['message'] = "You must be logged in to perform this action.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php?page=login');
    exit;
}

if (!isset($_GET['id'])) {
    $_SESSION['message'] = "No team member specified.";
    $_SESSION['message_type'] = "danger";
    header('Location: ../index.php?page=manage-team-members');
    exit;
}

$member_id = $_GET['id'];

try {
    // Get the team member to check if it has an image
    $stmt = $pdo->prepare("SELECT image_path FROM team_members WHERE id = :id");
    $stmt->bindParam(':id', $member_id);
    $stmt->execute();
    $member = $stmt->fetch();
    
    // Delete the image file if it exists
    if ($member && $member['image_path'] && file_exists('../' . $member['image_path'])) {
        unlink('../' . $member['image_path']);
    }
    
    // Delete the team member from the database
    $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = :id");
    $stmt->bindParam(':id', $member_id);
    $stmt->execute();
    
    $_SESSION['message'] = "Team member deleted successfully!";
    $_SESSION['message_type'] = "success";
} catch(PDOException $e) {
    $_SESSION['message'] = "Error deleting team member: " . $e->getMessage();
    $_SESSION['message_type'] = "danger";
}

// Check if we should redirect to dashboard or manage-team-members page
$redirect_page = isset($_GET['redirect']) && $_GET['redirect'] === 'dashboard' ? 'dashboard' : 'manage-team-members';
header("Location: ../index.php?page={$redirect_page}" . ($redirect_page === 'dashboard' ? '#team-members-section' : ''));
exit;
?>
