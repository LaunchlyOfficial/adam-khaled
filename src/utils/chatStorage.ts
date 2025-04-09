import { ref, push, query, orderByChild, get } from 'firebase/database';
import { database } from '../config/firebase';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  userName?: string;
  messageId: string;
}

export const saveChatMessage = async (message: Omit<ChatMessage, 'messageId'>) => {
  try {
    const chatRef = ref(database, 'chatbot/messages');
    const newMessageRef = await push(chatRef, {
      ...message,
      timestamp: Date.now()
    });
    return newMessageRef.key;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

export const getChatHistory = async (userName: string) => {
  try {
    const chatRef = ref(database, 'chatbot/messages');
    const messagesQuery = query(chatRef, orderByChild('userName'));
    const snapshot = await get(messagesQuery);
    
    const messages: ChatMessage[] = [];
    snapshot.forEach((childSnapshot) => {
      const message = childSnapshot.val();
      if (message.userName === userName) {
        messages.push({
          ...message,
          messageId: childSnapshot.key || ''
        });
      }
    });
    
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};