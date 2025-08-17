<?php
// Start output buffering at the very beginning of the main file
ob_start();

// Start session
session_start();

// Define a constant to prevent direct access to included files
if (!defined('INCLUDED')) {
    define('INCLUDED', true);
}

// Include database connection
require_once 'config/database.php';

// Include functions
require_once 'includes/functions.php';

// Check if user is logged in for admin pages
$admin_pages = ['dashboard', 'add-announcement', 'edit-announcement', 'add-news', 'edit-news', 'manage-media', 'manage-site-settings', 'manage-users', 'manage-team-members', 'add-team-member', 'edit-team-member'];
$current_page = isset($_GET['page']) ? $_GET['page'] : 'home';

if (in_array($current_page, $admin_pages) && !isLoggedIn()) {
  $_SESSION['message'] = "You must be logged in to access this page.";
  $_SESSION['message_type'] = "danger";
  header('Location: index.php?page=login');
  exit;
}

// Include header
include 'includes/header.php';

// Load appropriate page
switch ($current_page) {
  case 'login':
      include 'pages/login.php';
      break;
  case 'dashboard':
      include 'pages/dashboard.php';
      break;
  case 'add-announcement':
      include 'pages/add-announcement.php';
      break;
  case 'edit-announcement':
      include 'pages/edit-announcement.php';
      break;
  case 'add-news':
      include 'pages/add-news.php';
      break;
  case 'edit-news':
      include 'pages/edit-news.php';
      break;
  case 'manage-media':
      include 'pages/manage-media.php';
      break;
  case 'manage-site-settings':
      include 'pages/manage-site-settings.php';
      break;
  case 'manage-users':
      include 'pages/manage-users.php';
      break;
  case 'manage-team-members':
      include 'pages/manage-team-members.php';
      break;
  case 'add-team-member':
      include 'pages/add-team-member.php';
      break;
  case 'edit-team-member':
      include 'pages/edit-team-member.php';
      break;
  case 'announcements':
      include 'pages/announcements.php';
      break;
  case 'news':
      include 'pages/news.php';
      break;
  case 'news-detail':
      include 'pages/news-detail.php';
      break;
  case 'about':
      include 'pages/about.php';
      break;
  case 'contact':
      include 'pages/contact.php';
      break;
  case 'program/online-learning':
      include 'pages/program/online-learning.php';
      break;
  case 'program/career-counselling':
      include 'pages/program/career-counselling.php';
      break;
  default:
      if (file_exists('pages/' . $current_page . '.php')) {
          include 'pages/' . $current_page . '.php';
      } else {
          include 'pages/404.php';
      }
      break;
}

// Include footer
include 'includes/footer.php';

// End output buffering and send all output
ob_end_flush();
?>
