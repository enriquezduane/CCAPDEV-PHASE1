const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('#login'); // Adjust this selector to target your open button
const closeModalButton = document.querySelector('.close-btn');

openModalButton.addEventListener('click', function() {
    modal.classList.add('show');
});

closeModalButton.addEventListener('click', function() {
    modal.classList.remove('show');
});

// Optional: Close modal on window click
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});


// Accordion functions
document.querySelector('.accordion-button').onclick = function() {
    this.classList.toggle("active");

    const table = document.querySelector('.info-center-table');

    if (table.style.display === "") {
        table.style.display = "none";
    } else {
        table.style.display = "";
    }
}

// music functions

const soundButton = document.querySelector('.music-button');
const soundEffect = document.querySelector('.sound-effect');
let isPlaying = false;

soundButton.addEventListener('click', function () {
    if (!isPlaying) {
        // Play the sound
        soundEffect.play();
        soundButton.textContent = 'Stop Sound';
    } else {
        // Stop the sound
        soundEffect.pause();
        soundEffect.currentTime = 0; // Reset the playback to the beginning
        soundButton.textContent = 'Play Sound';
    }

    // Toggle the state
    isPlaying = !isPlaying;
});