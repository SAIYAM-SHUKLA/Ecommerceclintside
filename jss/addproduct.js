document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const temptoken = document.cookie.split('; ').find(row => row.startsWith('authToken')).split('=')[1];

    const token = temptoken;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const productData = {
        token,
        name,
        description,
        price,
        stock,
        category
    };

    try {
        const response = await fetch('http://localhost:5000/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Product added successfully!');
            // Optionally, redirect to another page
            window.location.href = '/ECOMMERCEFRONTEND/htmls/profile.html';
        } else {
            alert(result.message || 'Failed to add product.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});