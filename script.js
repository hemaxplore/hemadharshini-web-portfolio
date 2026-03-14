console.log("Modern Portfolio Loaded");

# ================== TOAST ======================= #
    
function showToast(){

const toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(function(){
    toast.classList.remove("show");
},3000);

}

# ================= EMAIL VALIDATION =========================== #
    
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

/* ================= AI BOT ================= */

function toggleAIBot(){

const bot = document.getElementById("aiBot");

if(bot.style.display==="flex"){
bot.style.display="none";
}else{
bot.style.display="flex";
}

}

function sendAIMessage(){

const input=document.getElementById("aiInput");
const text=input.value.trim();

if(!text) return;

const messages=document.getElementById("aiMessages");

/* user message */

messages.innerHTML+=`<div class="ai-msg user">${text}</div>`;

/* simple AI reply */

let reply=getAIReply(text.toLowerCase());

setTimeout(()=>{

messages.innerHTML+=`<div class="ai-msg bot">${reply}</div>`;

messages.scrollTop=messages.scrollHeight;

},500);

input.value="";

}

function getAIReply(msg){

if(msg.includes("skill"))
return "Hemadharshini's skills include Python, Flask, Streamlit, SQL, JavaScript, AI development, and data analytics.";

if(msg.includes("project"))
return "Her major projects include Voxira AI Speech Platform, ATS Resume Analyzer, Animal Gazing Detection System, and Student Assistant Chatbot.";

if(msg.includes("education"))
return "She is pursuing MCA at Dhanalakshmi Srinivasan Engineering College with CGPA 8.3.";

if(msg.includes("contact"))
return "You can contact her via email at darshinihema2102@gmail.com or through the contact section.";

if(msg.includes("resume"))
return "You can download her resume using the 'Download Resume' button in the About section.";

return "I'm Hemadharshini's portfolio assistant. Ask me about skills, projects, education, or contact information.";

}
