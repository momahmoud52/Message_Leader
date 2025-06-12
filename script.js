const { jsPDF } = window.jspdf;

document.getElementById("notify-form").onsubmit = (e) => {
  e.preventDefault();

  const employeeSelect = document.getElementById("employee");
  const selectedOption = employeeSelect.options[employeeSelect.selectedIndex];
  const name = selectedOption.text;
  const phone = selectedOption.getAttribute("data-phone");
  const method = document.getElementById("method").value;
  const position = document.getElementById("position").value;
  const governorate = document.getElementById("governorate").value;
  const message = document.getElementById("alert").value;
  const note = document.getElementById("note").value;
  const timestamp = new Date().toLocaleString();

  const fullMessage = `${message}\n\nNote: ${note}`;
  const encodedMessage = encodeURIComponent(fullMessage);

  if (method === "whatsapp") {
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  } else {
    window.open(`sms:${phone}?&body=${encodedMessage}`, "_blank");
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  let y = 20;
  doc.text(`To: ${name} (${position})`, 20, y); y += 10;
  doc.text(`Date: ${timestamp}`, 20, y); y += 10;
  doc.text(`Governorate: ${governorate}`, 20, y); y += 20;

  doc.text(`Dear ${name},`, 20, y); y += 10;
  doc.text(`We hope this message finds you well.`, 20, y); y += 15;

  doc.text(`This is to formally notify you with the following message:`, 20, y); y += 10;
  doc.text(doc.splitTextToSize(`"${message}"`, 170), 20, y); y += 30;

  if (note.trim()) {
    doc.text(`We would also like to bring to your attention the following note:`, 20, y); y += 10;
    doc.text(doc.splitTextToSize(`"${note}"`, 170), 20, y); y += 20;
  }

  doc.text("Sincerely,", 20, y); y += 10;
  doc.text("Press Office Committee", 20, y); y += 10;
  y += 10;
  doc.text("Head of Press Office", 20, y); y += 7;
  doc.text("Mohamed Mahmoud", 20, y); y += 10;

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Press Office Committee", 105, 280, { align: "center" });

  doc.save(`Notification_${name}.pdf`);

  document.getElementById("drive-link").style.display = "block";

  const toast = document.createElement("div");
  toast.textContent = "PDF saved successfully!";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#1f4aff";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};
