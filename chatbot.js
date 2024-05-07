// Selecting necessary DOM elements
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbot = document.querySelector(".chatbot");

// Retrieving user's name, personality traits, and hobbies from localStorage
var aiName = localStorage.getItem("ai_name");
var selectedPersonality = JSON.parse(localStorage.getItem("selectedPersonality"));
var selectedHobbies = JSON.parse(localStorage.getItem("selectedHobbies"));

let userMessage = null;
const API_KEY = "sk-proj-ywhmZpx2VEillkD7w66LT3BlbkFJ69fNCmq9fslukcsaApGr"; // API key for OpenAI
const inputInitHeight = chatInput.scrollHeight;

// Function to create a new chat message element
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = "";
    if (className === "outgoing") {
        chatContent = `<p>${message}</p>`;
    } else {
        chatContent = `<p>${aiName}: ${message}</p>`; // Set the chat content to AI's response
    }
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Function to generate AI's response using OpenAI API
const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON content type
            "Authorization": `Bearer ${API_KEY}` // Authorization header with API key
        },
        body: JSON.stringify({
            model: "gpt-4-1106-preview", // OpenAI model name
            messages: [{role: "system", content: "Act as a friend. Your name is " + aiName + ". Your personality traits are " 
                        + selectedPersonality + ". Your hobbies are " + selectedHobbies + ". Respond with no more than two sentences."}, 
            {role: "user", content: userMessage}], // Messages to send to OpenAI
        }) 
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = `${localStorage.getItem("ai_name")}: ${data.choices[0].message.content.trim()}`;
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

// Function to handle user's message input
const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbot.scrollTo(0, chatbot.scrollHeight);
    
    // Generate AI's response after a delay
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbot.scrollTo(0, chatbot.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

// Event listener for input event on textarea to adjust its height dynamically
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Event listener for keydown event on textarea to handle sending message on Enter key press
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

// Event listener for click event on send button to handle sending message
sendChatBtn.addEventListener("click", handleChat);