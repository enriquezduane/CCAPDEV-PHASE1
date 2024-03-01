const replyForm = document.getElementById('replyForm');

if (replyForm) {
    replyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect reply content and post ID
        const content = postQuill.getContents(); 
        const hiddenInput = document.querySelector('input[name="postId"]');
        const postId = hiddenInput.value;
        
        const page = hiddenInput.dataset.page;
        const totalPages = hiddenInput.dataset.totalpages;
        const lastLimitReached = hiddenInput.dataset.lastlimitreached;
        let pageItems = hiddenInput.dataset.pageitems;
        const paginationLimit = hiddenInput.dataset.paginationlimit;

        const isEmptyContent = content.ops.every(op => {
            // Check if op.insert is a string before attempting to trim
            if (typeof op.insert === 'string') {
                // Remove leading and trailing whitespace from the insert
                const trimmedInsert = op.insert.trim();
                // Check if the trimmed insert is only newline characters
                return trimmedInsert === '\n' || trimmedInsert === '';
            }
        });
        
        // Check if reply content is not empty
        if (!isEmptyContent) {
            // Send AJAX request to add the reply
            fetch('reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: content, postId: postId, page: page })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then( reply => {
                // On successful response, update the page with the new reply
                const newPage = parseInt(totalPages) + 1;

                if (lastLimitReached === "true") {
                    window.location.href = window.location.pathname + '?page=' + newPage;
                    alert('Reply added successfully!');
                    return;
                }
                
                if (page !== totalPages && lastLimitReached === "false") {
                    window.location.href = window.location.pathname + '?page=' + totalPages + "#" + reply.id;
                    alert('Reply added successfully!');
                    return;
                }

                pageItems = parseInt(pageItems) + 1;

                hiddenInput.dataset.pageitems = pageItems;
                hiddenInput.dataset.lastlimitreached = pageItems === paginationLimit ? "true" : "false";

                const replyContainer = document.querySelector('.content-container');
                const newReplySection = document.createElement('div');
                const repliesSectionFooter = document.querySelector('.reply-section-top');

                newReplySection.classList.add('reply-section', 'post-section', 'post-container-template');
                newReplySection.dataset.id = reply.id;
                newReplySection.innerHTML = `
                        <div class="poster-info">
                            <div class="poster-name">
                                <strong><a href="/user/${reply.userId}">${reply.username}</a></strong>
                            </div>
                            <div class="poster-role ${reply.roleClass}">
                                ${reply.role}
                            </div>
                            <div class="poster-icon">
                                <img id="profileImage" src="${reply.profilePicture}" alt="profile picture">
                            </div>
                            <div class="poster-join-date">
                                Join Date: ${reply.joinDate}
                            </div>
                            <div class="poster-posts">
                                Posts: ${reply.postCount}
                            </div>
                        </div>
                        <div class="post-area">
                            <div class="post-info">
                                <div class="post-info-top">
                                    <div class="post-name">
                                    <a href="${reply.href}#${reply.id}"><strong>${reply.title}</strong></a>
                                    </div>
                                    <div class="vote-container">
                                        <button class="upvote-btn">Upvote</button>
                                        <p class="vote-count">0</p>
                                        <button class="downvote-btn">Downvote</button>
                                    </div>
                                </div>
                                <div class="post-info-bottom">
                                    <div class="post-date">
                                        ${reply.date}
                                    </div>
                                    <div class="post-edited">
                                    ${reply.edited ? `Last Edit: ${reply.updatedAtSGT}` : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="post-content">
                            ${reply.reply}
                            </div>
                            <div class="post-content-footer">
                                <button class="edit-button">Edit</button>
                                <button class="delete-button">Delete</button>
                            </div>
                        </div>
                `;

                replyContainer.insertBefore(newReplySection, repliesSectionFooter);
                postQuill.setText('');

                alert('Reply added successfully!');
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                alert(error.message);
            });
        } else {
            // Optionally, you can provide feedback to the user that the reply is empty
            alert('Reply cannot be empty');
        }
    });

}
