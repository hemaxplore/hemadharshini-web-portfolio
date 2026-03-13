console.log("Modern Portfolio Loaded");

document.getElementById("contact-form").addEventListener("submit", function(e){

e.preventDefault();

const btn = document.querySelector(".send-btn");

/* disable button while sending */
btn.disabled = true;
btn.innerText = "Sending...";

const params = {
name: this.name.value,
phone: this.phone.value,
email: this.email.value,
message: this.message.value
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

console.error("EmailJS Error:", error);

btn.disabled = false;
btn.innerText = "✉ Send Message";

alert("Message failed. Please try again.");

});

});
