const API_KEY = "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"; // ❌ غير آمن

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  addMessage("... يفكر", "bot");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-o4-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: msg }
      ]
    })
  });

  const data = await res.json();
  document.querySelector(".bot:last-child").textContent =
    data.choices[0].message.content;
}
