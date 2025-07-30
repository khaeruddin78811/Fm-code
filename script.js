body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.editor-container {
    display: flex;
    height: 80vh;
}

.code-area {
    flex: 1;
    display: flex;
    flex-direction: column;
}

textarea {
    flex: 1;
    padding: 10px;
    font-family: 'Courier New', monospace;
    border: 1px solid #ccc;
    resize: none;
}

.preview-area {
    flex: 1;
    border: 1px solid #ccc;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.controls {
    padding: 10px;
    text-align: center;
}

button {
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .editor-container {
        flex-direction: column;
    }
    .code-area {
        flex-direction: row;
    }
    textarea {
        height: 200px;
    }
}
