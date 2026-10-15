function calculateOrder() {

            const foods = {
                adobo: { name: "Adobo", price: 85 },
                tinola: { name: "Tinola", price: 93 },
                munggo: { name: "Munggo", price: 65 },
                afritada: { name: "Afritada", price: 105 },
                dinuguan: { name: "Dinuguan", price: 83 },
                pinakbet: { name: "Pinakbet", price: 75 },
                minudo: { name: "Minudo", price: 93 },
                bicol: { name: "Bicol Express", price: 105 }
            };

            let total = 0;
            let summary = "";

            for (let food in foods) {

                let qty = Number(document.getElementById(food).value);

                if (qty > 0) {

                    let subtotal = qty * foods[food].price;

                    total += subtotal;

                    summary += `
                        <p>
                            ${foods[food].name} × ${qty}
                            = ₱${subtotal}
                        </p>
                    `;
                }
            }

            if (summary === "") {
                summary = "<p>No items selected.</p>";
            }

            document.getElementById("summary").innerHTML = summary;
            document.getElementById("total").textContent = total;
        }