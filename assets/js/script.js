// Whiteboard navigation and drawing script

// ==================== TOOLS =====================
const tools = document.querySelector(".open-tools");
const openTools = document.querySelector(".open-tools .open");
const closeTools = document.querySelector(".open-tools .close");
const toolsMenu = document.querySelector(".tools");

if (tools) {
  tools.addEventListener("click", () => {
    const isOpen = toolsMenu.style.display === "flex";
    toolsMenu.style.display = isOpen ? "none" : "flex";
    openTools.style.display = isOpen ? "flex" : "none";
    closeTools.style.display = isOpen ? "none" : "flex";
  });
}

// ==================== TOOL DROPDOWN =====================
const dropdownBtn = document.querySelector(".tool-btn.pen");
const dropdown = document.querySelector(".dropdown");

if (dropdownBtn) {
  dropdownBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  });
}

document.addEventListener("click", (event) => {
  if (
    dropdown.style.display === "flex" &&
    !dropdown.contains(event.target) &&
    !dropdownBtn.contains(event.target)
  ) {
    dropdown.style.display = "none";
  }
});

// ==================== ICON CHANGE =====================
const toolBtn = document.querySelector(".tool-btn.pen span");
const toolButtons = document.querySelectorAll(".dropdown-items-btn .other-tools");

function updateToolButtonIcon(selectedTool) {
  const icon = selectedTool.querySelector("i").cloneNode(true);
  toolBtn.innerHTML = "";
  toolBtn.appendChild(icon);
}

// ==================== CURSOR CHANGE =====================
const workspace = document.querySelector("body");

function updateCursor(selectedTool) {
  const iconElement = selectedTool.querySelector("i");
  const iconClass = iconElement.className.split(" ").pop();
  const unicode = getFontAwesomeUnicode(iconClass);
  if (!unicode) return;

  const canvasEl = document.createElement("canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.height = 32;
  canvasEl.width = 32;
  ctx.font = "16px FontAwesome";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(unicode, canvasEl.width / 2, canvasEl.height / 2);
  workspace.style.cursor = `url(${canvasEl.toDataURL()}) 16 16, auto`;
}

function getFontAwesomeUnicode(className) {
  const map = {
    "fa-pencil": "\uf304",
    "fa-highlighter": "\uf591",
    "fa-eraser": "\uf12d",
    "fa-circle": "\uf111",
    "fa-trash": "\uf1f8",
  };
  return map[className] || null;
}

// ==================== GLOBAL VARIABLES =====================
let ctx = null;
let toolSizes = { pen: 3, highlighter: 10, eraser: 20, pointer: 5 };
let currentTool = "pen";
let currentColor = "#000000";
let drawHistory = [];
let historyIndex = -1;

const widthSlider = document.getElementById("pen-width");
const widthValue = document.getElementById("pen-width-value");

if (widthSlider) {
  widthSlider.addEventListener("input", (e) => {
    toolSizes[currentTool] = parseInt(e.target.value);
    widthValue.textContent = e.target.value;
    updateCanvasSettings();
  });
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const toolId = button.id;
    if (toolId === "trash") {
      document.querySelector(".overdiv").style.display = "flex";
      return;
    }
    currentTool = toolId;
    updateToolButtonIcon(button);
    updateCursor(button);
    if (widthSlider) {
      widthSlider.value = toolSizes[currentTool];
      widthValue.textContent = toolSizes[currentTool];
    }
    updateCanvasSettings();
  });
});

// ==================== COLOR SELECTION =====================
const colorSwatches = document.querySelectorAll(".color-swatch");
const penButton = document.querySelector(".tool-btn.pen");

colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    colorSwatches.forEach((btn) => btn.classList.remove("selected-color"));
    swatch.classList.add("selected-color");
    currentColor = swatch.dataset.color;
    penButton.style.color = currentColor;
    updateCanvasSettings();
  });
});

function updateCanvasSettings() {
  if (!ctx) return;
  ctx.strokeStyle = currentTool === "highlighter" ? `${currentColor}80` : currentColor;
  ctx.lineWidth = toolSizes[currentTool];
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

// ==================== WHITEBOARD =====================
const canvas = document.getElementById("whiteboard");

if (canvas) {
  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    redrawCanvas();
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let drawing = false;

  function saveState() {
    drawHistory = drawHistory.slice(0, historyIndex + 1);
    drawHistory.push(canvas.toDataURL());
    historyIndex++;
  }

  function redrawCanvas() {
    if (historyIndex < 0 || historyIndex >= drawHistory.length) return;
    const img = new Image();
    img.src = drawHistory[historyIndex];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.globalCompositeOperation = currentTool === "eraser" ? "destination-out" : "source-over";
    updateCanvasSettings();
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });

  ["mouseup", "mouseleave"].forEach((evt) =>
    canvas.addEventListener(evt, () => {
      if (drawing) {
        drawing = false;
        saveState();
      }
    })
  );

  document.getElementById("undo").addEventListener("click", () => {
    if (historyIndex > 0) {
      historyIndex--;
      redrawCanvas();
    }
  });

  document.getElementById("redo").addEventListener("click", () => {
    if (historyIndex < drawHistory.length - 1) {
      historyIndex++;
      redrawCanvas();
    }
  });

  document.getElementById("yesBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
    document.querySelector(".overdiv").style.display = "none";
  });

  document.getElementById("noBtn").addEventListener("click", () => {
    document.querySelector(".overdiv").style.display = "none";
  });

  // Initialize canvas with a blank state
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
}

// ==================== PAGE NAVIGATION =====================
let pages = [];
let currentPage = 0;

function saveCurrentPage() {
  pages[currentPage] = canvas.toDataURL();
}

function loadPage(index) {
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.src = pages[index];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById("nextPage").addEventListener("click", () => {
  saveCurrentPage();
  currentPage++;
  if (!pages[currentPage]) {
    clearCanvas();
    saveState();
  } else {
    loadPage(currentPage);
  }
  updatePageNumber();
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 0) {
    saveCurrentPage();
    currentPage--;
    loadPage(currentPage);
    updatePageNumber();
  }
});

function updatePageNumber() {
  document.getElementById("pageNumber").innerText = `Page ${currentPage + 1}`;
}

pages[0] = canvas.toDataURL();

// ==================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  updateCanvasSettings();
});

document.getElementById("downloadPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  for (let i = 0; i < pages.length; i++) {
    const imgData = pages[i];
    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  }

  pdf.save("whiteboard.pdf");
});