function calculateOrder() {

    const foods = {
        chicken: { name: "Chicken Joy", price: 120 },
        spaghetti: { name: "Spaghetti", price: 70 },
        burger: { name: "Yum Burger", price: 60 },
        nuggets: { name: "Chicken Nuggets", price: 100 },
        fries: { name: "Fries", price: 73 }
    };

    let total = 0;
    let summary = "";

    for (let food in foods) {

        let qty = Number(document.getElementById(food).value);

        if (qty > 0) {

            let subtotal = qty * foods[food].price;

            total += subtotal;

            summary += `
                <p>${foods[food].name} × ${qty} = ₱${subtotal}</p>
            `;
        }
    }

    if (summary === "") {
        summary = "<p>No items selected.</p>";
    }

    document.getElementById("summary").innerHTML = summary;
    document.getElementById("total").textContent = total;
}