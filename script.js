console.log("Modern Portfolio Loaded");

// ================== TOAST ======================= 
    
function showToast(){

const toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(function(){
    toast.classList.remove("show");
},3000);

}

// NAVBAR SCROLL EFFECT

window.addEventListener("scroll", function(){

const navbar = document.querySelector(".navbar");

if(window.scrollY > 50){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}

});


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

// ================= AI PORTFOLIO ASSISTANT =================

document.addEventListener("DOMContentLoaded", function(){

let lastTopic = "";    

const botButton = document.getElementById("ai-bot-button");
const botChat = document.getElementById("ai-bot-chat");
const botClose = document.getElementById("ai-close");

const input = document.getElementById("ai-input");
const send = document.getElementById("ai-send");
const messages = document.getElementById("ai-messages");

botButton.addEventListener("click", function(){

    botChat.style.display = "flex";
    botButton.style.display = "none";   // hide button

    if(!messages.dataset.welcome){
        messages.dataset.welcome = "true";
        welcomeMessage();
    }

});

botClose.addEventListener("click", function(){

    botChat.style.display = "none";
    botButton.style.display = "flex";   // show button again

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

typing.innerHTML = `
<div class="typing">
<span></span>
<span></span>
<span></span>
</div>
`;

messages.appendChild(typing);
messages.scrollTop = messages.scrollHeight;

}

function removeTyping(){
const typing = document.getElementById("typing");
if(typing) typing.remove();
}


// ================= WELCOME MESSAGE =================

function welcomeMessage(){

addMessage(
"👋 Hello! I'm Hema's AI Portfolio Assistant 👽.<br><br>\
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

const quickArea = document.getElementById("quick-area");

quickArea.innerHTML = `
<button class="quick-btn">Skills</button>
<button class="quick-btn">Projects</button>
<button class="quick-btn">Experience</button>
<button class="quick-btn">Contact</button>
`;

document.querySelectorAll(".quick-btn").forEach(btn=>{
btn.addEventListener("click",function(){
input.value=this.innerText.toLowerCase();
send.click();
});
});

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

let reply="I’m not sure about that. Try asking about skills, projects, experience, or contact details.";


// GREETINGS
if(userText.includes("hi") || userText.includes("hello") || userText.includes("hey") || userText.includes("hai")){
reply="Hello! 👋 What can I do for you.";
}

// BYE
else if(userText.includes("bye")){
reply="Goodbye! 👋 Feel free to return anytime to learn more about Hemadharshini's work.";
}

// NICE TO MEET YOU
else if(userText.includes("nice")){
reply="Nice to meet you too! 😊 Let me know if you'd like to explore Hemadharshini's projects or technical skills.";
}
    
// SKILLS
else if(userText.includes("skill")){
reply="Hemadharshini has skills in Python, Flask, Streamlit, SQL, JavaScript, and AI-based application development.";
}


// PROJECT LIST
else if(userText.includes("project")){
lastTopic="projects";

reply="Hemadharshini has developed several projects:<br><br>\
• Voxira AI Assistant<br>\
• AI ATS Resume Analyzer<br>\
• Thought Web AI Platform<br>\
• Student Assistant Chatbot<br>\
• Animal Grazing Detection System<br>\
• Employee Attendance Tracking System<br><br>\
You can ask me about any of these projects.";
}


// EXPERIENCE
else if(userText.includes("experience") || userText.includes("internship")){
reply="Hemadharshini completed a Web Development Internship at E-Soft IT Solutions and also worked on Generative AI applications during her training programs.";
}


// CONTACT
else if(userText.includes("contact") || userText.includes("email")){
reply="You can contact Hemadharshini via email at <b>darshinihema2102@gmail.com</b> or through the contact form in this portfolio.";
}

// PHONE NUMBER
else if(userText.includes("phone") || userText.includes("number") || userText.includes("mobile")){
reply="You can contact Hemadharshini through these number 7092389282.";
}
    
// VOXIRA
else if(userText.includes("voxira")){
lastTopic="voxira";

reply="Voxira AI is a voice-enabled AI assistant designed to interact with users using natural voice commands. It demonstrates conversational AI behavior and intelligent response generation. Type 'explain more' to see the technologies used.";
}


// ATS
else if(userText.includes("ats")){
lastTopic="ats";

reply="AI ATS Resume Analyzer is a resume evaluation system that analyzes how well a resume matches job descriptions used by ATS recruitment software. It helps candidates improve their resume quality. Type 'explain more' to see the technologies used.";
}


// THOUGHT WEB
else if(userText.includes("thought web") || userText.includes("thought")){
lastTopic="thought";

reply="Thought Web is an AI-powered prompt-driven web application that generates intelligent responses based on user prompts. The project demonstrates how AI models can be integrated into web interfaces to create interactive AI tools. Type 'explain more' to see the technologies used.";
}


// ANIMAL DETECTION
else if(userText.includes("animal")){
lastTopic="animal";

reply="Animal Grazing Detection is a computer vision system designed to detect grazing animals from images. It can help farmers monitor livestock activity automatically. Type 'explain more' to see the technologies used.";
}


// ATTENDANCE SYSTEM
else if(userText.includes("attendance")){
lastTopic="attendance";

reply="Employee Attendance Tracking System is a role-based web application used to record and manage employee attendance. It allows administrators to track employee presence and generate reports. Type 'explain more' to see the technologies used.";
}


// FOLLOW UP QUESTIONS
else if(
(userText.includes("more") || userText.includes("explain")) &&
!userText.includes("voxira") &&
!userText.includes("ats") &&
!userText.includes("animal") &&
!userText.includes("attendance")
){
    
if(lastTopic==="voxira"){
reply="Tools used in Voxira AI:<br><br>\
• Python<br>\
• Speech Recognition<br>\
• Natural Language Processing<br>\
• AI response engine<br>\
• Streamlit interface";
}

else if(lastTopic==="ats"){
reply="Tools used in ATS Resume Analyzer:<br><br>\
• Python<br>\
• Streamlit<br>\
• NLP keyword analysis<br>\
• Resume PDF parsing<br>\
• Job description similarity matching";
}

else if(lastTopic==="thought"){
reply="Tools used in Thought Web:<br><br>\
• Python backend<br>\
• Prompt-driven AI logic<br>\
• HTML, CSS, JavaScript interface<br>\
• Modular AI response processing";
}    

else if(lastTopic==="animal"){
reply="Tools used in Animal Grazing Detection:<br><br>\
• Python<br>\
• CNN model<br>\
• OpenCV<br>\
• Image classification<br>\
• Deep learning training dataset";
}

else if(lastTopic==="attendance"){
reply="Tools used in Employee Attendance System:<br><br>\
• PHP backend<br>\
• MySQL database<br>\
• HTML CSS JavaScript<br>\
• Admin dashboard system";
}

else{
reply="Could you specify which project you want more details about?";
}

}

addMessage(reply,"bot");

},1200 + Math.random()*800);

};   

input.addEventListener("keypress",function(e){
if(e.key==="Enter") send.click();
});

});


// ACTIVE NAVBAR LINK ON SCROLL

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 120;
const sectionHeight = section.offsetHeight;

if(scrollY >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){
link.classList.add("active");
}

});

});
