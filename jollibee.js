const foodCards = document.querySelectorAll(".jollibee-food");
const summaryItems = document.getElementById("summary-items");
const totalElement = document.getElementById("order-total");
const confirmation = document.getElementById("order-confirmation");
const orderForm = document.getElementById("order-form");
const currency = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
});

function sanitizeQuantity(value) {
    if (value === null || value === undefined || value === "") {
        return 0;
    }

    const quantity = Number(value);
    if (!Number.isFinite(quantity) || quantity < 0) {
        return 0;
    }

    return Math.trunc(quantity);
}

function sanitizePrice(value) {
    const price = Number(value);
    return Number.isFinite(price) && price >= 0 ? price : 0;
}

function getOrderItems() {
    return Array.from(foodCards).reduce((items, card) => {
        const quantityInput = card.querySelector(".quantity-input");
        if (!quantityInput) {
            return items;
        }

        const quantity = sanitizeQuantity(quantityInput.value);

        if (quantity > 0) {
            const price = sanitizePrice(card.dataset.price);
            items.push({
                name: card.dataset.name,
                quantity,
                price,
                subtotal: quantity * price
            });
        }

        return items;
    }, []);
}

function updateOrderSummary() {
    if (!summaryItems || !totalElement) {
        return;
    }

    const items = getOrderItems();
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    summaryItems.replaceChildren();
    if (items.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-order";
        emptyItem.textContent = "No items selected yet.";
        summaryItems.append(emptyItem);
    } else {
        items.forEach((item) => {
            const summaryItem = document.createElement("li");
            summaryItem.textContent = `${item.name} × ${item.quantity} — ${currency.format(item.subtotal)}`;
            summaryItems.append(summaryItem);
        });
    }

    totalElement.textContent = currency.format(total);
    if (confirmation) {
        confirmation.textContent = "";
    }
}

if (foodCards.length > 0) {
    foodCards.forEach((card) => {
        const quantityInput = card.querySelector(".quantity-input");
        if (quantityInput) {
            quantityInput.addEventListener("input", updateOrderSummary);
        }
    });
}

if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const items = getOrderItems();

        if (items.length === 0) {
            if (confirmation) {
                confirmation.textContent = "Please select at least one menu item.";
            }
            return;
        }

        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        const customerNameInput = document.getElementById("name");
        const customerName = customerNameInput ? customerNameInput.value.trim() : "";
        const selectedPayment = orderForm.querySelector('input[name="payment-method"]:checked');

        if (!customerName) {
            if (confirmation) {
                confirmation.textContent = "Please enter your name before placing the order.";
            }
            return;
        }

        if (!selectedPayment) {
            if (confirmation) {
                confirmation.textContent = "Please select a payment method.";
            }
            return;
        }

        const paymentDescription = selectedPayment.value === "digital"
            ? "Digital payment selected (not processed in this demo)"
            : "Pay in person with cash";

        if (confirmation) {
            confirmation.textContent = `Thank you, ${customerName}! Your order total is ${currency.format(total)}. Payment: ${paymentDescription}.`;
        }
    });
}

updateOrderSummary();