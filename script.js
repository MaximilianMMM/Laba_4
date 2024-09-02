var products = JSON.parse(productsjson);

function loadProducts(category) {
    let container = document.getElementById("container-id");
    let productsHtml = '';
    products.filter(elem => !category || elem.category === category).forEach(elem => {
        let elemHtml = `<div class='card__elem' id='product-${elem.id}'><h2>${elem.name}</h2> <img class='card__img' src='${elem.image}' alt='${elem.name}' /> <p>Стать: ${elem.sex}</p> <h2>Ціна: ${elem.price}</h2> <button onclick='addProductToCart(${elem.id})' class='btn__buy'>В корзину</button></div>`;
        productsHtml += elemHtml;
    });
    container.innerHTML = productsHtml;
}

function addProductToCart(productId) {
    let product = products.find(item => item.id === productId);
    if (product) {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        let existingItem = cartItems.find(item => item.id === productId);
        if (!existingItem) {
            cartItems.push({ id: productId, quantity: 1 });
        } else {
            existingItem.quantity += 1;
        }
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Товар додано до кошика');
    } else {
        console.error('Product not found!');
    }
}

function showCart() {
    let cartModal = document.getElementById('cart');
    cartModal.style.display = "block";
    openCart();
}

function openCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    let cartItemsData = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let containerHtml = '';
    let summ = 0;

    cartItemsData.forEach(cartItem => {
        let product = products.find(product => product.id === cartItem.id);
        if (product) {
            containerHtml += `<div class="cart-item" id="cart-item-${product.id}">
                <div class="cart-item-name">
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
                </div>
                <div class="cart-item-content">
                    <p>Кількість: <button onclick="decreaseQuantity(${product.id})">-</button> ${cartItem.quantity} <button onclick="increaseQuantity(${product.id})">+</button></p>
                    <p>Ціна за одиницю: ${product.price} грн</p>
                    <p>Всього: ${product.price * cartItem.quantity} грн</p>
                    <button onclick="removeItem(${product.id})">Видалити</button>
                </div>
            </div>`;
        }
        summ += product.price * cartItem.quantity;
    });

    containerHtml += `<div class="cart-item">
                <div class="cart-item-name">
                    <h3>Загальна сума:</h3>
                </div>
                <div class="cart-item-content">
                    <p>${summ}</p>
                </div>
            </div>`;

    cartItemsContainer.innerHTML = containerHtml;
}

function closeCart() {
    let cartModal = document.getElementById('cart');
    cartModal.style.display = "none";
}

function increaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let cartItem = cartItems.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        openCart();
    }
}

function decreaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let cartItem = cartItems.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        openCart();
    } else if (cartItem && cartItem.quantity === 1) {
        removeItem(productId); // Видаляємо елемент, якщо кількість дорівнює 1 і користувач натискає зменшення кількості
    }
}


function removeItem(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    openCart();
}

loadProducts('');
