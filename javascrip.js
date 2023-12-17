const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("#closePad");
const addBookButton = document.querySelector("#addBook");
const newBookContainer = document.getElementById("newBook");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

function Book(title, author, pages, currentPage) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = currentPage;

    this.read = function () {
        return pages === currentPage ? "Book Completed" : "Not Completed";
    };

    this.createCard = function() {
        var card = document.createElement("div");
        card.classList.add("cards");
        card.innerHTML = `
            <p>${this.title} by ${this.author},</p>
            <p>${this.pages} pages </p>
            <p>${this.read()}</p>
            <button id="deleteButton">Remove Book</button>
            <button id="completed">Book completed</button>
        `;
        newBookContainer.appendChild(card);

        card.querySelector("#deleteButton").addEventListener("click", () => {
            var userConfirmed = window.confirm("Are you sure you want to remove this book from your library?");
            
            if (userConfirmed) {
                card.remove();
            }
        });
    };
}

addBookButton.addEventListener("click", function () {
    var title = document.querySelector("#title").value;
    var author = document.querySelector("#author").value;
    var pages = document.querySelector("#totalPages").value;
    var currentPage = document.querySelector("#pagesRead").value;

    var newBook = new Book(title, author, pages, currentPage);
    newBook.createCard();
    dialog.close();
});
