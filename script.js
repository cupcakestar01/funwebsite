// Wait until the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            // Prevent the browser from reloading the page automatically
            event.preventDefault();

            // Extract the dynamic values typed into the form input boxes
            const nameInput = document.getElementById("user-name").value;
            const emailInput = document.getElementById("user-email").value;
            const messageInput = document.getElementById("user-message").value;

            // Map variables to match the placeholder keys inside your EmailJS template
            const templateParams = {
                user_name: nameInput,
                user_email: emailInput, // Passed to your template's "To Email" field
                message: messageInput
            };

            // Trigger the API delivery call
            // Replace with your actual Service ID and Template ID from your dashboard
            emailjs.send("service_529vine", "template_iglfohd", templateParams)
                .then(function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Thank you! A confirmation email has been sent to " + emailInput);
                    contactForm.reset(); // Clear form fields
                }, function (error) {
                    console.log("FAILED...", error);
                    alert("Oops! Something went wrong with the email transmission. Check your API configuration.");
                });
        });
    }
});