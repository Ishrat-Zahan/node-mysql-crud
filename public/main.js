document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#userTable tbody');

    // Fetch users
    fetch('/users')
        .then((response) => response.json())
        .then((users) => {
            users.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });

    // Delete user
    window.deleteUser = (id) => {
        fetch(`/users/${id}`, { method: 'DELETE' })
            .then(() => location.reload())
            .catch(console.error);
    };

    // Redirect to edit
    window.editUser = (id) => {
        window.location.href = `/static/edit.html?id=${id}`;
    };
});
