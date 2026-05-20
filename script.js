// Wait until the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Grab the saved bracelet data from the browser's local storage memory
    const storedData = localStorage.getItem('savedBracelet');
    const beadArray = storedData ? JSON.parse(storedData) : [];
    const container = document.getElementById('checkoutBraceletString');

    // 2. Loop through the saved colors and dynamically draw the beads onto the screen
    if (container) {
        beadArray.forEach(color => {
            const bead = document.createElement('div');
            bead.className = 'bead';
            bead.style.backgroundColor = color;
            container.appendChild(bead);
        });
    }

    // 3. Math Calculations ($0.25 per individual bead + $5 base price)
    const count = beadArray.length;
    const beadCost = count * 0.25;
    const total = 5.00 + beadCost;

    // 4. Update the text elements on the screen with our calculated values
    if(document.getElementById('beadCountText')) {
        document.getElementById('beadCountText').innerText = count;
        document.getElementById('beadPriceText').innerText = `$${beadCost.toFixed(2)}`;
        document.getElementById('totalPriceText').innerText = `$${total.toFixed(2)}`;
    }

    // 5. Handle form submission & EmailJS Transmission
    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            // Prevent the browser from refreshing the page automatically
            event.preventDefault();

            // Extract the dynamic values typed into the form input boxes
            const nameInput = document.getElementById("userName").value;
            const emailInput = document.getElementById("userEmail").value;
            const addressInput = document.getElementById("userAddress").value;

            // Map variables to match the placeholder keys inside your EmailJS template
            // You can now include total price and bead counts inside your email template!
            const templateParams = {
                user_name: nameInput,
                user_email: emailInput,     // Matches {{user_email}} in your template
                shipping_address: addressInput,
                bead_count: count,
                total_price: `$${total.toFixed(2)}`
            };

            // Trigger the API delivery call
            emailjs.send("service_529vine", "template_iglfohd", templateParams)
                .then(function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Thank you for your purchase, " + nameInput + "! A confirmation email has been sent to " + emailInput);
                    
                    // Clear out the memory and take them back to the studio start page
                    localStorage.clear();
                    window.location.href = 'index.html';
                }, function (error) {
                    console.log("FAILED...", error);
                    alert("Oops! Something went wrong with the email transmission. Check your API configuration in your console log.");
                });
        });
    }
});
});
