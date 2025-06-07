document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const bookCards = document.querySelectorAll('.book-card');
    let selectedBook = null;

    // Create an array of book data
    const books = Array.from(bookCards).map(card => ({
        title: card.querySelector('.book-title').textContent,
        author: card.querySelector('.book-author').textContent,
        image: card.querySelector('.book-image').src,
        element: card
    }));

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            // Show all books when search is cleared
            bookCards.forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }

        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );

        if (filteredBooks.length > 0) {
            searchResults.innerHTML = filteredBooks.map(book => `
                <div class="search-result-item" data-title="${book.title}">
                    <img src="${book.image}" alt="${book.title}" class="search-result-image">
                    <div class="search-result-info">
                        <h4 class="search-result-title">${book.title}</h4>
                        <p class="search-result-author">${book.author}</p>
                    </div>
                </div>
            `).join('');
            searchResults.classList.add('active');

            // Add click event listeners to search results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const title = this.dataset.title;
                    const selectedBookData = books.find(book => book.title === title);
                    
                    // Show all books first
                    bookCards.forEach(card => {
                        card.style.display = 'flex';
                    });
                    
                    selectedBook = selectedBookData.element;
                    
                    // Scroll to the selected book
                    selectedBook.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the selected book
                    selectedBook.style.animation = 'highlight 2s';
                    
                    // Clear search results
                    searchResults.innerHTML = '';
                    searchResults.classList.remove('active');
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">No books found</div>';
            searchResults.classList.add('active');
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
            // Show all books when clicking outside
            bookCards.forEach(card => {
                card.style.display = 'flex';
            });
        }
    });
});

// Add highlight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Set first slide as active
    slides[0].classList.add('active');

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
});
