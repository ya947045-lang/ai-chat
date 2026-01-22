const chatBox = document.getElementById("chat-box");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("... يفكر", "bot");

  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  chatBox.lastChild.textContent = data.reply;
}
