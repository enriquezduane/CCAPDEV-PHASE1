const editUserModal = document.getElementById('editUserModal');
const openEditUserModalBtns = document.querySelectorAll(".edit-user-button");
const closeEditUserModalBtn = document.getElementById("closeEditUserModalBtn");
const editUserForm = document.getElementById("editUserForm");
let userId = null;

if (openEditUserModalBtns) {
    openEditUserModalBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Retrieve user data from data attributes
            const username = this.dataset.username;
            const role = this.dataset.role;
            const age = this.dataset.age;
            const description = this.dataset.description;
            const currentServer = this.dataset.currentserver;
            userId = this.dataset.id;

            // Fill the edit user modal form with user data
            const editUserForm = document.querySelector('#editUserForm');
            const editUsernameInput = editUserForm.querySelector('#editUsername');
            const editRoleInput = editUserForm.querySelector('#editRole');
            const editAgeInput = editUserForm.querySelector('#editAge');
            const editDescription = editUserForm.querySelector('#editDescription');
            const editCurrentServerInput = editUserForm.querySelector('#editCurrentServer');

            // Set the form values
            editUsernameInput.value = username;
            editRoleInput.value = role;
            editAgeInput.value = age;
            editDescription.value = description;
            editCurrentServerInput.value = currentServer;

            // Show the edit user modal
            editUserModal.classList.add('show');
        });
    });
}

if (closeEditUserModalBtn) {
    closeEditUserModalBtn.addEventListener('click', () => {
        editUserModal.classList.remove('show');
    });
}

if (editUserModal) {
    window.addEventListener('click', (event) => {
        if (event.target === editUserModal) {
            editUserModal.classList.remove('show');
        }
    });
}

if (editUserForm) {
    editUserForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("editUsername").value;
        const password = document.getElementById("editPassword").value;
        const role = document.getElementById("editRole").value;
        const age = document.getElementById("editAge").value;
        const description = document.getElementById("editDescription").value;
        const currentServer = document.getElementById("editCurrentServer").value;

        fetch('/admin/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: userId, 
                username: username, 
                password: password, 
                role: role, 
                age: age, 
                description: description,
                currentServer: currentServer 
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(() => {
            alert('User updated successfully!');
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert(error.message);
        })
        .finally(() => {
            editUserModal.classList.remove('show');
        });
    });
}

// Delete user
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-user-button')) {
        // Warn the user before deleting
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        // Retrieve the user ID from the data-id attribute
        const userId = event.target.dataset.id;

        // Send an AJAX request to delete the user
        fetch('/admin/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(() => {
            alert('User deleted successfully!');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert(error.message);
        });
    }
});
