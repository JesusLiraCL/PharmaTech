document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const chatOpenButton = document.getElementById('chat-open-button');
    const chatModal = document.getElementById('chat-modal');
    const chatCloseButton = document.getElementById('chat-close-button');
    const openChatHeroButton = document.getElementById('open-chat-hero');

    const openChat = () => {
        chatModal.classList.remove('hidden');
        chatOpenButton.classList.add('hidden');
        if (document.getElementById('chat-messages').children.length === 0) {
           addBotMessage('¡Hola! Soy tu asistente virtual de PharmaTech. ¿Cómo puedo ayudarte hoy? Puedes preguntarme por productos o hacer un pedido.');
        }
    };
    
    const closeChat = () => {
        chatModal.classList.add('hidden');
        chatOpenButton.classList.remove('hidden');
    };

    if (chatOpenButton) chatOpenButton.addEventListener('click', openChat);
    if (openChatHeroButton) openChatHeroButton.addEventListener('click', openChat);
    if (chatCloseButton) chatCloseButton.addEventListener('click', closeChat);

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'flex justify-end';
        messageElement.innerHTML = `<div class="chat-bubble-user rounded-xl py-2 px-4 max-w-xs">${message}</div>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(message) {
         const messageElement = document.createElement('div');
        messageElement.className = 'flex justify-start';
        messageElement.innerHTML = `<div class="chat-bubble-bot rounded-xl py-2 px-4 max-w-xs">${message}</div>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatForm) chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addUserMessage(userMessage);
            chatInput.value = '';
            setTimeout(() => {
                handleBotResponse(userMessage);
            }, 1000);
        }
    });

    function handleBotResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();
        let botResponse = "No estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta? Puedo ayudarte a buscar productos o a tomar tu pedido.";

        if (lowerCaseInput.includes('hola') || lowerCaseInput.includes('buenos dias')) {
            botResponse = "¡Hola! ¿En qué puedo ayudarte?";
        } else if (lowerCaseInput.includes('pedido') || lowerCaseInput.includes('ordenar')) {
            botResponse = "¡Claro! Para hacer tu pedido, por favor dime qué productos necesitas y la cantidad. Por ejemplo: 'Necesito 2 cajas de paracetamol y 1 protector solar'.";
        } else if (lowerCaseInput.includes('vitamina') || lowerCaseInput.includes('suplemento')) {
            botResponse = "Tenemos una amplia gama de vitaminas y suplementos. ¿Buscas alguna en específico?";
        } else if (lowerCaseInput.includes('gracias')) {
            botResponse = "¡De nada! Estoy aquí para ayudarte cuando lo necesites.";
        } else if (lowerCaseInput.includes('adios')) {
            botResponse = "¡Que tengas un buen día! No dudes en volver si necesitas algo más.";
        } else if (lowerCaseInput.includes('horario')) {
            botResponse = "Nuestro horario de atención es [Horario de atención de la farmacia].";
        }

        addBotMessage(botResponse);
    }
});
