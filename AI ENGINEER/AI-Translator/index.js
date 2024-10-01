import OpenAI from "openai";

const translateBtn = document.getElementById("translate-btn");
const translateInput = document.getElementById("translate-input");
const loader = document.getElementById("loader");
const modal = document.getElementById("result-modal");
const translatedText = document.getElementById("translated-text");
const startOverBtn = document.getElementById("start-over-btn");

translateBtn.addEventListener("click", handleTranslation);
startOverBtn.addEventListener("click", startOver);

async function handleTranslation() {
  const text = translateInput.value.trim();
  const selectedLanguage = document.querySelector('input[name="language"]:checked')?.value;

  if (!text || !selectedLanguage) {
    alert("Please enter text and select a language.");
    return;
  }

  translateBtn.disabled = true;
  loader.style.display = "flex";

  try {
    const translation = await fetchTranslation(text, selectedLanguage);
    displayTranslation(translation);
  } catch (error) {
    console.error("Translation error:", error);
    alert("An error occurred. Please try again.");
  } finally {
    translateBtn.disabled = false;
    loader.style.display = "none";
  }
}

async function fetchTranslation(text, language) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a highly skilled translator. Translate the given text into the specified language in a fluent and natural style."
      },
      {
        role: "user",
        content: `Translate the following text into ${language}: ${text}`
      }
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  return response.choices[0].message.content;
}

function displayTranslation(translation) {
  translatedText.textContent = translation;
  modal.style.display = "block";
}

function startOver() {
  translateInput.value = "";
  document.querySelector('input[name="language"]:checked').checked = false;
  modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}