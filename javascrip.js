const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("#inputInfo");
const closeButton = document.querySelector("#closePad");
const addBookButton = document.querySelector("#addBook");
const newBookContainer = document.getElementById("newBook");
const menuIcon = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu');

showDialog.addEventListener("click", () => {
    dialog.showModal();
    dialog.setAttribute("show","");

});


closeButton.addEventListener("click", () => {
    dialog.setAttribute(`closing`, "");
    dialog.addEventListener("animationend", () => {
        dialog.removeAttribute (`closing`);
        dialog.removeAttribute (`show`);
        dialog.close();
    },{once:true})
});

function Book(title, author, pages, currentPage) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = currentPage;
    this.completed = false;

    this.read = function () {
        if (this.pages === this.currentPage) {
            return "Book Completed";
        } else if (this.completed) {
            return "Book Completed";
        } else {
            return "Not Completed";
        }
    };

    this.createCard = function () {
        var card = document.createElement("div");

        var zIndex = document.querySelectorAll('.cards').length + 1;
        card.style.zIndex = zIndex;

        var topPosition = (document.querySelectorAll('.cards').length + 0) * 60;
        card.style.zIndex = zIndex;
        card.style.top = topPosition + 'px';

        card.classList.add("cards");
        card.innerHTML = `
            <h2>Book Title ${this.title}</h2>
            <p>by ${this.author},</p>
            <p>${this.pages} Total pages, Pages read ${this.currentPage}</p>
            <p>${this.read()}</p>
            <div class="dialog-buttons">
            <button id="deleteButton">Remove Book</button>
            <button id="completed">Book completed</button>
            </div>
        `;

        card.querySelector("h2").addEventListener("click", () => {
           console.log(`clicked`)
           card.style.zIndex = document.querySelectorAll('.cards').length + 1;
            });
    
        newBookContainer.appendChild(card);

        card.querySelector("#deleteButton").addEventListener("click", () => {
            var userConfirmed = window.confirm("Are you sure you want to remove this book from your library?");

            if (userConfirmed) {
                card.remove();
            }
        });

        card.querySelector("#completed").addEventListener("click", () => {
            var markCompleted = window.confirm("Want to mark this book as Read");

            if (markCompleted) {
                this.completed = true;
                this.currentPage = this.pages;
                card.querySelector("p:nth-child(4)").innerText = this.read();
                card.querySelector("p:nth-child(3)").innerText = "";
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
    dialog.setAttribute(`closing`, "");
    dialog.addEventListener("animationend", () => {
        dialog.removeAttribute (`closing`);
        dialog.removeAttribute (`show`);
        dialog.close();
    },{once:true})
    menuList.classList.toggle('showMenu');
});


document.addEventListener('DOMContentLoaded', function () {
    menuIcon.addEventListener('click', function () {
        menuList.classList.toggle('showMenu');
    });
});
