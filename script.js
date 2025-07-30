// بروزرسانی زنده
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

// رویداد برای بروزرسانی زنده
document.getElementById('html').addEventListener('input', updatePreview);
document.getElementById('css').addEventListener('input', updatePreview);
document.getElementById('js').addEventListener('input', updatePreview);

// پاک کردن کد
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('html').value = '';
    document.getElementById('css').value = '';
    document.getElementById('js').value = '';
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
    const htmlContent = document.getElementById('html').value;
    const cssContent = document.getElementById('css').value;
    const jsContent = document.getElementById('js').value;

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
