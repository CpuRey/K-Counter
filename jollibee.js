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
    const quantity = Number(value);
    if (!Number.isFinite(quantity) || quantity < 0) {
        return 0;
    }
    return Math.trunc(quantity);
}

function getOrderItems() {
    return Array.from(foodCards).reduce((items, card) => {
        const quantityInput = card.querySelector(".quantity-input");
        const quantity = sanitizeQuantity(quantityInput.value);

        if (quantity > 0) {
            const price = Number(card.dataset.price);
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
    confirmation.textContent = "";
}

foodCards.forEach((card) => {
    card.querySelector(".quantity-input").addEventListener("input", updateOrderSummary);
});

orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const items = getOrderItems();

    if (items.length === 0) {
        confirmation.textContent = "Please select at least one menu item.";
        return;
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const customerName = document.getElementById("name").value.trim();
    confirmation.textContent = `Thank you, ${customerName}! Your order total is ${currency.format(total)}.`;
});

updateOrderSummary();