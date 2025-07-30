const htmlInput = document.getElementById("html");
const cssInput = document.getElementById("css");
const jsInput = document.getElementById("js");
const iframe = document.getElementById("preview");
const languageSelect = document.getElementById("language-select");

function updatePreview() {
  try {
    const html = htmlInput.value || "";
    const css = cssInput.value || "";
    const js = jsInput.value || "";

    const isDark = document.body.classList.contains("dark-theme");
    const bgColor = isDark ? "#1e1e1e" : "#ffffff";
    const textColor = isDark ? "#d4d4d4" : "#000000";

    // استفاده از srcdoc برای جلوگیری از مشکلات امنیتی
    iframe.srcdoc = `
      <html>
        <head>
          <style>
            body { background: ${bgColor}; color: ${textColor}; margin: 0; padding: 0; }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    console.log("پیش‌نمایش به‌روز شد با srcdoc");
  } catch (e) {
    console.error("خطا در بروزرسانی پیش‌نمایش:", e);
    iframe.srcdoc = "<html><body><p>خطا در بارگذاری پیش‌نمایش</p></body></html>";
  }
}

document.getElementById("run-btn").addEventListener("click", () => {
  console.log("دکمه اجرا کلیک شد");
  updatePreview();
});

languageSelect.addEventListener("change", () => {
  const value = languageSelect.value;
  htmlInput.classList.remove("active");
  cssInput.classList.remove("active");
  jsInput.classList.remove("active");

  if (value === "all") {
    htmlInput.classList.add("active");
    cssInput.classList.add("active");
    jsInput.classList.add("active");
  } else if (value === "html") {
    htmlInput.classList.add("active");
  } else if (value === "css") {
    cssInput.classList.add("active");
  } else if (value === "js") {
    jsInput.classList.add("active");
  }
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
  try {
    html2canvas(iframe.contentWindow.document.body, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "output.png";
      link.click();
    });
  } catch (e) {
    console.error("خطا در دانلود تصویر:", e);
  }
});

document.getElementById("download-video-btn").addEventListener("click", () => {
  try {
    const stream = iframe.contentWindow.document.body.captureStream();
    if (!stream) throw new Error("خطا در دسترسی به جریان ویدیو");
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
      URL.revokeObjectURL(url);
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 5000); // 5 ثانیه ضبط
  } catch (e) {
    console.error("خطا در ضبط ویدیو:", e);
  }
});

// حالت پیش‌فرض
updatePreview();
