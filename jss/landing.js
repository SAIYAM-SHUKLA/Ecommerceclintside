// Fetch all products from the backend
async function fetchProducts() {
    try {
      const response = await fetch('https://ecommerceserverside1.onrender.com/api/products/');
      const products = await response.json();
  
      if (response.ok) {
        displayProducts(products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear existing content
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      // Use template literals (backticks) for cleaner string interpolation
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button id="viewProduct-${product._id}">Place order</button>
      `;
  
      productsContainer.appendChild(productCard);
  
      // Add click event listener for each button dynamically
      const viewProductButton = document.getElementById(`viewProduct-${product._id}`);
      viewProductButton.addEventListener('click', () => {
        sendProductViewRequest(product._id);
      });
    });
  }
  
  async function sendProductViewRequest(productId) {
    // Extract token from browser cookie (using a library like js-cookie)
    const temptoken = document.cookie.split('; ').find(row => row.startsWith('authToken')).split('=')[1];
  
    // Error handling for missing token
    if (!temptoken) {
      console.error('Missing authtoken cookie. Request cannot be sent.');
      return;
    }
  
    // Construct request body
    const quantity = 1; // Assuming a default quantity of 1
    const requestBody = {
      token:temptoken,
      productId,
      quantity,
    };
  
    // Send request to backend using fetch
    try {
      const response = await fetch('https://ecommerceserverside1.onrender.com/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Request successful:', data);
        alert('Order placed successfully!'); // Display success message
      } else {
        console.error('Request failed:', await response.text());
        alert('Order placement failed! Please try again.'); // Display error message
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('An error occurred. Please try again.'); // Display generic error message
    }
  }
  
  fetchProducts();
