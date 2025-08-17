<?php
// Prevent direct access to this file
if (!defined('INCLUDED')) {
    header('HTTP/1.0 403 Forbidden');
    exit;
}

// Get site settings
$site_name = '';
$site_logo = '';

// Check if database connection exists before trying to use it
if (isset($conn) && $conn) {
    $query = "SELECT value FROM site_settings WHERE setting_name = 'site_name'";
    $result = mysqli_query($conn, $query);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $site_name = $row['value'];
    }

    $query = "SELECT value FROM site_settings WHERE setting_name = 'site_logo'";
    $result = mysqli_query($conn, $query);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $site_logo = $row['value'];
    }
}

// Default values if not found in database
if (empty($site_name)) {
    $site_name = 'MACA';
}

// Current page for active menu
$current_page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Check if there's a message to display
$message = '';
$message_type = '';
if (isset($_SESSION['message']) && isset($_SESSION['message_type'])) {
    $message = $_SESSION['message'];
    $message_type = $_SESSION['message_type'];
    unset($_SESSION['message']);
    unset($_SESSION['message_type']);
}

// Check if there's a redirect
if (isset($_SESSION['redirect_to'])) {
    $redirect_to = $_SESSION['redirect_to'];
    unset($_SESSION['redirect_to']);
    echo "<script>window.location.href = '$redirect_to';</script>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="<?php echo isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en'; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $site_name; ?></title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="assets/css/styles.css" rel="stylesheet">
    <!-- TinyMCE -->
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <style>
        /* Add Khmer font support */
        .khmer-text {
            font-family: "gf_Siemreap variant0", Tofu, sans-serif;
        }
        /* Khmer Font */
        @font-face {
            font-family: "gf_Siemreap variant0";
            src: url("https://fonts.googleapis.com/css2?family=Siemreap&display=swap");
        }
        
        /* Apply Khmer font to body when in Khmer language */
        body.lang-kh {
            font-family: "gf_Siemreap variant0", Tofu, sans-serif;
        }
        
        /* Apply Khmer font to specific Khmer text elements */
        .khmer-text {
            font-family: "gf_Siemreap variant0", Tofu, sans-serif;
        }
        
        /* Custom header styles */
        .main-header {
            background-color: #dc3545;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .logo-container img {
            height: 50px;
            width: auto;
        }
        
        .nav-link {
            color: white !important;
            font-weight: 500;
            padding: 10px 15px !important;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-link:hover, .nav-link:focus {
            color: #f5a425 !important;
        }
        
        .nav-item.active .nav-link {
            color: #f5a425 !important;
            font-weight: 600;
        }
        
        .dropdown-menu {
            border: none;
            border-radius: 0.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
            margin-top: 0;
            border-top: 3px solid #f5a425;
        }
        
        .dropdown-item {
            padding: 0.5rem 1.5rem;
            color: #333;
            transition: all 0.2s ease;
        }
        
        .dropdown-item:hover, .dropdown-item:focus {
            background-color: rgba(220, 53, 69, 0.1);
            color: #dc3545;
        }
        
        .get-started-btn {
            background-color: white;
            color: #dc3545 !important;
            border-radius: 30px;
            padding: 8px 20px !important;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .get-started-btn:hover {
            background-color: #f5a425;
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Language switcher */
        .language-switcher {
            display: flex;
            align-items: center;
        }
        
        .language-switcher a {
            color: white;
            margin-left: 10px;
            text-decoration: none;
            font-size: 0.9rem;
            opacity: 0.8;
            transition: all 0.3s ease;
        }
        
        .language-switcher a:hover {
            opacity: 1;
            color: #f5a425;
        }
        
        .language-switcher a.active {
            opacity: 1;
            font-weight: 600;
            color: #f5a425;
        }
        
        /* Mobile menu */
        .navbar-toggler {
            border: none;
            color: white;
            padding: 0;
        }
        
        .navbar-toggler:focus {
            box-shadow: none;
        }
        
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        
        @media (max-width: 991.98px) {
            .navbar-collapse {
                background-color: #dc3545;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 0.5rem;
            }
            
            .dropdown-menu {
                background-color: rgba(255, 255, 255, 0.1);
                border: none;
                box-shadow: none;
            }
            
            .dropdown-item {
                color: white;
            }
            
            .dropdown-item:hover {
                background-color: rgba(255, 255, 255, 0.2);
                color: #f5a425;
            }
            
            .get-started-btn {
                margin-top: 10px;
                display: inline-block;
            }
        }
    </style>
</head>
<body class="<?php echo isset($_SESSION['lang']) && $_SESSION['lang'] == 'kh' ? 'lang-kh' : 'lang-en'; ?>">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <?php if (!empty($site_logo) && file_exists($site_logo)): ?>
                    <img src="<?php echo $site_logo; ?>" alt="<?php echo $site_name; ?>" height="50">
                <?php else: ?>
                    <?php echo $site_name; ?>
                <?php endif; ?>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'home' ? 'active' : ''; ?>" href="index.php?page=home">
                            <?php echo getLangText('Home', 'ទំព័រដើម'); ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'about' ? 'active' : ''; ?>" href="index.php?page=about">
                            <?php echo getLangText('About Us', 'អំពីយើង'); ?>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle <?php echo strpos($current_page, 'program/') === 0 ? 'active' : ''; ?>" href="#" id="programDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <?php echo getLangText('Program', 'កម្មវិធី'); ?>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="programDropdown">
                            <li>
                                <a class="dropdown-item" href="index.php?page=program/online-learning">
                                    <?php echo getLangText('Online Learning', 'ការសិក្សាតាមអនឡាញ'); ?>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="index.php?page=program/career-counselling">
                                    <?php echo getLangText('Career Counselling', 'ការប្រឹក្សាអាជីព'); ?>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- Explore Dropdown Menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle <?php echo strpos($current_page, 'explore/') === 0 ? 'active' : ''; ?>" href="#" id="exploreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <?php echo getLangText('Explore', 'រុករក'); ?>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="exploreDropdown">
                            <li>
                                <a class="dropdown-item" href="index.php?page=explore/popular-jobs">
                                    <?php echo getLangText('Popular Jobs', 'ការងារពេញនិយម'); ?>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="index.php?page=explore/popular-majors">
                                    <?php echo getLangText('Popular Majors', 'មុខជំនាញពេញនិយម'); ?>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="index.php?page=explore/popular-careers">
                                    <?php echo getLangText('Popular Careers', 'អាជីពពេញនិយម'); ?>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'announcements' ? 'active' : ''; ?>" href="index.php?page=announcements">
                            <?php echo getLangText('Announcements', 'សេចក្តីប្រកាស'); ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'news' ? 'active' : ''; ?>" href="index.php?page=news">
                            <?php echo getLangText('News', 'ព័ត៌មាន'); ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'contact' ? 'active' : ''; ?>" href="index.php?page=contact">
                            <?php echo getLangText('Contact Us', 'ទំនាក់ទំនងយើង'); ?>
                        </a>
                    </li>
                </ul>
                <div class="d-flex">
                    <!-- Language Switcher -->
                    <div class="language-switcher">
                        <a href="actions/change-language.php?lang=en" class="btn btn-sm <?php echo (!isset($_SESSION['lang']) || $_SESSION['lang'] == 'en') ? 'btn-light' : 'btn-outline-light'; ?>">EN</a>
                        <a href="actions/change-language.php?lang=kh" class="btn btn-sm <?php echo (isset($_SESSION['lang']) && $_SESSION['lang'] == 'kh') ? 'btn-light' : 'btn-outline-light'; ?>">ខ្មែរ</a>
                    </div>
                    <?php if (isLoggedIn()): ?>
                        <div class="dropdown ms-2">
                            <button class="btn btn-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-user me-1"></i> <?php echo $_SESSION['username']; ?>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li><a class="dropdown-item" href="index.php?page=dashboard"><i class="fas fa-tachometer-alt me-1"></i> Dashboard</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="includes/logout.php"><i class="fas fa-sign-out-alt me-1"></i> Logout</a></li>
                            </ul>
                        </div>
                    <?php else: ?>
                        <a href="index.php?page=login" class="btn btn-light ms-2">
                            <i class="fas fa-sign-in-alt me-1"></i> <?php echo getLangText('Login', 'ចូល'); ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </nav>

    <!-- Display message if any -->
    <?php if (!empty($message)): ?>
        <div class="container mt-3">
            <div class="alert alert-<?php echo $message_type; ?> alert-dismissible fade show" role="alert">
                <?php echo $message; ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    <?php endif; ?>

    <!-- Main Content -->
    <main class="py-4">

    <div class="container mt-4">
        <?php if (isset($_SESSION['message'])): ?>
            <div class="alert alert-<?php echo $_SESSION['message_type'] ?? 'info'; ?> alert-dismissible fade show" role="alert">
                <?php echo $_SESSION['message']; ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['message']); unset($_SESSION['message_type']); ?>
        <?php endif; ?>
