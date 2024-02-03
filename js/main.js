document.querySelector('#login').onclick = function() {
    document.querySelector('.modal').style.display = 'block';
}
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

document.querySelector('.close-btn').onclick = function() {
    closeModal();
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === document.querySelector('.modal')) {
        closeModal();
    }
}