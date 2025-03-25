// ./components/services/Chatbot.jsx
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Chatbot = () => {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.REACT_APP_N8N_URL, // Reemplaza con la URL de tu webhook
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'es',
      initialMessages: [
        '¡Hola! 👋',
        'Mi nombre es Juan. ¿En qué puedo ayudarte hoy?'
      ],
      i18n: {
        es: {
          title: 'Asistente Virtual',
          subtitle: 'Inicia una conversación. Estamos aquí para ayudarte 24/7.',
          footer: '',
          getStarted: 'Nueva Conversación',
          inputPlaceholder: 'Escribe tu pregunta...',
        },
      },
    });
    console.log(process.env.REACT_APP_N8N_URL);
  }, []);

  return <div id="n8n-chat" />;
};

export default Chatbot;
