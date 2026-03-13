console.log("Modern Portfolio Loaded");

document.getElementById("contact-form").addEventListener("submit", function(e){

e.preventDefault();

const btn = document.querySelector(".send-btn");

/* disable button while sending */
btn.disabled = true;
btn.innerText = "Sending...";

const params = {
name: document.querySelector('input[name="name"]').value,
phone: document.querySelector('input[name="phone"]').value,
email: document.querySelector('input[name="email"]').value,
message: document.querySelector('textarea[name="message"]').value
};

emailjs.send(
"service_pdwyzfw",
"template_txioa7m",
params
)

.then(function(){

showToast();   // toast notification

document.getElementById("contact-form").reset();

/* restore button */
btn.disabled = false;
btn.innerText = "✉ Send Message";

})

.catch(function(error){

console.log("EmailJS FULL ERROR:", error);

btn.disabled = false;
btn.innerText = "✉ Send Message";

alert("Message failed. Check console.");

});

});
