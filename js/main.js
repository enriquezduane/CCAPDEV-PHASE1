// modal functions
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
const accordionButton = document.querySelector('.accordion-button');
const accordionContent = document.querySelector('.info-center-frame');

accordionButton.addEventListener('click', function() {
    this.classList.toggle('active');

    // Check if the accordion is active to determine how to animate
    if (this.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
        accordionContent.style.maxHeight = '0';
    }
});

// music functions

const soundButton = document.querySelector('.music-button');
const soundEffect = document.querySelector('.sound-effect');
let isPlaying = false;

soundEffect.volume = 0.4;

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