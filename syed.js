const form = document.getElementById("chat-form"); 
const input = document.getElementById("chat-input"); 
const messages = document.getElementById("chat-messages"); 

// Speech Synthesis Initialization 
const synth = window.speechSynthesis; 
// Voice Recognition Initialization 
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition 
|| window.mozSpeechRecognition || window.msSpeechRecognition)(); 
recognition.lang = "en-US"; 
recognition.interimResults = false; 
recognition.maxAlternatives = 1; 
// Function to speak the response 
function speak(text) { 
const utterance = new SpeechSynthesisUtterance(text); 
synth.speak(utterance); 
} 
// Event listener for form submission 
form.addEventListener("submit", async (e) => { 
e.preventDefault(); 
const message = input.value; 
input.value = "";
messages.innerHTML += `<div class="message user-message"> 
<img src="images/user1.png" alt="user icon"> <span>${message}</span> 
</div>`; 

// Use axios library to make a POST request to the OpenAI API 
const response = await axios.post( 
  "https://api.openai.com/v1/completions", 
  { 
    prompt: message, 
    model: "text-davinci-003", 
    temperature: 0, 
    max_tokens: 1000, 
    top_p: 1, 
    frequency_penalty: 0.0, 
    presence_penalty: 0.0, 
  }, 
  { 
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${kk}`, 
    }, 
  } 
); 
const chatbotResponse = response.data.choices[0].text; 

messages.innerHTML += `<div class="message bot-message"> 
<img src="/images/bot.png" alt="bot icon"> <span>${chatbotResponse}</span> 
</div>`;
// Speak the chatbot's response 
speak(chatbotResponse); 
}); 
// Event listener for voice recognition 
recognition.addEventListener("result", (e) => { 
const transcript = e.results[0][0].transcript; 
input.value = transcript; 
}); 
// Event listener for voice recognition error 
recognition.addEventListener("error", (e) => { 
console.error("Voice recognition error:", e.error); 
}); 
// Event listener for voice recognition start 
recognition.addEventListener("start", () => { 
console.log("Voice recognition started"); 
}); 
// Event listener for voice recognition end 
recognition.addEventListener("end", () => { 
console.log("Voice recognition ended"); 
}); 
// Start voice recognition 
function startVoiceRecognition() { 
recognition.start();
} 
// Stop voice recognition 
function stopVoiceRecognition() { 
recognition.stop(); 
}