# Online Whiteboard

## Overview
An online collaborative whiteboard application built with PHP, MySQL, JavaScript, and Bootstrap.

## Features
- User Registration and Login
- Session management
- Dynamic whiteboard drawing with undo/redo functionality
- Download whiteboard as PDF
- User profile and sign out

## Installation
1. Install XAMPP and start Apache/MySQL.
2. Place the project in `/Applications/XAMPP/xamppfiles/htdocs/Whiteboard`.
3. Update database credentials in `config.php` as needed.
4. Access the app via `http://localhost/Whiteboard/landing.php`.

## Usage
- Use the landing page to sign up or log in.
- Navigate to the whiteboard and use provided drawing tools.
- Manage your profile, participate in chats, and more.

## File Structure
- **index.php** - Dashboard after login.
- **login.php** - User login page.
- **signup.php** - User registration page.
- **signout.php** - Sign out and session destruction.
- **config.php** - Database configuration and table creation.
- **assets/** - Contains CSS and JavaScript files.
- **landing.php** - Home page for the whiteboard.