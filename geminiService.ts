
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { ChatMessage } from "../types";
import { AI_SYSTEM_PROMPT, GEMINI_CHAT_MODEL } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Make sure API_KEY environment variable is set.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
let chatInstance: Chat | null = null;

const getChatInstance = (): Chat | null => {
  if (!ai) return null;
  if (!chatInstance) {
    chatInstance = ai.chats.create({
      model: GEMINI_CHAT_MODEL,
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
        // For low latency in chat, consider disabling thinking.
        // thinkingConfig: { thinkingBudget: 0 } 
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  if (!ai) {
    return "AI service is unavailable. API key might be missing.";
  }

  const chat = getChatInstance();
  if (!chat) {
     return "AI chat could not be initialized.";
  }

  // Reconstruct history for Gemini if needed, or use chat.sendMessage directly with new message
  // For simplicity with chat.sendMessage, it maintains its own history.
  // We can rebuild chat history if we need more control or switch instances often.
  // For now, just send the new message.
  
  try {
    // If we want to send full history each time, we'd use ai.models.generateContent
    // const contents = history.map(msg => ({
    //   role: msg.role === 'assistant' ? 'model' : msg.role, // Gemini uses 'model' for assistant
    //   parts: [{ text: msg.content }]
    // }));
    // contents.push({ role: 'user', parts: [{ text: newMessage }] });

    // const response: GenerateContentResponse = await ai.models.generateContent({
    //   model: GEMINI_CHAT_MODEL,
    //   contents: contents,
    //   systemInstruction: { role: 'system', parts: [{text: AI_SYSTEM_PROMPT}] },
    // });

    // Using the chat instance:
    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error) {
        return `Error communicating with AI: ${error.message}`;
    }
    return "An unknown error occurred while communicating with AI.";
  }
};

export const resetChat = () => {
  chatInstance = null; // This will cause a new chat to be created on next message
};


// Example of streaming, if needed in the future:
export const sendMessageToGeminiStream = async (
  message: string,
  onChunk: (chunkText: string) => void,
  onError: (errorMsg: string) => void
): Promise<void> => {
  if (!ai) {
    onError("AI service is unavailable. API key might be missing.");
    return;
  }
  const chat = getChatInstance();
  if (!chat) {
     onError("AI chat could not be initialized.");
     return;
  }

  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Error streaming message from Gemini:", error);
    if (error instanceof Error) {
        onError(`Error streaming from AI: ${error.message}`);
    }
    onError("An unknown error occurred while streaming from AI.");
  }
};
