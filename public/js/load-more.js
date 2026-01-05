// Load More Button Functionality
// Reveals hidden articles on click with fade-in animation

document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const visibleCounter = document.getElementById('visible-count');
    const loadMoreContainer = document.getElementById('load-more-container');

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function () {
        const perLoad = parseInt(this.dataset.perLoad);
        const current = parseInt(this.dataset.current);
        const total = parseInt(this.dataset.total);

        // Find next batch of hidden articles
        const hiddenArticles = document.querySelectorAll('.hidden-article');
        const toShow = Math.min(perLoad, hiddenArticles.length);

        for (let i = 0; i < toShow; i++) {
            hiddenArticles[i].classList.remove('hidden-article');
            hiddenArticles[i].classList.add('fade-in');
        }

        // Update counter
        const newCurrent = current + toShow;
        this.dataset.current = newCurrent;
        visibleCounter.textContent = newCurrent;

        // Hide button if all shown
        if (newCurrent >= total) {
            loadMoreContainer.style.display = 'none';
        }
    });
});
