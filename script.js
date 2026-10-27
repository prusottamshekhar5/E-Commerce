// Product Data Store
const products = [
    {
        id: 1,
        title: "Wireless Noise-Canceling Headphones",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Experience pristine acoustic sound quality and active noise cancellation for uninterrupted music listening."
    },
    {
        id: 2,
        title: "Minimalist Smartwatch Series 5",
        category: "electronics",
        price: 149.50,
        rating: 4.6,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "Track your fitness metrics, heart rate, and notifications seamlessly with a gorgeous retina display."
    },
    {
        id: 3,
        title: "Classic Tailored Wool Blazer",
        category: "apparel",
        price: 120.00,
        rating: 4.5,
        reviews: 65,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        description: "Expertly tailored wool blazer designed for formal occasions or sharp smart-casual everyday styling."
    },
    {
        id: 4,
        title: "Designer Leather Crossbody Bag",
        category: "accessories",
        price: 89.99,
        rating: 4.9,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted genuine full-grain leather crossbody bag featuring secure compartments and brass hardware."
    },
    {
        id: 5,
        title: "Ergonomic Mechanical Keyboard",
        category: "electronics",
        price: 110.00,
        rating: 4.7,
        reviews: 83,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        description: "Tactile mechanical switches with customizable RGB backlighting designed for optimal typing comfort."
    },
    {
        id: 6,
        title: "Nordic Ceramic Table Lamp",
        category: "home",
        price: 65.00,
        rating: 4.4,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        description: "Warm up your living room or bedroom aesthetic with this minimalist Scandinavian ceramic lamp."
    },
    {
        id: 7,
        title: "Organic Cotton Casual Hoodie",
        category: "apparel",
        price: 55.00,
        rating: 4.3,
        reviews: 115,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        description: "Supremely soft organic fleece cotton hoodie built for ultimate cozy streetwear comfort."
    },
    {
        id: 8,
        title: "Polarized Aviator Sunglasses",
        category: "accessories",
        price: 45.00,
        rating: 4.6,
        reviews: 77,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "Timeless aviator frame with UV400 polarized lenses to protect your eyes with refined style."
    },
    {
        id: 9,
        title: "Scented Soy Wax Candle Jar",
        category: "home",
        price: 24.99,
        rating: 4.8,
        reviews: 150,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        description: "Hand-poured natural soy wax infused with soothing lavender and sandalwood essential oils."
    }
];

// Application State
let cart = [];
let wishlist = [];
let discountPercentage = 0;

