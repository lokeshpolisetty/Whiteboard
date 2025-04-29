<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
require_once './config.php';
$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT username, email FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($username, $email);
$stmt->fetch();
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online whiteboard</title>

    <!-- Font awesome CDN -->
    <script src="https://kit.fontawesome.com/8585c17760.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="stylesheet" href="./assets/css/overdiv.css">

</head>
<body>

    <div class="container">
        <!-- Tools Section -->
        <div class="tools-bar">
            <button class="open-tools" title="Tools">
                <img src="./assets/images/menu.png" class="open">
                <img src="./assets/images/exit.png" class="close">
            </button>

            <div class="tools">
                <button class="tool-btn pen" title="Pen">
                    <span><img src="./assets/images/pen.png"></span>
                    <i class="fa fa-angle-up"></i>
                </button>

                <div id="pen-dropdown" class="dropdown">
                    <div class="dropdown-items">
                        <input type="range" id="pen-width" min="1" max="100" step="1" value="3">
                        <span id="pen-width-value" style="display: none;">3</span>
                    </div>
                    <div class="dropdown-items">
                        <button class="color-swatch selected-color" style="background: #000000;" data-color="#000000"></button>
                        <button class="color-swatch" style="background: #FF0000;" data-color="#FF0000"></button>
                        <button class="color-swatch" style="background: #00FF00;" data-color="#00FF00"></button>
                        <button class="color-swatch" style="background: #0000FF;" data-color="#0000FF"></button>
                        <button class="color-swatch" style="background: #FFFFFF;" data-color="#FFFFFF"></button>
                        <button class="color-swatch" style="background: #FFF000;" data-color="#FFF000"></button>
                        <button class="color-swatch" style="background: #00FFFF;" data-color="#00FFFF"></button>

                        <div class="color-picker-container">
                            <input type="color" id="custom-color-picker" title="Choose custom color">
                            <label for="custom-color-picker" class="color-picker-label">
                                <i class="fa-solid fa-eyedropper"></i>
                            </label>
                        </div>
                    </div>

                    <div class="dropdown-items-btn">
                        <button class="other-tools" id="pen"><i class="fa-solid fa-pencil"></i> Pen</button>
                        <button class="other-tools" id="highlighter"><i class="fa-solid fa-highlighter"></i> Highlighter</button>
                        <button class="other-tools" id="eraser"><i class="fa-solid fa-eraser"></i> Eraser</button>
                        <button class="other-tools" id="pointer"><i class="fa-solid fa-circle"></i> Pointer</button>
                        <button class="other-tools" id="trash"><i class="fa-solid fa-trash"></i> Erase All</button>
                    </div>
                </div>

                <button class="tool-btn undo" id="undo" title="Undo">
                    <span><img src="./assets/images/undo.png"></span>
                </button>

                <button class="tool-btn redo" id="redo" title="Redo">
                    <span style="transform: scaleX(-1);"><img src="./assets/images/undo.png"></span>
                </button>

                <div style="text-align: center; margin-top: 10px;">
                    <button id="prevPage" title="Previous Page" class="tool-btn">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span id="pageNumber">Page 1</span>
                    <button id="nextPage" title="Next Page" class="tool-btn">
                        <i class="fas fa-plus"></i>
                    </button>                
                </div> 
                
                <div class="tools">
                    <button id="downloadPDF" class="tool-btn" title="Download as PDF">
                      <i class="fas fa-file-pdf"></i>
                    </button>
                  </div>
                  
            </div>
        </div>

        <!-- Main content -->
        <div class="main-area">
            <!-- Content Section -->
            <div class="content-section" id="content-area">
                <canvas id="whiteboard"></canvas>
            </div>

            <div class="chat-section">
                <div class="chat-box-btn">
                    <button class="chat-btn" title="Mute Chat">
                        <img src="./assets/images/mute-chat.png">
                    </button>
                </div>

                <div id="student-messages"></div>
                <div class="send-msg-box">
                    <textarea placeholder="Text your message..." id="tutor-message"></textarea>
                    <button class="chat-btn" title="Send Message">
                        <img src="./assets/images/send.png">
                    </button>
                </div>
            </div>
        </div>

    </div>

    <div class="overdiv">
        <div class="popup alert">
            <img src="./assets/images/alert.gif" alt="Alert">
            <p>Do you really want to erase all ?</p>
            <div class="overBtns">
                <button id="yesBtn">Yes</button>
                <button id="noBtn">No</button>
            </div>
        </div>
    </div>

    <script src="./assets/js/script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>


</body>
</html>
