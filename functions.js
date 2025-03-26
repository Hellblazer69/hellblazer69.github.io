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

const btn = document.getElementById('submitBtn');

    function leaveScratch(x, y) {
      const scratch = document.createElement('div');
      scratch.classList.add('scratch-mark');
      
      // Randomize the scratch appearance slightly
      const width = 4 + Math.random() * 4;
      const height = 40 + Math.random() * 20;
      const rotation = 10 + Math.random() * 4;
      const skew = 10 + Math.random() * 4;
      
      scratch.style.width = `${width}px`;
      scratch.style.height = `${height}px`;
      scratch.style.left = `${x}px`;
      scratch.style.top = `${y}px`;
      scratch.style.transform = `rotate(${rotation}deg) skewY(${skew}deg)`;
      
      // Randomize animation duration
      const duration = 1 + Math.random() * 1;
      scratch.style.animationDuration = `${duration}s`;
      
      btn.appendChild(scratch);

      setTimeout(() => {
        scratch.remove();
      }, duration * 1000);
    }

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      
      // Create 3-5 random scratches
      const scratchCount = 3 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < scratchCount; i++) {
        // Random positions within button
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        leaveScratch(x, y);
      }
      
      // Add button press effect
      btn.style.transform = 'translateY(2px)';
      setTimeout(() => {
        btn.style.transform = 'translateY(-2px)';
      }, 100);
    });