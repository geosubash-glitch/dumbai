document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const headerStatus = document.querySelector('.header-info p');

    // Focus input on load
    userInput.focus();

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const messageText = userInput.value.trim();
        if (!messageText) return;

        // 1. Add User Message
        appendUserMessage(messageText);
        userInput.value = '';

        // 2. Change header status to "Typing..." after they've "read" the message
        setTimeout(() => {
            headerStatus.textContent = 'Typing...';
            headerStatus.classList.add('typing');
            
            // 3. Show Typing Indicator
            const typingId = showTypingIndicator();

            // 4. Simulate AI thinking delay and send bot response
            const randomDelay = 1500;
            setTimeout(() => {
                removeTypingIndicator(typingId);
                headerStatus.textContent = 'Online';
                headerStatus.classList.remove('typing');
                
                const reply = getAwareReply(messageText);
                appendBotMessage(reply);
            }, randomDelay);
        }, 1200); // Wait 1.2s before typing starts
    });

    function getAwareReply(text) {
        const replies = ["I think so", "agree", "hmmm", "guess what", "forgot"];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    function appendUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textElement = document.createElement('p');
        textElement.textContent = text;
        
        contentDiv.appendChild(textElement);
        messageDiv.appendChild(contentDiv);
        
        // Add "Delivered" text
        const statusDiv = document.createElement('span');
        statusDiv.className = 'message-status';
        statusDiv.textContent = 'Delivered';
        messageDiv.appendChild(statusDiv);

        chatBox.appendChild(messageDiv);
        scrollToBottom();

        // Simulate "Read Receipt"
        setTimeout(() => {
            statusDiv.textContent = 'Read';
            statusDiv.classList.add('read');
        }, 800);
    }

    function appendBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textElement = document.createElement('p');
        textElement.textContent = text;
        
        contentDiv.appendChild(textElement);
        messageDiv.appendChild(contentDiv);
        
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.id = id;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            contentDiv.appendChild(document.createElement('span'));
        }
        
        messageDiv.appendChild(contentDiv);
        chatBox.appendChild(messageDiv);
        scrollToBottom();
        
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
