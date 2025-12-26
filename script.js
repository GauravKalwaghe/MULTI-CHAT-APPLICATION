/* Firebase imports */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/* Your Firebase Configuration */
const firebaseConfig = {
  apiKey: "AIzaSyC41h11na1cX1Q3DidQ_b5skWAuPYyZVkM",
  authDomain: "chat-application-d6780.firebaseapp.com",
  databaseURL: "https://chat-application-d6780-default-rtdb.firebaseio.com",
  projectId: "chat-application-d6780",
  storageBucket: "chat-application-d6780.firebasestorage.app",
  messagingSenderId: "1021421803002",
  appId: "1:1021421803002:web:1b96a9b233f8fa01210043"
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Initialize Database */
const database = getDatabase(app);
const messagesRef = ref(database, "messages");

/* Send Message */
document.getElementById("sendBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const message = document.getElementById("messageInput").value;

    if (username === "" || message === "") {
        alert("Please enter name and message");
        return;
    }

    push(messagesRef, {
        name: username,
        text: message
    });

    document.getElementById("messageInput").value = "";
});

/* Receive Messages (Real-Time) */
onChildAdded(messagesRef, (snapshot) => {
    const data = snapshot.val();

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = data.name + ": " + data.text;

    document.getElementById("messages").appendChild(messageDiv);
});
