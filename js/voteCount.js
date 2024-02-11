const upVoteButton = document.querySelector('.upvote-btn');
const downVoteButton = document.querySelector('.downvote-btn');
const voteCount = document.querySelector('.vote-count');

let isUpvoted = false; // Variable to track if the post is upvoted
let isDownvoted = false; // Variable to track if the post is downvoted

// Function to handle upvote button click
function handleUpvote() {
    if (!isUpvoted) {
        // Increase the vote count by 1 if the post is not already upvoted
        voteCount.textContent = parseInt(voteCount.textContent) + 1;
        isUpvoted = true;
        upVoteButton.classList.add('active'); // Add active class to upvote button
        downVoteButton.classList.remove('active'); // Remove active class from downvote button
    } else {
        // Decrease the vote count by 1 if the post is already upvoted
        voteCount.textContent = parseInt(voteCount.textContent) - 1;
        isUpvoted = false;
        upVoteButton.classList.remove('active'); // Remove active class from upvote button
    }
    isDownvoted = false; // Reset downvote status
}

// Function to handle downvote button click
function handleDownvote() {
    if (!isDownvoted) {
        // Decrease the vote count by 1 if the post is not already downvoted
        voteCount.textContent = parseInt(voteCount.textContent) - 1;
        isDownvoted = true;
        downVoteButton.classList.add('active'); // Add active class to downvote button
        upVoteButton.classList.remove('active'); // Remove active class from upvote button
    } else {
        // Increase the vote count by 1 if the post is already downvoted
        voteCount.textContent = parseInt(voteCount.textContent) + 1;
        isDownvoted = false;
        downVoteButton.classList.remove('active'); // Remove active class from downvote button
    }
    isUpvoted = false; // Reset upvote status
}

// Event listener for upvote button
upVoteButton.addEventListener('click', handleUpvote);

// Event listener for downvote button
downVoteButton.addEventListener('click', handleDownvote);