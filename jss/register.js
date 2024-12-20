document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('https://ecommerceserverside1.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();
        const messageElement = document.getElementById('message');

        if (response.ok) {
            messageElement.style.color = 'green';  // Success message
            messageElement.innerHTML = 'User registered successfully!';
            // Redirect to login page
            setTimeout(() => window.location.href = '/login.html', 2000);
        } else {
            messageElement.style.color = 'red';    // Error message
            messageElement.innerHTML = result.message || 'Please enter correct details';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
