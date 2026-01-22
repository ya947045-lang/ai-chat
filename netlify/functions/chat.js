const API_KEY = "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"; // للتجربة فقط

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  addMessage("... يفكر", "bot");

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-o4-mini",
      input: msg
    })
  });

  const data = await res.json();

  // استخراج الرد الصح
  const reply = data.output[0].content[0].text;

  document.querySelector(".bot:last-child").textContent = reply;
}
