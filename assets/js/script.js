// This file contains the JavaScript code for the application, handling user interactions, dynamic content updates, and other client-side functionality.

// Function to initialize the whiteboard
function initWhiteboard() {
    const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;

    // Function to start drawing
    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    });

    // Function to draw on the canvas
    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    });

    // Function to stop drawing
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.closePath();
    });

    // Function to clear the canvas
    document.getElementById('trash').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Function to handle undo and redo
    let undoStack = [];
    let redoStack = [];

    function saveState() {
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (undoStack.length > 10) {
            undoStack.shift();
        }
    }

    canvas.addEventListener('mouseup', saveState);

    document.getElementById('undo').addEventListener('click', () => {
        if (undoStack.length > 0) {
            redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            const lastState = undoStack.pop();
            ctx.putImageData(lastState, 0, 0);
        }
    });

    document.getElementById('redo').addEventListener('click', () => {
        if (redoStack.length > 0) {
            const redoState = redoStack.pop();
            undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            ctx.putImageData(redoState, 0, 0);
        }
    });
}

// Function to handle color selection
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        ctx.strokeStyle = swatch.dataset.color;
    });
});

// Function to handle pen width adjustment
document.getElementById('pen-width').addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
    document.getElementById('pen-width-value').innerText = e.target.value;
});

// Initialize the whiteboard on page load
window.onload = initWhiteboard;