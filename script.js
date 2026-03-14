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

const options = document.createElement("div");
options.classList.add("quick-options");

options.innerHTML=`
<button class="quick-btn">Skills</button>
<button class="quick-btn">Projects</button>
<button class="quick-btn">Experience</button>
<button class="quick-btn">Contact</button>
`;

messages.appendChild(options);

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

reply="Voxira AI is an intelligent voice-based AI assistant built using Python and AI concepts. It processes user queries and generates responses using natural interaction techniques.";
}


// ATS
else if(userText.includes("ats")){
lastTopic="ats";

reply="The AI ATS Resume Analyzer evaluates resumes against job descriptions and calculates how well they match ATS systems used by recruiters.";
}


// THOUGHT WEB
else if(userText.includes("thought web")){
lastTopic="thought";

reply="Thought Web is an AI-powered prompt-based web application where users interact with AI to generate intelligent responses.";
}


// ANIMAL DETECTION
else if(userText.includes("animal")){
lastTopic="animal";

reply="Animal Grazing Detection is a computer vision project designed to identify grazing animals in field environments using image recognition techniques.";
}


// EMPLOYEE ATTENDANCE
else if(userText.includes("attendance")){
lastTopic="attendance";

reply="Employee Attendance Tracking System is a role-based web application for managing employee attendance and generating reports.";
}
addMessage(reply,"bot");

},1000);

}

// FOLLOW UP QUESTIONS

else if(userText.includes("more") || userText.includes("explain")){

if(lastTopic==="voxira"){
reply="Voxira AI integrates voice interaction with AI response generation. It demonstrates how conversational systems can assist users through voice commands.";
}

else if(lastTopic==="ats"){
reply="The ATS Analyzer compares resume content with job descriptions, identifies missing keywords, and provides suggestions to improve recruiter compatibility.";
}

else if(lastTopic==="animal"){
reply="The system uses image processing and object detection models to identify grazing animals and monitor livestock activity automatically.";
}

else if(lastTopic==="attendance"){
reply="The system includes admin dashboards, attendance tracking, and database storage using MySQL for managing employee records.";
}

else{
reply="Could you specify what you would like to know more about?";
}

}    

input.addEventListener("keypress",function(e){
if(e.key==="Enter") send.click();
});

});