// DOM Elements
const productGrid = document.getElementById("productGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceVal = document.getElementById("priceVal");
const sortSelect = document.getElementById("sortSelect");
const productCountShowing = document.getElementById("productCountShowing");

const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartCount = document.getElementById("cartCount");
const cartDrawerCount = document.getElementById("cartDrawerCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDiscount = document.getElementById("cartDiscount");
const discountRow = document.getElementById("discountRow");
const cartTotal = document.getElementById("cartTotal");

const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistCount = document.getElementById("wishlistCount");

const promoInput = document.getElementById("promoInput");
const applyPromoBtn = document.getElementById("applyPromoBtn");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");

const quickViewModal = document.getElementById("quickViewModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBody = document.getElementById("modalBody");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    setupEventListeners();
});

// Render Products Grid
function renderProducts(items) {
    productGrid.innerHTML = "";
    
    if (items.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No products found matching your criteria.</p>`;
        productCountShowing.textContent = `Showing 0 products`;
        return;
    }

    productCountShowing.textContent = `Showing ${items.length} products`;

    items.forEach(product => {
        const isWishlisted = wishlist.includes(product.id);
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.title}">
                <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                    <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <button class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i> ${product.rating} <span>(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Filter and Sort Handler
function filterAndSortProducts() {
    const activeCategoryBtn = document.querySelector(".cat-btn.active");
    const selectedCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : "all";
    const maxPrice = parseFloat(priceRange.value);
    const searchQuery = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    
    const checkedRatings = Array.from(document.querySelectorAll(".rating-filter:checked")).map(cb => parseFloat(cb.value));

    let filtered = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
        const matchesRating = checkedRatings.length === 0 || checkedRatings.some(r => product.rating >= r);

        return matchesCategory && matchesPrice && matchesSearch && matchesRating;
    });

    // Sorting
    if (sortBy === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

// Event Listeners Setup
function setupEventListeners() {
    // Category Buttons
    categoryFilters.addEventListener("click", (e) => {
        if (e.target.classList.contains("cat-btn")) {
            document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            filterAndSortProducts();
        }
    });

    // Price Slider
    priceRange.addEventListener("input", (e) => {
        priceVal.textContent = e.target.value;
        filterAndSortProducts();
    });

    // Search Input
    searchInput.addEventListener("input", filterAndSortProducts);

    // Sort Dropdown
    sortSelect.addEventListener("change", filterAndSortProducts);

    // Rating checkboxes
    document.querySelectorAll(".rating-filter").forEach(cb => {
        cb.addEventListener("change", filterAndSortProducts);
    });

    // Cart Drawer Toggle
    cartBtn.addEventListener("click", toggleCartDrawer);
    closeCartBtn.addEventListener("click", toggleCartDrawer);
    cartOverlay.addEventListener("click", toggleCartDrawer);

    // Promo Code Apply
    applyPromoBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === "SHOPO20") {
            discountPercentage = 0.20;
            alert("Promo code 'SHOPO20' applied successfully! 20% discount granted.");
            updateCartUI();
        } else {
            alert("Invalid promo code. Try 'SHOPO20'");
        }
    });

    // Checkout Modal
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        toggleCartDrawer();
        checkoutModal.classList.add("open");
    });

    closeCheckoutModal.addEventListener("click", () => {
        checkoutModal.classList.remove("open");
    });

    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("🎉 Order placed successfully! Thank you for shopping with Shopo.");
        cart = [];
        discountPercentage = 0;
        updateCartUI();
        checkoutModal.classList.remove("open");
        checkoutForm.reset();
    });

    // Quick View Modal
    closeModalBtn.addEventListener("click", () => {
        quickViewModal.classList.remove("open");
    });
    quickViewModal.addEventListener("click", (e) => {
        if (e.target === quickViewModal) quickViewModal.classList.remove("open");
    });
}

function toggleCartDrawer() {
    cartDrawer.classList.toggle("open");
    cartOverlay.classList.toggle("open");
}

// Cart Management Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    // Smoothly open cart drawer feedback
    if (!cartDrawer.classList.contains("open")) {
        toggleCartDrawer();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartDrawerCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">Your cart is currently empty.</p>`;
        cartSubtotal.textContent = "$0.00";
        cartTotal.textContent = "$0.00";
        discountRow.style.display = "none";
        return;
    }

    let subtotalVal = 0;

    cart.forEach(item => {
        subtotalVal += item.price * item.quantity;
        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartSubtotal.textContent = `$${subtotalVal.toFixed(2)}`;

    let finalTotal = subtotalVal;
    if (discountPercentage > 0) {
        const discountVal = subtotalVal * discountPercentage;
        discountRow.style.display = "flex";
        cartDiscount.textContent = `-$${discountVal.toFixed(2)}`;
        finalTotal -= discountVal;
    } else {
        discountRow.style.display = "none";
    }

    cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

// Wishlist Management
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    wishlistCount.textContent = wishlist.length;
    filterAndSortProducts();
}

// Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
        <div class="modal-body-grid">
            <img src="${product.image}" alt="${product.title}">
            <div>
                <span class="product-category">${product.category}</span>
                <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 10px;">${product.title}</h2>
                <div class="product-rating" style="margin-bottom: 12px;">
                    <i class="fa-solid fa-star"></i> ${product.rating} <span>(${product.reviews} reviews)</span>
                </div>
                <div style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 15px;">$${product.price.toFixed(2)}</div>
                <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">${product.description}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id}); quickViewModal.classList.remove('open');">Add to Cart</button>
            </div>
        </div>
    `;
    quickViewModal.classList.add("open");
}