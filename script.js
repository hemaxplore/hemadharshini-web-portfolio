console.log("Modern Portfolio Loaded");

// ================== TOAST =======================
function showToast(){
    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ================= AFTER DOM LOADED =================
document.addEventListener("DOMContentLoaded", () => {

    // 1. CERTIFICATE MODAL LOGIC
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");
    const closeBtn = document.querySelector(".close-btn");

    if (modal && modalImg && closeBtn) {
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const imgSrc = btn.dataset.cert;
                if(!imgSrc){
                    console.error("Missing image path");
                    return;
                }
                modalImg.src = imgSrc;
                modal.style.display = "flex";
            });
        });

        closeBtn.onclick = () => modal.style.display = "none";

        modal.onclick = (e) => {
            if(e.target === modal){
                modal.style.display = "none";
            }
        };
    }

    // 2. AI BOT LOGIC
    const botButton = document.getElementById("ai-bot-button");
    const botChat = document.getElementById("ai-bot-chat");
    const botClose = document.getElementById("ai-close");
    const input = document.getElementById("ai-input");
    const send = document.getElementById("ai-send");
    const messages = document.getElementById("ai-messages");

    let lastTopic = "";
    let isTyping = false; // guard: prevents stacking multiple typing indicators

    // Safely escape HTML to prevent XSS from user input
    function escapeHtml(text){
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function addMessage(text, sender){
        const msg = document.createElement("div");
        msg.classList.add("ai-msg", sender);
        if(sender === "bot"){
            msg.innerHTML = `<div class="msg-row">
                <img src="assets/images/bot.png" class="bot-avatar" onerror="this.style.display='none'">
                <div class="msg-text">${text}</div>
            </div>`;
        } else {
            // Escape user input to prevent XSS
            msg.innerHTML = `<div class="msg-text">${escapeHtml(text)}</div>`;
        }
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping(){
        if(isTyping) return; // prevent stacking multiple typing bubbles
        isTyping = true;
        const typing = document.createElement("div");
        typing.id = "typing";
        typing.classList.add("ai-msg", "bot");
        typing.innerHTML = `<div class="msg-row"><div class="msg-text"><div class="typing"><span></span><span></span><span></span></div></div></div>`;
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping(){
        const typing = document.getElementById("typing");
        if(typing) typing.remove();
        isTyping = false;
    }

    function welcomeMessage(){
        addMessage("Hi! I'm DarshBot, Hema's Portfolio Assistant 👽.<br><br>Ask me about:<br>&bull; Skills<br>&bull; Projects<br>&bull; Experience<br>&bull; Contact", "bot");
    }

    const smartReplies = [
        { keywords: ["why hire", "why should we hire"], reply: "Hemadharshini is an AI-focused MCA student with strong practical project experience and real-world implementation skills." },
        { keywords: ["introduce", "about you"], reply: "Hemadharshini is an AI-focused MCA student skilled in Python, ML, and Web Development with multiple real-time projects." }
    ];

    function getSmartReply(text){
        for(let item of smartReplies){
            for(let k of item.keywords){
                if(text.includes(k) || k.includes(text)){
                    return item.reply;
                }
            }
        }
        return null;
    }

    // Central reply engine – returns a response string for any user input
    function getBotReply(userText){

        // Smart (keyword-phrase) replies first
        const smart = getSmartReply(userText);
        if(smart) return smart;

        // Greetings
        if(userText.includes("hi") || userText.includes("hello") || userText.includes("hai")){
            return "Hello! 😊 What can I help you with today?";
        }
        if(userText.includes("bye") || userText.includes("goodbye")){
            return "Goodbye!👋Feel free to return anytime.";
        }

        // Skills
        if(userText.includes("skill")){
            lastTopic = "skills";
            return "Hemadharshini's key skills include:<br><br><b>Technical:</b><br>&bull; Python, Flask, Streamlit<br>&bull; JavaScript, HTML, CSS, PHP<br>&bull; SQL, MySQL, Bootstrap<br><br><b>AI / ML:</b><br>&bull; Machine Learning, NLP, CNN<br>&bull; OpenCV, MARL, PyTorch, DQN<br><br><b>Tools:</b><br>&bull; Git, Power BI, MS Excel, WordPress, AI Tools";
        }

        // Experience
        else if(userText.includes("experience") || userText.includes("internship") || userText.includes("intern")){
            lastTopic = "experience";
            return "Hemadharshini's internship experience:<br><br>&bull; <b>SD Pro Solutions</b> &ndash; AI Intern (Jan&ndash;Mar 2026)<br>&nbsp;&nbsp;Worked on MARL Drone Swarm Coordination<br><br>&bull; <b>E-Soft IT Solutions</b> &ndash; Web Dev Intern (Jun&ndash;Jul 2025)<br>&nbsp;&nbsp;HTML, CSS, JS, PHP &amp; MySQL<br><br>&bull; <b>HI Core Tech</b> &ndash; Online Training (May 2025)<br>&nbsp;&nbsp;HTML, CSS, Python<br><br>&bull; <b>MSME</b> &ndash; AI Virtual Training (2025)<br>&nbsp;&nbsp;AI fundamentals &amp; Machine Learning";
        }

        // Contact
        else if(userText.includes("contact") || userText.includes("email") || userText.includes("phone") || userText.includes("reach")){
            lastTopic = "contact";
            return "You can reach Hemadharshini through:<br><br>&#x1F4E7; <b>Email:</b> darshinihema2102@gmail.com<br>&#x1F4DE; <b>Phone:</b> +91 70923 89282<br>&#x1F4BC; <b>LinkedIn:</b> linkedin.com/in/hemadharshini21<br>&#x1F4CD; <b>Location:</b> Thuraiyur, Trichy, Tamil Nadu";
        }

        // GitHub
        else if(userText.includes("github") || userText.includes("repo") || userText.includes("repository")){
            lastTopic = "github";
            return "Explore all open-source work on GitHub: 👇<br><br><a href='https://github.com/hemaxplore' target='_blank' style='color:#7c6aff;font-weight:600;'>&#x1F419; github.com/hemaxplore</a>";
        }

        // Individual projects – checked BEFORE the generic "project" catch-all
        else if(userText.includes("voxira")){
            lastTopic = "voxira";
            return "🎙️ <b>Voxira AI – Speech Intelligence Platform</b><br><br>Voxira is an advanced AI platform that converts spoken audio into accurate text and translates it across multiple languages in real time.<br><br>🔹 Upload audio files or paste YouTube links<br>🔹 Multilingual transcription using OpenAI Whisper<br>🔹 Secure user login with session history<br>🔹 Download transcripts as text files<br>🔹 Clean Streamlit dashboard UI<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("ats") || userText.includes("resume")){
            lastTopic = "ats";
            return "📄 <b>AI ATS Resume Analyzer</b><br><br>An intelligent resume screening tool that evaluates your resume against a job description — just like real Applicant Tracking Systems used by top companies.<br><br>🔹 Calculates ATS compatibility score (0–100%)<br>🔹 Detects missing keywords and skill gaps<br>🔹 Highlights strengths and improvement areas<br>🔹 Predicts hiring confidence percentage<br>🔹 Supports PDF & DOCX resume uploads<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("thought web") || userText.includes("thought")){
            lastTopic = "thought";
            return "🧠 <b>Thought Web – Personal Knowledge App</b><br><br>A minimalist personal productivity app to capture, tag, and revisit thoughts, ideas, and notes — built for a clean, distraction-free writing experience.<br><br>🔹 Create, edit & delete thought entries<br>🔹 Tag-based filtering and search<br>🔹 Persistent local storage (no login needed)<br>🔹 Responsive design for mobile & desktop<br>🔹 Hosted on GitHub Pages<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("animal") || userText.includes("grazing")){
            lastTopic = "animal";
            return "🐄 <b>Animal Grazing Detection System</b><br><br>A real-time computer vision system that automatically detects animals in video footage and analyzes their gaze direction — useful for smart farming and livestock monitoring.<br><br>🔹 Real-time animal detection via webcam or video<br>🔹 Gaze direction analysis (left/right/forward)<br>🔹 Alert system when animals stray from boundary<br>🔹 Processes live camera feeds efficiently<br>🔹 High accuracy with custom-trained YOLO model<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("attendance")){
            lastTopic = "attendance";
            return "🏢 <b>Employee Online Attendance System</b><br><br>A full-stack web application for managing employee attendance with secure role-based access — built for companies to track check-ins, leave, and auto-generate reports.<br><br>🔹 Role-based login: Admin, Manager & Employee<br>🔹 Real-time clock-in / clock-out tracking<br>🔹 Leave request & approval workflow<br>🔹 Auto-generated monthly attendance reports<br>🔹 Admin dashboard with analytics<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("drone") || userText.includes("swarm") || userText.includes("marl")){
            lastTopic = "drone";
            return "🚁 <b>Autonomous Drone Swarm Coordination</b><br><br>A cutting-edge research project using Multi-Agent Reinforcement Learning (MARL) where multiple drones learn to coordinate, navigate, and avoid obstacles without human control.<br><br>🔹 Decentralized multi-agent decision making<br>🔹 DQN-based training for obstacle avoidance<br>🔹 Simulated 3D environment with dynamic obstacles<br>🔹 Agents share partial observations & learn cooperatively<br>🔹 Built during internship at SD Pro Solutions (Jan–Mar 2026)<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("placement") || userText.includes("college placement")){
            lastTopic = "placement";
            return "🎓 <b>College Placement Prediction Dashboard</b><br><br>An interactive dashboard that predicts a student's placement chances based on academic and extracurricular inputs — helping students identify and improve weak areas.<br><br>🔹 Inputs: CGPA, skills, projects, internships, backlogs<br>🔹 Weighted rule-based scoring engine<br>🔹 Visual score breakdown with color indicators<br>🔹 Actionable improvement suggestions<br>🔹 Extendable to ML model predictions<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }
        else if(userText.includes("chatbot") || userText.includes("student assistant")){
            lastTopic = "chatbot";
            return "🤖 <b>Student Assistant Chatbot</b><br><br>An AI-powered conversational chatbot designed for college students to get instant help with exam schedules, fees, attendance queries, and campus information.<br><br>🔹 Natural language query understanding<br>🔹 Covers: exams, fees, attendance, holidays, results<br>🔹 Admin panel to update FAQs dynamically<br>🔹 Session-based conversation memory<br>🔹 Clean responsive chat UI<br><br>Type <b>'explain more'</b> to see the full tech stack.";
        }

        // Generic projects list
        else if(userText.includes("project")){
            lastTopic = "projects";
            return "💼 <b>Hemadharshini's Projects</b><br><br>🚁 Autonomous Drone Swarm Coordination (MARL)<br>🎓 College Placement Prediction Dashboard<br>🎙️ Voxira AI Speech Platform<br>📄 AI ATS Resume Analyzer<br>🧠 Thought Web – Knowledge App<br>🤖 Student Assistant Chatbot<br>🐄 Animal Grazing Detection System<br>🏢 Employee Online Attendance System<br><br>Ask about any project for full details!";
        }

        // "Explain more" – rich tech stack descriptions
        else if(userText.includes("more") || userText.includes("explain") || userText.includes("detail") || userText.includes("tech")){
            if(lastTopic === "voxira")
                return "🛠️ <b>Voxira AI – Tech Stack</b><br><br>🔹 <b>Language:</b> Python 3.10<br>🔹 <b>UI:</b> Streamlit<br>🔹 <b>Speech-to-Text:</b> OpenAI Whisper API<br>🔹 <b>Translation:</b> Google Translate API / Deep Translator<br>🔹 <b>Audio Processing:</b> pydub, librosa<br>🔹 <b>YouTube Input:</b> yt-dlp<br>🔹 <b>Auth & Sessions:</b> Streamlit session state<br>🔹 <b>Deployment:</b> Streamlit Cloud";
            if(lastTopic === "ats")
                return "🛠️ <b>ATS Analyzer – Tech Stack</b><br><br>🔹 <b>Language:</b> Python 3.10<br>🔹 <b>UI:</b> Streamlit<br>🔹 <b>NLP:</b> spaCy, NLTK<br>🔹 <b>PDF Parsing:</b> PyMuPDF / pdfminer<br>🔹 <b>Keyword Matching:</b> TF-IDF, cosine similarity<br>🔹 <b>ML Model:</b> Scikit-learn (Logistic Regression)<br>🔹 <b>Visualization:</b> Matplotlib, Plotly<br>🔹 <b>Deployment:</b> Streamlit Cloud";
            if(lastTopic === "thought")
                return "🛠️ <b>Thought Web – Tech Stack</b><br><br>🔹 <b>Frontend:</b> HTML5, CSS3, JavaScript (ES6)<br>🔹 <b>Storage:</b> LocalStorage API<br>🔹 <b>Styling:</b> Custom CSS with CSS Variables<br>🔹 <b>Icons:</b> Font Awesome<br>🔹 <b>Hosting:</b> GitHub Pages<br>🔹 <b>Version Control:</b> Git & GitHub";
            if(lastTopic === "animal")
                return "🛠️ <b>Animal Grazing Detection – Tech Stack</b><br><br>🔹 <b>Language:</b> Python 3.9<br>🔹 <b>Computer Vision:</b> OpenCV<br>🔹 <b>Object Detection:</b> YOLOv8 (custom trained)<br>🔹 <b>Deep Learning:</b> PyTorch<br>🔹 <b>Gaze Estimation:</b> MediaPipe / custom CNN<br>🔹 <b>Dataset:</b> Custom-labeled livestock dataset<br>🔹 <b>Video Processing:</b> FFmpeg";
            if(lastTopic === "attendance")
                return "🛠️ <b>Attendance System – Tech Stack</b><br><br>🔹 <b>Frontend:</b> HTML5, CSS3, JavaScript<br>🔹 <b>Backend:</b> PHP 8<br>🔹 <b>Database:</b> MySQL (via phpMyAdmin)<br>🔹 <b>Auth:</b> PHP Sessions with role management<br>🔹 <b>Reports:</b> CSV export & print view<br>🔹 <b>Hosting:</b> XAMPP (local) / cPanel (production)";
            if(lastTopic === "drone")
                return "🛠️ <b>Drone Swarm – Tech Stack</b><br><br>🔹 <b>Language:</b> Python 3.10<br>🔹 <b>RL Framework:</b> PyTorch, Stable-Baselines3<br>🔹 <b>Algorithm:</b> DQN (Deep Q-Network), MADDPG<br>🔹 <b>Simulation:</b> Custom 3D grid environment<br>🔹 <b>Multi-Agent:</b> PettingZoo / custom MARL env<br>🔹 <b>Visualization:</b> Matplotlib, Pygame<br>🔹 <b>Research Context:</b> SD Pro Solutions Internship 2026";
            if(lastTopic === "placement")
                return "🛠️ <b>Placement Dashboard – Tech Stack</b><br><br>🔹 <b>Frontend:</b> HTML5, CSS3, JavaScript (ES6)<br>🔹 <b>Scoring Engine:</b> Weighted rule-based algorithm<br>🔹 <b>Charts:</b> Chart.js for visual score breakdown<br>🔹 <b>Data:</b> JSON-based student profile schema<br>🔹 <b>Future Plan:</b> Scikit-learn ML model + SHAP explainability<br>🔹 <b>Hosting:</b> GitHub Pages";
            if(lastTopic === "chatbot")
                return "🛠️ <b>Student Chatbot – Tech Stack</b><br><br>🔹 <b>Language:</b> Python 3.9<br>🔹 <b>Framework:</b> Flask (REST API backend)<br>🔹 <b>NLP:</b> Keyword matching + intent classification<br>🔹 <b>Database:</b> MySQL (FAQs, user sessions)<br>🔹 <b>Frontend:</b> HTML, CSS, JavaScript<br>🔹 <b>Admin Panel:</b> Flask-Admin for FAQ management<br>🔹 <b>Hosting:</b> PythonAnywhere";
            if(lastTopic === "skills")
                return "💡 <b>Hemadharshini's Full Skill Set</b><br><br>🔹 <b>Languages:</b> Python, JavaScript, PHP, SQL, HTML, CSS<br>🔹 <b>Frameworks:</b> Flask, Streamlit, Bootstrap<br>🔹 <b>AI/ML:</b> Scikit-learn, PyTorch, OpenCV, YOLOv8, MARL<br>🔹 <b>NLP:</b> spaCy, NLTK, Whisper API, TF-IDF<br>🔹 <b>Database:</b> MySQL, SQLite, LocalStorage<br>🔹 <b>Tools:</b> Git, GitHub, VS Code, XAMPP, Power BI<br>🔹 <b>Cloud:</b> Streamlit Cloud, GitHub Pages, PythonAnywhere";
            if(lastTopic === "experience")
                return "💼 <b>Internship – SD Pro Solutions</b><br><br>🔹 <b>Duration:</b> January – March 2026 (3 months)<br>🔹 <b>Role:</b> AI/ML Research Intern<br>🔹 <b>Project:</b> Autonomous Drone Swarm Coordination<br>🔹 <b>Work:</b> Designed MARL environment, trained DQN agents, implemented obstacle avoidance & cooperative navigation<br>🔹 <b>Tools:</b> Python, PyTorch, Stable-Baselines3, PettingZoo<br>🔹 <b>Outcome:</b> Achieved stable multi-agent coordination in dynamic simulation environments";
            return "Please ask about a specific project or topic first! Try: <b>Voxira, ATS, Drone, Attendance, Chatbot, Skills</b> or <b>Experience</b>.";
        }

        else {
            return "I'm not sure about that. Try asking about <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>contact</b>, or a specific project like Voxira, ATS, or Drone Swarm!";
        }

    }

    // Bot open – fixed bottom-right, click to open chat
    if(botButton && botChat && messages) {
        botButton.onclick = function() {
            botChat.style.display = 'flex';
            botButton.style.display = 'none';
            if(!messages.dataset.welcome) {
                messages.dataset.welcome = 'true';
                welcomeMessage();
            }
        };
    }

    // Bot close (X button)
    if(botClose && botButton && botChat) {
        botClose.onclick = function() {
            botChat.style.display = 'none';
            botButton.style.display = 'flex';
        };
    }

    // Close chat when clicking anywhere OUTSIDE the chat box or bot button
    document.addEventListener('click', function(e) {
        if(!botChat || botChat.style.display === 'none') return;
        // If click is inside the chat box OR on the bot button, do nothing
        if(botChat.contains(e.target) || (botButton && botButton.contains(e.target))) return;
        botChat.style.display = 'none';
        if(botButton) botButton.style.display = 'flex';
    });

    // Shared send handler – used by send button, Enter key, and quick-action buttons
    function handleSend(rawText){
        if(!rawText || rawText.trim() === "") return;
        const userText = rawText.trim().toLowerCase();

        addMessage(rawText.trim(), "user");
        if(input) input.value = "";
        showTyping();

        setTimeout(() => {
            removeTyping();
            const reply = getBotReply(userText);
            addMessage(reply, "bot");
        }, 1200 + Math.random() * 800);
    }

    if(send && input && messages){
        send.onclick = function(){
            handleSend(input.value);
        };

        input.addEventListener("keypress", function(e){
            if(e.key === "Enter"){
                handleSend(input.value);
            }
        });
    }

    // FIX: Quick-action buttons (Skills, Projects, Experience, Contact) were never wired up
    document.querySelectorAll(".quick-btn").forEach(btn => {
        btn.addEventListener("click", function(){
            const query = this.dataset.query;
            if(query) handleSend(query);
        });
    });

    // 4. SEND MESSAGE FORM
    const form = document.getElementById("contact-form");
    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();
            const btn = document.querySelector(".send-btn");
            if (btn) {
                btn.disabled = true;
                btn.innerText = "Sending...";
            }

            const params = {
                name: form.name.value,
                phone: form.phone.value,
                email: form.email.value,
                message: form.message.value
            };

            emailjs.send("service_pdwyzfw", "template_txioa7m", params)
            .then(() => {
                showToast();
                form.reset();
            })
            .catch(err => {
                console.error(err);
                alert("Message failed, please try again.");
            })
            .finally(() => {
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = "Send Message";
                }
            });
        });
    }

    // ================= MOBILE NAVBAR =================
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-links");
    const overlay = document.getElementById("overlay");

    if (toggle && nav && overlay) {

        function closeMenu() {
            nav.classList.remove("active");
            overlay.classList.remove("active");
            toggle.textContent = "☰";
        }

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("active");
            overlay.classList.toggle("active");
            toggle.textContent = isOpen ? "✖" : "☰";
        });

        overlay.addEventListener("click", closeMenu);

        document.querySelectorAll("#nav-links a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    // ================= SMOOTH SCROLL (moved inside DOMContentLoaded) =================
    document.querySelectorAll("#nav-links a").forEach(link => {
        link.addEventListener("click", function(e){
            const targetId = this.getAttribute("href");
            if(targetId && targetId.startsWith("#")){
                e.preventDefault();
                const target = document.querySelector(targetId);
                if(target){
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

});


// ================= NAVBAR SCROLL =================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if(!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ================= ACTIVE NAV ====================
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll("#nav-links a");
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if(window.scrollY >= top){
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
});