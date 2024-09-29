import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  {
    role: "system",
    content: "",
  },
  {
    role: "user",
    content: "Who invented the first TV",
  },
];

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: messages,
  temperature: 1,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  response_format: {
    type: "text",
  },
});

console.log(response.choices[0].message.content);
