// Define elements only once at the start
var scanElement = document.getElementById("scan");
var thankYouMessageElement = document.getElementById("thankYouMessage");

function toggleMobileMenu() {
  document.getElementById("menu").classList.toggle("active");
}

function showDonateForm() {
  document.getElementById("donateForm").style.display = "block";
  document.getElementById("donateButton").style.display = "none";

  // Hide thank you message and scan elements initially
  thankYouMessageElement.style.display = "none";
  scanElement.style.display = "none";
}

function generateQR() {
  var amount = document.getElementById("amount").value;
  var qrCodeElement = document.getElementById("qrcode");

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  qrCodeElement.innerHTML = ""; // Clear previous QR code

  // QR code data with UPI payment format
  var upiUrl = "upi://pay?pa=9599259157@ptyes&pn=Sir Syed Library&am=" + amount + "&cu=INR";

  // Generate the QR code
  new QRCode(qrCodeElement, {
    text: upiUrl,
    width: 200,
    height: 200,
  });

  qrCodeElement.style.display = "block";
  document.getElementById("downloadButton").style.display = "block"; // Show download button
  thankYouMessageElement.style.display = "block";
  scanElement.style.display = "block";
}

function downloadQR() {
  var qrCanvas = document.querySelector("#qrcode canvas");

  if (qrCanvas) {
    // Create a new canvas with additional space for margin
    var newCanvas = document.createElement("canvas");
    var context = newCanvas.getContext("2d");
    
    // Set new canvas size (QR code size + margin)
    var margin = 50;
    newCanvas.width = qrCanvas.width + margin * 2;
    newCanvas.height = qrCanvas.height + margin * 2;

    // Fill background with white color
    context.fillStyle = "white";
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the QR code in the center of the new canvas with margin
    context.drawImage(qrCanvas, margin, margin);

    // Create a download link for the new canvas with margin
    var qrDataUrl = newCanvas.toDataURL("image/jpg");
    var downloadLink = document.createElement("a");
    downloadLink.href = qrDataUrl;
    downloadLink.download = "QR_SSlibrary.jpg";
    downloadLink.click();
  } else {
    alert("QR code not found. Please generate it first.");
  }
}
