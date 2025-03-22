document.getElementById("phone").addEventListener("input", function (e) {
    let value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits

    // Format the phone number
    let formattedValue = value.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");

    // Update the input value
    this.value = formattedValue;

    // Validate the phone number
    let phoneError = document.getElementById("phone-error");
    if (value.length < 9) {
        phoneError.textContent = "Phone number must be 9 digits.";
    } else {
        phoneError.textContent = "";
    }
});

function openTab(evt, tabName) {

    let tabContents = document.getElementsByClassName("tab-content");
    for (let content of tabContents) {
        content.classList.remove("active");
    }

    let tabLinks = document.getElementsByClassName("tab-link");
    for (let link of tabLinks) {
        link.classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");

    if (tabName === "formTab") {
        document.querySelector('.nav-links a[onclick*="formTab"]').classList.add("active");
    } else {
        if (evt && evt.currentTarget.classList.contains("tab-link")) {
            evt.currentTarget.classList.add("active");
        }
    }
}