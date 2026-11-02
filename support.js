const supportForm = document.getElementById("support-form");
const supportResponse = document.getElementById("support-response");

if (supportForm && supportResponse) {
    supportForm.addEventListener("submit", (event) => {
        event.preventDefault();
        supportResponse.textContent = "This is only a preview. Your request was not sent or saved.";
        supportForm.reset();
    });
}
