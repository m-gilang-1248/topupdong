// Shop JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            name: 'Mobile Legends 86 Diamonds',
            price: 20000,
            regularPrice: 25000,
            image: '../assets/images/products/ml-diamond-86.jpg',
            category: 'mobile-legends'
        },
        {
            id: 2,
            name: 'PUBG Mobile 60 UC',
            price: 15000,
            regularPrice: 18000,
            image: '../assets/images/products/pubg-uc-60.jpg',
            category: 'pubg-mobile'
        },
        {
            id: 3,
            name: 'Free Fire 100 Diamonds',
            price: 18000,
            regularPrice: 22000,
            image: '../assets/images/products/ff-diamond-100.jpg',
            category: 'free-fire'
        }
        // Add more products as needed
    ];

    // DOM elements
    const productsGrid = document.querySelector('.products-grid');
    const categoryFilter = document.querySelector('.product-category-filter');
    const sortSelect = document.querySelector('.product-sort');

    // Initialize products
    function initializeProducts() {
        displayProducts(products);
    }

    // Display products
    function displayProducts(productsToShow) {
        if (!productsGrid) return;

        productsGrid.innerHTML = productsToShow.map(product => `
            <div class="product-item" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.regularPrice > product.price ? '<span class="onsale">Sale!</span>' : ''}
                </div>
                <div class="product-info">
                    <h2 class="product-title">${product.name}</h2>
                    <div class="product-price">
                        <span class="price">Rp ${product.price.toLocaleString()}</span>
                        ${product.regularPrice > product.price ? 
                            `<span class="regular-price">Rp ${product.regularPrice.toLocaleString()}</span>` : 
                            ''}
                    </div>
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }

    // Handle category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const filteredProducts = selectedCategory ? 
                products.filter(product => product.category === selectedCategory) : 
                products;
            displayProducts(filteredProducts);
        });
    }

    // Handle sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            let sortedProducts = [...products];

            switch(sortBy) {
                case 'price':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'popularity':
                    // Implement popularity sorting if needed
                    break;
                case 'date':
                    // Implement date sorting if needed
                    break;
            }

            displayProducts(sortedProducts);
        });
    }

    // Handle add to cart
    function handleAddToCart(event) {
        const productId = event.target.dataset.productId;
        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Get existing cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show success message
            alert('Product added to cart!');
        }
    }

    // Initialize
    initializeProducts();
}); 