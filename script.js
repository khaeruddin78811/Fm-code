const htmlInput = document.getElementById("html");
const cssInput = document.getElementById("css");
const jsInput = document.getElementById("js");
const iframe = document.getElementById("preview");
const languageSelect = document.getElementById("language-select");

function updatePreview() {
  const html = htmlInput.value;
  const css = cssInput.value;
  const js = jsInput.value;

  const isDark = document.body.classList.contains("dark-theme");
  const bgColor = isDark ? "#1e1e1e" : "#ffffff";
  const textColor = isDark ? "#d4d4d4" : "#000000";

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
      <head>
        <style>
          body { background: ${bgColor}; color: ${textColor}; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `);
  doc.close();
}

document.getElementById("run-btn").addEventListener("click", updatePreview);

languageSelect.addEventListener("change", () => {
  const value = languageSelect.value;
  htmlInput.parentElement.style.display = (value === "all" || value === "html") ? "flex" : "none";
  cssInput.parentElement.style.display = (value === "all" || value === "css") ? "flex" : "none";
  jsInput.parentElement.style.display = (value === "all" || value === "js") ? "flex" : "none";
  updatePreview();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  updatePreview();
});

document.getElementById("clear-btn").addEventListener("click", () => {
  htmlInput.value = "";
  cssInput.value = "";
  jsInput.value = "";
  updatePreview();
});

document.getElementById("download-image-btn").addEventListener("click", () => {
  html2canvas(iframe.contentWindow.document.body).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "output.png";
    link.click();
  });
});

document.getElementById("download-video-btn").addEventListener("click", () => {
  const stream = iframe.contentWindow.document.body.captureStream();
  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.webm";
    link.click();
  };

  recorder.start();
  setTimeout(() => recorder.stop(), 3000); // 3 ثانیه ضبط می‌کند
});

// حالت پیش‌فرض
updatePreview();
