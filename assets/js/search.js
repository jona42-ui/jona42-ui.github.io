class PostSearch {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.posts = [];
        this.initialize();
    }

    async initialize() {
        try {
            // Fetch posts data from the JSON feed
            const response = await fetch('/feed.json');
            const data = await response.json();
            this.posts = data.items || [];

            // Set up event listeners
            this.searchInput?.addEventListener('input', this.debounce(() => this.handleSearch(), 300));
            
            // Handle keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // CMD/CTRL + K to focus search
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    this.searchInput?.focus();
                }
                // Escape to clear and close search
                if (e.key === 'Escape') {
                    this.clearSearch();
                }
            });
        } catch (error) {
            console.error('Error initializing search:', error);
        }
    }

    handleSearch() {
        const query = this.searchInput?.value.toLowerCase().trim();
        if (!query) {
            this.clearSearch();
            return;
        }

        const results = this.posts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(query);
            const contentMatch = post.content_text?.toLowerCase().includes(query);
            return titleMatch || contentMatch;
        });

        this.displayResults(results);
    }

    displayResults(results) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = '<p class="search-no-results">No posts found</p>';
            return;
        }

        const html = results.map(post => `
            <article class="search-result">
                <h3><a href="${post.url}">${post.title}</a></h3>
                <div class="search-result-meta">
                    <time datetime="${post.date_published}">${this.formatDate(post.date_published)}</time>
                    · ${this.estimateReadTime(post.content_text)} min read
                </div>
                <p>${this.truncateText(post.content_text, 150)}</p>
            </article>
        `).join('');

        this.searchResults.innerHTML = html;
    }

    clearSearch() {
        if (this.searchInput) this.searchInput.value = '';
        if (this.searchResults) this.searchResults.innerHTML = '';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    estimateReadTime(text) {
        const wordsPerMinute = 200;
        const words = text?.split(/\s+/).length || 0;
        return Math.ceil(words / wordsPerMinute);
    }

    truncateText(text, length) {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + '...';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.postSearch = new PostSearch();
});
