document.addEventListener('DOMContentLoaded', function () {
    loadBooks(); 
});

function loadBooks() {
    const savedBooksJson = localStorage.getItem('books');

    if (savedBooksJson) {
        const savedBooks = JSON.parse(savedBooksJson);

        savedBooks.forEach(savedBook => {
            const { title, author, pages, currentPage, completed } = savedBook;
            const loadedBook = new Book(title, author, pages, currentPage);
            loadedBook.completed = completed;
            loadedBook.createCard();
        });
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);


function saveBooks() {
    const cards = document.querySelectorAll('.cards');
    const books = [];

    cards.forEach(card => {
        const h2Element = card.querySelector('h2');
        const authorElement = card.querySelector('p:nth-child(2)');
        const pagesElement = card.querySelector('p:nth-child(3)');
        const currentPageElement = card.querySelector('p:nth-child(4)');
        const completedElement = card.querySelector('p:nth-child(5)');

        if (h2Element && authorElement && pagesElement && currentPageElement) {
            const title = h2Element.innerText.replace('Book Title ', '');
            const author = authorElement.innerText.replace('by ', '');
            let pages = parseInt(pagesElement.innerText.split(' ')[0]);
            pages = isNaN(pages) ? 0 : pages;

            let currentPage = parseInt(currentPageElement.innerText.split(' ')[2]);
            currentPage = isNaN(currentPage) ? 0 : currentPage;

            const completed = completedElement ? completedElement.innerText === 'Book Completed' : false;

            console.log('Title:', title);
            console.log('Author:', author);
            console.log('Pages:', pages);
            console.log('Current Page:', currentPage);
            console.log('Completed:', completed);

            const book = new Book(title, author, pages, currentPage);
            book.completed = completed;
            books.push(book);
        } else {
            console.error('Error reading elements from the card. Missing elements:', {
                h2Element,
                authorElement,
                pagesElement,
                currentPageElement,
                completedElement,
            });
            console.log('Card HTML:', card.outerHTML);
        }
    });

    const booksJson = JSON.stringify(books);

    localStorage.setItem('books', booksJson);

    
}
