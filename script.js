
// بروزرسانی پیش‌نمایش
function updatePreview() {
    const html = document.getElementById('html').value;
    const css = document.getElementById('css').value;
    const js = document.getElementById('js').value;
    const iframe = document.getElementById('preview').contentWindow.document;
    iframe.open();
    iframe.write(`
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>${html}<script>${js}</script></body>
        </html>
    `);
    iframe.close();
}

// دکمه اجرا
document.getElementById('run-btn').addEventListener('click', updatePreview);

// انتخاب زبان
const languageSelect = document.getElementById('language-select');
const htmlInput = document.getElementById('html');
const cssInput = document.getElementById('css');
const jsInput = document.getElementById('js');

languageSelect.addEventListener('change', () => {
    const selected = languageSelect.value;
    htmlInput.classList.remove('active');
    cssInput.classList.remove('active');
    jsInput.classList.remove('active');

    if (selected === 'all') {
        htmlInput.classList.add('active');
        cssInput.classList.add('active');
        jsInput.classList.add('active');
    } else if (selected === 'html') {
        htmlInput.classList.add('active');
    } else if (selected === 'css') {
        cssInput.classList.add('active');
    } else if (selected === 'js') {
        jsInput.classList.add('active');
    }
    updatePreview(); // بروزرسانی خودکار پس از انتخاب زبان
});

// تغییر تم
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.innerHTML = document.body.classList.contains('dark-theme')
        ? '<i class="fas fa-sun"></i> حالت روز'
        : '<i class="fas fa-moon"></i> حالت شب';
});

// پاک کردن کد
document.getElementById('clear-btn').addEventListener('click', () => {
    htmlInput.value = '';
    cssInput.value = '';
    jsInput.value = '';
    updatePreview();
});

// دانلود خروجی به عنوان تصویر
document.getElementById('download-image-btn').addEventListener('click', () => {
    html2canvas(document.getElementById('preview')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'output.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// دانلود کد
document.getElementById('download-code-btn').addEventListener('click', () => {
    const htmlContent = htmlInput.value;
    const cssContent = cssInput.value;
    const jsContent = jsInput.value;

    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const cssBlob = new Blob([cssContent], { type: 'text/css' });
    const jsBlob = new Blob([jsContent], { type: 'text/javascript' });

    const htmlLink = document.createElement('a');
    htmlLink.href = URL.createObjectURL(htmlBlob);
    htmlLink.download = 'index.html';
    htmlLink.click();

    const cssLink = document.createElement('a');
    cssLink.href = URL.createObjectURL(cssBlob);
    cssLink.download = 'style.css';
    cssLink.click();

    const jsLink = document.createElement('a');
    jsLink.href = URL.createObjectURL(jsBlob);
    jsLink.download = 'script.js';
    jsLink.click();
});

// تنظیم پیش‌فرض
htmlInput.classList.add('active');
cssInput.classList.add('active');
jsInput.classList.add('active');
updatePreview();
