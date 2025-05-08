class AICareerAdvisor {
    constructor() {
        this.API_URL = 'https://router.huggingface.co/novita/v3/openai/chat/completions';
        this.API_KEY = ''; // Will be set via environment variable
        this.model = 'deepseek/deepseek-v3-0324';
        this.conversationHistory = [];
    }

    async initialize() {
        // Load the API key from environment
        this.API_KEY = await this.getApiKey();
        this.createChatInterface();
        this.setupEventListeners();
    }

    createChatInterface() {
        // Add marked.js for markdown parsing
        if (!document.getElementById('marked-script')) {
            const script = document.createElement('script');
            script.id = 'marked-script';
            script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            document.head.appendChild(script);
        }

        const chatContainer = document.createElement('div');
        chatContainer.className = 'ai-advisor-container';
        chatContainer.innerHTML = `
            <div class="ai-advisor-header">
                <h3>AI Career Advisor 🤖</h3>
                <p class="ai-subtitle">Ask me anything about Jonathan's skills and experience!</p>
                <button class="minimize-btn" id="aiMinimizeBtn" title="Minimize/Maximize">−</button>
            </div>
            <div class="ai-chat-messages" id="aiMessages"></div>
            <div class="ai-input-container">
                <input type="text" id="aiInput" placeholder="Ask about my skills, projects, or experience...">
                <button id="aiSendBtn">Ask</button>
            </div>
        `;
        document.body.appendChild(chatContainer);
        
        // Store container reference
        this.container = chatContainer;
    }

    setupEventListeners() {
        const input = document.getElementById('aiInput');
        const sendBtn = document.getElementById('aiSendBtn');
        const minimizeBtn = document.getElementById('aiMinimizeBtn');

        if (!input || !sendBtn || !minimizeBtn) {
            console.error('Could not find chat interface elements');
            return;
        }

        const handleSend = () => {
            const message = input.value.trim();
            if (message) {
                // Disable input and button while processing
                input.disabled = true;
                sendBtn.disabled = true;
                sendBtn.style.opacity = '0.7';
                
                this.processUserMessage(message).finally(() => {
                    // Re-enable input and button after processing
                    input.disabled = false;
                    sendBtn.disabled = false;
                    sendBtn.style.opacity = '1';
                    input.value = '';
                    input.focus();
                });
            }
        };

        const handleMinimize = () => {
            const isMinimized = this.container.classList.toggle('minimized');
            minimizeBtn.textContent = isMinimized ? '+' : '−';
            minimizeBtn.title = isMinimized ? 'Maximize' : 'Minimize';
            
            // Save state to localStorage
            localStorage.setItem('aiAdvisorMinimized', isMinimized);
        };

        // Restore previous state
        const wasMinimized = localStorage.getItem('aiAdvisorMinimized') === 'true';
        if (wasMinimized) {
            this.container.classList.add('minimized');
            minimizeBtn.textContent = '+';
            minimizeBtn.title = 'Maximize';
        }

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
        minimizeBtn.addEventListener('click', handleMinimize);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="loading-spinner"></div>
            AI is thinking<span>.</span><span>.</span><span>.</span>
        `;
        document.getElementById('aiMessages').appendChild(indicator);
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async processUserMessage(message) {
        this.addMessageToChat('user', message);
        this.showTypingIndicator();

        const context = `You are an AI assistant representing Jonathan, a skilled software engineer. 
                        Respond professionally about his skills, projects, and experience. 
                        Keep responses concise and highlight his expertise in AI/ML and web development.`;

        const messages = [
            { role: "system", content: context },
            ...this.conversationHistory,
            { role: "user", content: message }
        ];

        try {
            // Ensure typing indicator shows for at least 1 second
            const [response] = await Promise.all([
                this.callHuggingFaceAPI(messages),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            this.removeTypingIndicator();
            this.addMessageToChat('ai', response);
            this.conversationHistory.push(
                { role: "user", content: message },
                { role: "assistant", content: response }
            );
        } catch (error) {
            console.error('API Error:', error);
            this.removeTypingIndicator();
            this.addMessageToChat('ai', 'Sorry, I encountered an error. Please try again.');
        }
    }

    async callHuggingFaceAPI(messages) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messages,
                    model: this.model,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to get response from API: ${error.message}`);
        }
    }

    addMessageToChat(role, content) {
        const messagesContainer = document.getElementById('aiMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${role}-message`;

        if (role === 'ai' && window.marked) {
            // Parse markdown for AI responses
            messageDiv.innerHTML = window.marked.parse(content, {
                breaks: true,
                gfm: true
            });
        } else {
            // Regular text for user messages
            messageDiv.textContent = content;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add syntax highlighting for code blocks if any
        if (role === 'ai') {
            messageDiv.querySelectorAll('pre code').forEach(block => {
                block.className = 'language-javascript';
            });
        }
    }

    async getApiKey() {
        // In production, this should be loaded securely from your backend
        return process.env.API_KEY;
    }
}

// Initialize the AI Advisor
document.addEventListener('DOMContentLoaded', () => {
    const advisor = new AICareerAdvisor();
    advisor.initialize();
});
