console.log("Modern Portfolio Loaded");

// ================== TOAST ======================= 
    
function showToast(){

const toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(function(){
    toast.classList.remove("show");
},3000);

}

// ================= EMAIL VALIDATION =========================== 
    
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

// ================= AI PORTFOLIO CHATBOT =================

document.addEventListener("DOMContentLoaded", function(){

const botButton = document.getElementById("ai-bot-button");
const botChat = document.getElementById("ai-bot-chat");
const botClose = document.getElementById("ai-close");

const input = document.getElementById("ai-input");
const send = document.getElementById("ai-send");
const messages = document.getElementById("ai-messages");

botButton.addEventListener("click", function(){
    botChat.style.display = "flex";
});

botClose.addEventListener("click", function(){
    botChat.style.display = "none";
});

function addMessage(text, sender){

const msg = document.createElement("div");
msg.classList.add("ai-msg", sender);
msg.innerHTML = text;

messages.appendChild(msg);
messages.scrollTop = messages.scrollHeight;

}

send.onclick = function(){

const userText = input.value.trim();
if(userText === "") return;

addMessage(userText,"user");
input.value="";

let reply = "Sorry, I didn't understand.";

if(userText.toLowerCase().includes("skill")){
reply="Hemadharshini has skills in Python, Flask, Streamlit, SQL, JavaScript and AI development.";
}

else if(userText.toLowerCase().includes("project")){
reply="Some featured projects include Voxira AI, AI ATS Resume Analyzer, Thought Web and Student Assistant Chatbot.";
}

else if(userText.toLowerCase().includes("experience")){
reply="Hemadharshini completed Web Development Internship at E-Soft IT Solutions and Generative AI Internship under MSME.";
}

else if(userText.toLowerCase().includes("resume")){
reply="You can download the resume from the About section of the portfolio.";
}

setTimeout(function(){
addMessage(reply,"bot");
},600);

}

input.addEventListener("keypress",function(e){
if(e.key==="Enter") send.click();
});

});
