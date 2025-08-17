<?php
// Include database configuration
require_once 'config/database.php';

// Function to check if a table exists
function tableExists($pdo, $table) {
    try {
        $result = $pdo->query("SHOW TABLES LIKE '{$table}'");
        return $result->rowCount() > 0;
    } catch (PDOException $e) {
        return false;
    }
}

// Function to check if a column exists in a table
function columnExists($pdo, $table, $column) {
    try {
        $result = $pdo->query("SHOW COLUMNS FROM {$table} LIKE '{$column}'");
        return $result->rowCount() > 0;
    } catch (PDOException $e) {
        return false;
    }
}

// Check and create tables if they don't exist
$tables = ['popular_jobs', 'popular_majors', 'career_paths'];
$tablesMissing = false;

foreach ($tables as $table) {
    if (!tableExists($pdo, $table)) {
        $tablesMissing = true;
        break;
    }
}

// If tables are missing, run the create tables script
if ($tablesMissing) {
    try {
        $sql = file_get_contents('create-content-tables.sql');
        $pdo->exec($sql);
        echo "<div class='alert alert-success'>Content tables created successfully.</div>";
    } catch (PDOException $e) {
        echo "<div class='alert alert-danger'>Error creating content tables: " . $e->getMessage() . "</div>";
    }
}

// Check for missing columns in each table
$columnsMissing = false;

// Check popular_jobs columns
$jobColumns = ['title_kh', 'description_kh', 'salary_range', 'requirements', 'image_path', 'is_active', 'display_order'];
foreach ($jobColumns as $column) {
    if (!columnExists($pdo, 'popular_jobs', $column)) {
        $columnsMissing = true;
        break;
    }
}

// Check popular_majors columns
$majorColumns = ['title_kh', 'description_kh', 'institutions', 'skills_gained', 'image_path', 'is_active', 'display_order'];
foreach ($majorColumns as $column) {
    if (!columnExists($pdo, 'popular_majors', $column)) {
        $columnsMissing = true;
        break;
    }
}

// Check career_paths columns
$careerColumns = ['title_kh', 'description_kh', 'progression_steps', 'required_education', 'image_path', 'is_active', 'display_order'];
foreach ($careerColumns as $column) {
    if (!columnExists($pdo, 'career_paths', $column)) {
        $columnsMissing = true;
        break;
    }
}

// If columns are missing, run the update structure script
if ($columnsMissing) {
    try {
        $sql = file_get_contents('update-content-tables-structure.sql');
        $pdo->exec($sql);
        echo "<div class='alert alert-success'>Content tables structure updated successfully.</div>";
    } catch (PDOException $e) {
        echo "<div class='alert alert-danger'>Error updating content tables structure: " . $e->getMessage() . "</div>";
    }
}

echo "<div class='alert alert-info'>Database check completed.</div>";
echo "<p><a href='index.php?page=dashboard' class='btn btn-primary'>Return to Dashboard</a></p>";
?>
