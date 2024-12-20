document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://ecommerceserverside1.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        const messageElement = document.getElementById('message');
        console.log(result.token)

        if (response.ok) {
            const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
            document.cookie = `authToken=${result.token}; path=/; expires=${nextWeek.toUTCString()}; Secure; non-HttpOnly`;
            messageElement.style.color = 'green';  // Success message
            messageElement.innerHTML = 'Login Successful!';
        } else {
            messageElement.style.color = 'red';    // Error message
            messageElement.innerHTML = result.message || 'Invalid credentials';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('register-link').addEventListener('click', function() {
    window.location.href = '/register.html'; // Redirecting to registration page
});
