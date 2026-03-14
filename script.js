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

// ================= AI PORTFOLIO ASSISTANT V2 =================

document.addEventListener("DOMContentLoaded", function(){

const botButton = document.getElementById("ai-bot-button");
const botChat = document.getElementById("ai-bot-chat");
const botClose = document.getElementById("ai-close");

const input = document.getElementById("ai-input");
const send = document.getElementById("ai-send");
const messages = document.getElementById("ai-messages");

botButton.addEventListener("click", function(){
    botChat.style.display = "flex";

    if(messages.children.length === 0){
        welcomeMessage();
    }
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

function showTyping(){

const typing = document.createElement("div");
typing.classList.add("ai-msg","bot");
typing.id="typing";
typing.innerHTML="Typing...";
messages.appendChild(typing);

}

function removeTyping(){
const typing = document.getElementById("typing");
if(typing) typing.remove();
}


// ================= WELCOME MESSAGE =================

function welcomeMessage(){

addMessage(
"👋 Hello! I'm Hemadharshini's AI Assistant.<br><br>\
You can ask me about:<br>\
• Skills<br>\
• Projects<br>\
• Experience<br>\
• Resume<br>\
• Contact details",
"bot"
);

showQuickOptions();

}


// ================= QUICK BUTTONS =================

function showQuickOptions(){

const options = document.createElement("div");
options.classList.add("quick-options");

options.innerHTML=`
<button onclick="quickAsk('skills')">Skills</button>
<button onclick="quickAsk('projects')">Projects</button>
<button onclick="quickAsk('experience')">Experience</button>
<button onclick="quickAsk('contact')">Contact</button>
`;

messages.appendChild(options);

}


// ================= QUICK ASK =================

window.quickAsk = function(text){
input.value=text;
send.click();
}


// ================= BOT LOGIC =================

send.onclick = function(){

const userText = input.value.trim().toLowerCase();
if(userText === "") return;

addMessage(userText,"user");
input.value="";

showTyping();

setTimeout(function(){

removeTyping();

let reply="Sorry, I didn't understand. Try asking about skills, projects, experience, resume, or contact.";


// SKILLS
if(userText.includes("skill")){
reply="Hemadharshini has strong skills in Python, Flask, Streamlit, SQL, JavaScript, and AI-based application development.";
}

// PROJECTS
else if(userText.includes("project")){
reply="She has developed multiple projects including Voxira AI Assistant, AI ATS Resume Analyzer, Thought Web AI Platform, and a Student Assistant Chatbot.";
}

// EXPERIENCE
else if(userText.includes("experience") || userText.includes("internship")){
reply="Hemadharshini completed a Web Development Internship at E-Soft IT Solutions and a Generative AI Internship supported by MSME.";
}

// RESUME
else if(userText.includes("resume") || userText.includes("cv")){
reply="You can download Hemadharshini's resume directly from the About section of this portfolio.";
}

// CONTACT
else if(userText.includes("contact") || userText.includes("email")){
reply="You can contact Hemadharshini via email at <b>darshinihema2102@gmail.com</b> or through the contact form available on this website.";
}

// PHONE
else if(userText.includes("phone")){
reply="Her contact number is <b>+91 7092389282</b>.";
}

// LOCATION
else if(userText.includes("location")){
reply="She is currently based in Tamil Nadu, India.";
}

// ABOUT
else if(userText.includes("who") || userText.includes("about")){
reply="Hemadharshini is an MCA student specializing in AI applications, data analytics, and intelligent web systems.";
}

addMessage(reply,"bot");

},1200);

}

input.addEventListener("keypress",function(e){
if(e.key==="Enter") send.click();
});

});
