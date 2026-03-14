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

    if(!messages.dataset.welcome){
        messages.dataset.welcome="true";
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
"👋 Hello! I'm Hemadharshini's AI Portfolio Assistant.<br><br>\
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
input.value=this.innerText;
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


// SKILLS
if(userText.includes("skill")){
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


// VOXIRA
else if(userText.includes("voxira")){
lastTopic="voxira";

reply="Voxira AI is a voice-enabled AI assistant developed using Python and AI concepts. It allows users to interact through voice commands and receive intelligent responses. The system demonstrates speech interaction, response generation, and conversational AI behavior.";
}


// ATS
else if(userText.includes("ats")){
lastTopic="ats";

reply="The AI ATS Resume Analyzer evaluates resumes against job descriptions using keyword analysis. It helps candidates understand how well their resume matches ATS recruitment systems and provides suggestions for improvement.";
}


// THOUGHT WEB
else if(userText.includes("thought web")){
lastTopic="thought";

reply="Thought Web is a prompt-driven AI web application where users can enter prompts and receive AI-generated responses. The project demonstrates prompt engineering, backend processing, and interactive AI web interfaces.";
}


// ANIMAL DETECTION
else if(userText.includes("animal")){
lastTopic="animal";

reply="Animal Grazing Detection is a computer vision project designed to detect grazing animals in field environments using image analysis techniques. It can help farmers monitor livestock activity and automate observation tasks.";
}


// ATTENDANCE SYSTEM
else if(userText.includes("attendance")){
lastTopic="attendance";

reply="Employee Attendance Tracking System is a role-based web application that manages employee attendance records. It includes authentication, attendance storage in a database, and reporting dashboards for administrators.";
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
reply="Voxira AI integrates voice interaction with AI response generation to assist users through conversational commands.";
}

else if(lastTopic==="ats"){
reply="The ATS analyzer compares resume keywords with job descriptions and suggests improvements for better recruiter visibility.";
}

else if(lastTopic==="animal"){
reply="The system processes images and detects animals automatically to monitor livestock behavior.";
}

else if(lastTopic==="attendance"){
reply="It includes an admin dashboard, attendance reports, and MySQL database integration.";
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
