class NewsManager {
    constructor() {
        // Rate limiting
        this.requestCount = 0;
        this.maxRequestsPerDay = 100; // NewsAPI free tier limit
        this.lastReset = new Date().setHours(0,0,0,0);
        this.newsContainer = document.getElementById('news-container');
        this.loadingElement = document.getElementById('news-loading');
        this.errorElement = document.getElementById('news-error');
        this.apiKey = document.querySelector('meta[name="news-api-key"]')?.content;
        this.cachedNews = null;
        this.cacheExpiry = null;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    isProduction() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1';
    }

    async initialize() {
        if (!this.newsContainer) {
            console.error('News container not found');
            return;
        }
        if (!this.apiKey) {
            console.error('News API key not found');
            return;
        }
        console.log('Initializing news with API key:', this.apiKey);
        await this.fetchNews();
    }

    async fetchNews(retryCount = 0) {
        try {
            // Check if we're in production environment
            if (this.isProduction()) {
                this.showProductionMessage();
                return;
            }

            // Check rate limiting
            if (!this.checkRateLimit()) {
                this.showError('Daily API request limit reached. Please try again tomorrow.');
                return;
            }

            // Reset counter if it's a new day
            const today = new Date().setHours(0,0,0,0);
            if (today > this.lastReset) {
                this.requestCount = 0;
                this.lastReset = today;
            }
            this.showLoading();

            // Check cache first
            if (this.cachedNews && this.cacheExpiry && Date.now() < this.cacheExpiry) {
                this.displayNews(this.cachedNews);
                return;
            }

            this.requestCount++;
            const params = new URLSearchParams({
                apiKey: this.apiKey,
                country: 'us',
                category: 'technology',
                pageSize: 6
            });
            
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?${params}`
            );

            if (!response.ok) {
                const error = await response.json();
                console.error('News API error:', error);
                
                // Handle specific error cases
                if (response.status === 429 && retryCount < 3) {
                    // Rate limit hit, wait and retry
                    await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                    return this.fetchNews(retryCount + 1);
                }
                
                if (response.status === 426) {
                    this.showError('Please upgrade to a paid API plan for more requests.');
                    return;
                }
                
                throw new Error(`Failed to fetch news: ${error.message}`);
            }

            const data = await response.json();
            
            // Cache the results
            this.cachedNews = data.articles;
            this.cacheExpiry = Date.now() + this.cacheTimeout;
            
            this.displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            this.showError();
        }
    }

    displayNews(articles) {
        if (!this.newsContainer) return;
        
        this.hideLoading();
        this.hideError();

        if (!articles || articles.length === 0) {
            this.showError('No news articles available at the moment.');
            return;
        }

        const html = articles.map(article => `
            <article class="news-card">
                ${article.urlToImage ? `
                    <div class="news-image">
                        <img src="${article.urlToImage}" 
                            alt="${this.escapeHtml(article.title)}" 
                            loading="lazy"
                            onerror="this.onerror=null; this.src='/assets/images/news-placeholder.jpg'">
                    </div>
                ` : `
                    <div class="news-image">
                        <img src="/assets/images/news-placeholder.jpg" alt="News placeholder" loading="lazy">
                    </div>
                `}
                <div class="news-content">
                    <h3 class="news-title">
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                            ${this.escapeHtml(article.title)}
                        </a>
                    </h3>
                    <p class="news-meta">
                        ${this.escapeHtml(article.source.name)} · ${this.formatDate(article.publishedAt)}
                    </p>
                    <p class="news-description">${this.escapeHtml(article.description || '')}</p>
                </div>
            </article>
        `).join('');

        this.newsContainer.innerHTML = html;
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    showLoading() {
        this.loadingElement?.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingElement?.classList.add('hidden');
    }

    showProductionMessage() {
        this.hideLoading();
        if (this.newsContainer) {
            this.newsContainer.innerHTML = `
                <div class="news-production-notice">
                    <h3>🚀 Tech News Feature</h3>
                    <p>The tech news feed is available when running the site locally.</p>
                    <p>To view the latest tech news:</p>
                    <ol>
                        <li>Clone the repository from <a href="https://github.com/jona42-ui/jona42-ui.github.io" target="_blank">GitHub</a></li>
                        <li>Follow the setup instructions in the README</li>
                        <li>Run the site locally</li>
                    </ol>
                    <p class="news-note">This limitation is due to NewsAPI's free tier restrictions.</p>
                </div>
            `;
        }
    }

    showError(message) {
        this.hideLoading();
        if (this.errorElement) {
            this.errorElement.textContent = message || 'Failed to load news. Please try again later.';
            this.errorElement.classList.remove('hidden');
        }
    }

    checkRateLimit() {
        return this.requestCount < this.maxRequestsPerDay;
    }

    hideError() {
        this.errorElement?.classList.add('hidden');
    }
}

// Initialize news manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newsManager = new NewsManager();
    window.newsManager.initialize();
});
