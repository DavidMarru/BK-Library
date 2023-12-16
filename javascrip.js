const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");


showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () =>{
    dialog.close();
});

function book(title,author,pages,currentPage,read){
this.title = title;
this.author = author;
this.pages = pages;
this.currentPage = currentPage;
this.read = function(){
    if(pages === currentPage){
        return `Book Completed`
    } else {
        return `Not Completed` 
    }
};
}

document.querySelector("")



