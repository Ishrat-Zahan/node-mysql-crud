document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Fetch user data
    fetch(`/users`)
        .then((response) => response.json())
        .then((users) => {
            const user = users.find((u) => u.id == userId);
            const form = document.querySelector('#editForm');
            form.name.value = user.name;
            form.email.value = user.email;
            form.age.value = user.age;
            form.id.value = user.id;
        });

    // Update user
    document.querySelector('#editForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch(`/users/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(() => (window.location.href = '/'))
            .catch(console.error);
    });
});
