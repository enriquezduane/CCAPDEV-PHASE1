const textarea = document.querySelector('textarea');

if (textarea) {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = (textarea.scrollHeight) + 'px'; // Set new height
    });
}