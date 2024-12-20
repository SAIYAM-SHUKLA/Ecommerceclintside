// Helper function to get cookies
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Fetch Profile Information
async function fetchProfile() {
    const token = getCookie('authToken'); // Get token from cookies
    const messageDiv = document.getElementById('message');
    const profileInfo = document.getElementById('profile-info');
    const ordersSection = document.getElementById('orders-section');

    if (!token) {
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'Please login to access your profile.';
        return;
    }

    try {
        // Fetch user profile
        const profileResponse = await fetch(`https://ecommerceserverside1.onrender.com/api/users/profile?token=${token}`, {
            method: 'GET',
        });
        const profileData = await profileResponse.json();

        if (profileResponse.ok) {
            messageDiv.style.display = 'none';
            profileInfo.style.display = 'block';

            document.getElementById('name').innerText = profileData.name;
            document.getElementById('email').innerText = profileData.email;
            document.getElementById('role').innerText = profileData.role;

            // Show "Add Product" button if user is a seller
            if (profileData.role === 'seller') {
                const addProductBtn = document.getElementById('addProductBtn');
                addProductBtn.style.display = 'block';
                addProductBtn.addEventListener('click', () => {
                    window.location.href = '/ECOMMERCEFRONTEND/htmls/addproduct.html';
                });
            }

            // Fetch and display orders
            fetchOrders(token);
        } else {
            messageDiv.style.display = 'block';
            messageDiv.innerText = profileData.message || 'Something went wrong.';
        }
    } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'Failed to load profile. Please try again later.';
    }
}

// Fetch Orders
async function fetchOrders(token) {
    const ordersSection = document.getElementById('orders-section');
    try {
        const ordersResponse = await fetch(`https://ecommerceserverside1.onrender.com/api/orders/buyer?token=${token}`, {
            method: 'GET',
        });
        const ordersData = await ordersResponse.json();

        if (ordersResponse.ok) {
            if (ordersData.length > 0) {
                ordersSection.innerHTML = '<h3>Your Orders:</h3>';
                const ordersList = document.createElement('ul');

                ordersData.forEach(order => {
                    const orderItem = document.createElement('li');
                    orderItem.innerHTML = `
                        <strong>Order ID:</strong> ${order._id}<br>
                        <strong>Product Name:</strong> ${order.productId.name}<br>
                        <strong>Price per Unit:</strong> $${order.productId.price.toFixed(2)}<br>
                        <strong>Quantity:</strong> ${order.quantity}<br>
                        <strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}<br>
                        <strong>Status:</strong> ${order.status}<br>
                        <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
                    `;
                    ordersList.appendChild(orderItem);
                });

                ordersSection.appendChild(ordersList);
            } else {
                ordersSection.innerHTML = '<p>No orders found.</p>';
            }
        } else {
            ordersSection.innerHTML = `<p>${ordersData.message || 'Failed to fetch orders.'}</p>`;
        }
    } catch (error) {
        ordersSection.innerHTML = '<p>Failed to load orders. Please try again later.</p>';
    }
}

// Initialize Profile Page
fetchProfile();
