class ShoppingCart {
    constructor() {
        this.cart = [];
        this.loadCart();
        this.updateCartUI();
    }
    
    addItem(recipe) {
        // Check if item already exists in cart
        const existingItem = this.cart.find(item => item.id === recipe.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: recipe.id,
                title: recipe.title,
                price: 9.99, // Example price - you can add price to your recipe data
                image: recipe.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
    }
    
    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(id, quantity) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    saveCart() {
        localStorage.setItem('recipeCart', JSON.stringify(this.cart));
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('recipeCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
    
    updateCartUI() {
        // Update cart count in header
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = this.getTotalItems();
        });
        
        // Update dropdown cart
        const cartItemsContainer = document.querySelectorAll('.cart-items');
        cartItemsContainer.forEach(container => {
            if (container.id !== 'cart-items-container') { // Skip the main cart page container
                container.innerHTML = '';
                
                if (this.cart.length === 0) {
                    container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                } else {
                    this.cart.forEach(item => {
                        const cartItem = document.createElement('div');
                        cartItem.className = 'cart-item';
                        cartItem.innerHTML = `
                            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                            <div class="cart-item-details">
                                <div class="cart-item-title">${item.title}</div>
                                <div>${item.quantity} x $${item.price.toFixed(2)}</div>
                            </div>
                            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            <i class="fas fa-times remove-item" data-id="${item.id}"></i>
                        `;
                        container.appendChild(cartItem);
                    });
                }
                
                // Update total
                document.querySelectorAll('.cart-total span').forEach(el => {
                    el.textContent = this.getTotalPrice().toFixed(2);
                });
            }
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add event listeners for removing items from dropdown
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const id = e.target.getAttribute('data-id');
        cart.removeItem(id);
    }
});

// Function to add recipe to cart (use this in your recipe detail page)
function addToCart(recipe) {
    cart.addItem({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        price: 9.99 // Set your price here or add it to your recipe data
    });
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${recipe.title} added to cart!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Inside your loadRecipe function, add this:
document.getElementById('add-to-cart').addEventListener('click', function() {
    addToCart({
        id: recipeId,
        title: recipe.title,
        image: recipe.image,
        price: 9.99 // Set your price here or add it to your recipe data
    });
});
        // Load cart when page loads
        document.addEventListener('DOMContentLoaded', function() {
            const cart = new ShoppingCart();
            const cartContainer = document.getElementById('cart-items-container');
            const cartSummary = document.getElementById('cart-summary');
            
            if (cart.cart.length > 0) {
                // Remove empty cart message
                cartContainer.innerHTML = '';
                
                // Add each cart item
                cart.cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${item.title}</h3>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                        <i class="fas fa-times remove-item" data-id="${item.id}"></i>
                    `;
                    cartContainer.appendChild(cartItem);
                });
                
                // Show summary
                cartSummary.style.display = 'block';
                updateCartSummary(cart);
            }
            
            // Event listeners for quantity changes
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('minus')) {
                    const id = e.target.getAttribute('data-id');
                    const item = cart.cart.find(item => item.id === id);
                    if (item.quantity > 1) {
                        item.quantity--;
                        cart.saveCart();
                        updateCartUI();
                        updateCartSummary(cart);
                    }
                }
                
                if (e.target.classList.contains('plus')) {
                    const id = e.target.getAttribute('data-id');
                    const item = cart.cart.find(item => item.id === id);
                    item.quantity++;
                    cart.saveCart();
                    updateCartUI();
                    updateCartSummary(cart);
                }
                
                if (e.target.classList.contains('remove-item')) {
                    const id = e.target.getAttribute('data-id');
                    cart.removeItem(id);
                    location.reload(); // Refresh to update the view
                }
            });
            
            // Input change event for direct quantity input
            document.addEventListener('change', function(e) {
                if (e.target.classList.contains('quantity-input')) {
                    const id = e.target.getAttribute('data-id');
                    const item = cart.cart.find(item => item.id === id);
                    const newQuantity = parseInt(e.target.value);
                    
                    if (newQuantity >= 1) {
                        item.quantity = newQuantity;
                        cart.saveCart();
                        updateCartUI();
                        updateCartSummary(cart);
                    } else {
                        e.target.value = item.quantity; // Reset to previous value
                    }
                }
            });
            
            function updateCartSummary(cart) {
                const subtotal = cart.getTotalPrice();
                const shipping = subtotal > 0 ? 4.99 : 0; // Example shipping calculation
                const total = subtotal + shipping;
                
                document.getElementById('subtotal').textContent = subtotal.toFixed(2);
                document.getElementById('shipping').textContent = shipping.toFixed(2);
                document.getElementById('total').textContent = total.toFixed(2);
            }
        });
