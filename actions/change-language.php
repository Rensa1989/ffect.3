<?php
session_start();

// Set language
if (isset($_GET['lang']) && in_array($_GET['lang'], ['en', 'km'])) {
    $_SESSION['lang'] = $_GET['lang'];
}

// Redirect back to the previous page
if (isset($_GET['redirect'])) {
    header('Location: ' . $_GET['redirect']);
} else {
    header('Location: ../index.php');
}
exit;
?>
