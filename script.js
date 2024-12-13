// Обработчик удаления товара из корзины
document.addEventListener("DOMContentLoaded", () => {
    const closeIcons = document.querySelectorAll(".close-icon");

    closeIcons.forEach((icon) => {
        icon.addEventListener("click", (event) => {
            const cartItem = event.target.closest(".cart-item");
            if (cartItem) {
                cartItem.remove();
                updateTotal();
            }
        });
    });

    // Обработчик для кнопки "CLEAR SHOPPING CART"
    const clearCartButton = document.querySelector(".clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            const cartItems = document.querySelector(".cart-items");
            cartItems.innerHTML = "";
            updateTotal();
        });
    }

    // Обновление итоговой суммы
    function updateTotal() {
        const totalPriceElement = document.querySelector(".summary-total span");
        const prices = Array.from(document.querySelectorAll(".item-detail span"))
            .filter((span) => span.textContent.includes("$"))
            .map((span) => parseFloat(span.textContent.replace("$", "")));

        const total = prices.reduce((sum, price) => sum + price, 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
});

const products = [
    {
        name: "Black Jacket",
        price: 220.00,
        description: "Stylish black jacket for colder months.",
        image: "images/item1.jpg"
    },
    {
        name: "Sneakers",
        price: 85.00,
        description: "Trendy sneakers for everyday wear.",
        image: "images/item3.jpg"
    },
    {
        name: "Smart Watch",
        price: 180.00,
        description: "Advanced smart watch for tracking fitness.",
        image: "images/item4.jpg"
    },
    {
        name: "T-Shirt",
        price: 45.00,
        description: "Comfortable cotton t-shirt.",
        image: "images/item5.jpg"
    },
    {
        name: "Hat",
        price: 30.00,
        description: "Stylish hat for sunny days.",
        image: "images/item6.jpg"
    },
    {
        name: "Bag",
        price: 120.00,
        description: "Elegant bag for everyday use.",
        image: "images/item1.jpg"
    }
];

// Функция для создания разметки одного товара
function createProductMarkup(product) {
    return `
        <div class="item-card">
            <img src="${product.image}" alt="${product.name}">
            <h3 class="item-title">${product.name}</h3>
            <p class="item-description">${product.description}</p>
            <p class="item-price">$${product.price.toFixed(2)}</p>
        </div>
    `;
}

// Функция для отображения всех товаров в контейнере
function renderProductsList() {
    const container = document.querySelector(".goods-list .items-grid");
    if (!container) return;

    const productsMarkup = products.map(createProductMarkup).join("");

    container.innerHTML = productsMarkup;
}

document.addEventListener("DOMContentLoaded", () => {
    renderProductsList();
});

class GoodsItem {
    constructor(title, price, image, color, size, quantity) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
    }

    render() {
        return `
            <div class="cart-item">
                <div class="item-left">
                    <img src="${this.image}" alt="${this.title}" class="item-image">
                </div>
                <div class="item-right">
                    <div class="item-header">
                        <h4 class="item-name">${this.title}</h4>
                        <img src="images/close.svg" alt="Close" class="close-icon">
                    </div>
                    <p class="item-detail">Price: <span>$${this.price.toFixed(2)}</span></p>
                    <p class="item-detail">Color: <span>${this.color}</span></p>
                    <p class="item-detail">Size: <span>${this.size}</span></p>
                    <p class="item-detail">Quantity: <span>${this.quantity}</span></p>
                </div>
            </div>
        `;
    }
    // Метод для вычисления стоимости одного товара
    getTotalPrice() {
        return this.price * this.quantity;
    }
}

class GoodsList {
    constructor() {
        this.goods = []; // Массив для хранения товаров
    }

    fetchGoods() {
        this.goods = [
            new GoodsItem("Black Jacket", 220.00, "images/item1.jpg", "Black", "L", 1),
            new GoodsItem("Sneakers", 85.00, "images/item2.jpg", "White", "M", 2),
            new GoodsItem("Smart Watch", 180.00, "images/item3.jpg", "Silver", "M", 1),
        ];
    }

    render() {
        const container = document.querySelector(".cart-items");
        const totalContainer = document.querySelector(".summary-total span");
        if (!container) return;

        const itemsMarkup = this.goods.map(item => item.render()).join("");

        container.innerHTML = `
            ${itemsMarkup}
            <div class="cart-buttons">
                <button class="clear-cart">CLEAR SHOPPING CART</button>
                <button class="continue-shopping">CONTINUE SHOPPING</button>
            </div>
        `;

        // Подсчитываем общую стоимость всех товаров
        const totalPrice = this.goods.reduce((total, item) => total + item.getTotalPrice(), 0);
        totalContainer.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const goodsList = new GoodsList();
    goodsList.fetchGoods();
    goodsList.render();
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".subscribe-form")) {
        const form = event.target.closest(".subscribe-form");
        const emailInput = form.querySelector("#emailInput");
        const errorMessage = form.querySelector("#error-message");

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Проверка, был ли обработчик уже добавлен
        if (!form.dataset.submitHandlerAdded) {
            form.dataset.submitHandlerAdded = "true";

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const email = emailInput.value.trim();

                if (!emailRegex.test(email)) {
                    emailInput.style.border = "2px solid red";
                    errorMessage.style.display = "block";
                } else {
                    emailInput.style.border = "";
                    errorMessage.style.display = "none";
                    alert("Подписка успешна!");
                }
            });
        }
    }
});

