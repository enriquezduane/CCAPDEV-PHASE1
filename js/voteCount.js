const upvoteButtons = document.querySelectorAll('.upvote-btn');
const downvoteButtons = document.querySelectorAll('.downvote-btn');
const voteCounts = document.querySelectorAll('.vote-count');

// Function to handle upvote button click
function handleUpvote(event) {
    const voteCount = event.target.nextElementSibling;
    let currentCount = parseInt(voteCount.textContent);
    
    // If the upvote button is not active, increase the count by 1 and mark it as active
    if (!event.target.classList.contains('active')) {
        currentCount++;
        event.target.classList.add('active');
        // Remove active class from downvote button if present
        event.target.nextElementSibling.nextElementSibling.classList.remove('active');
    } else {
        // If the upvote button is active, decrease the count by 1 and remove the active state
        currentCount--;
        event.target.classList.remove('active');
    }
    
    voteCount.textContent = currentCount;
}

// Function to handle downvote button click
function handleDownvote(event) {
    const voteCount = event.target.previousElementSibling;
    let currentCount = parseInt(voteCount.textContent);
    
    // If the downvote button is not active, decrease the count by 1 and mark it as active
    if (!event.target.classList.contains('active')) {
        currentCount--;
        event.target.classList.add('active');
        // Remove active class from upvote button if present
        event.target.previousElementSibling.previousElementSibling.classList.remove('active');
    } else {
        // If the downvote button is active, increase the count by 1 and remove the active state
        currentCount++;
        event.target.classList.remove('active');
    }
    
    voteCount.textContent = currentCount;
}

// Event listeners for upvote buttons
upvoteButtons.forEach(button => {
    button.addEventListener('click', handleUpvote);
});

// Event listeners for downvote buttons
downvoteButtons.forEach(button => {
    button.addEventListener('click', handleDownvote);
});