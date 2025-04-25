<?php
// Database configuration
$servername = "127.0.0.1";
$dbUsername = "root";   // update with your MySQL username
$dbPassword = "";   // update with your MySQL password
$dbname = "whiteboard_db";  // database name

// Create connection (without selecting database)
$conn = new mysqli($servername, $dbUsername, $dbPassword);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS `$dbname`";
if (!$conn->query($sql)) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($dbname);

// Create table for users
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if (!$conn->query($sql)) {
    die("Error creating users table: " . $conn->error);
}

// Create table for boards
$sql = "CREATE TABLE IF NOT EXISTS boards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
)";
if (!$conn->query($sql)) {
    die("Error creating boards table: " . $conn->error);
}

// Create table for shapes (drawn elements)
$sql = "CREATE TABLE IF NOT EXISTS shapes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT,
    shape_type VARCHAR(50),
    shape_data TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
)";
if (!$conn->query($sql)) {
    die("Error creating shapes table: " . $conn->error);
}
?>
