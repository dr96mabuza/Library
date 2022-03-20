let myLibrary = [];

function Book(name, author, numPages, read) {
    this.name = name
    this.author = author
    this.numPages = numPages
    this.read = read
}

function addBookToLibrary(arg1, arg2, arg3, arg4) {
    const book = Object.create(Book.prototype);

    book.name = arg1;
    book.author = arg2;
    book.numPages = Number(arg3);
    book.read = arg4;

    myLibrary.push(book);
}

function findBook() {

    const list = document.querySelector('.list');
    const box = document.createElement('div'); /*removable container to hold books*/
    box.setAttribute('id', 'box');
    list.appendChild(box);

    for (let i = 0; i < myLibrary.length; i++) {
        //creates a container for each card
        
        const container = document.createElement('div');
        container.setAttribute('id', 'list-container');
        container.setAttribute('class', 'list-container');
        container.style.margin = '10px';
        container.style.display = 'grid';
        container.style.border = '2px solid #d3dbe8';
        container.style.padding = '5px';
        box.appendChild(container);
        
        //creates new divs for each line
        const div = document.createElement('div');
        div.textContent = 'Book Name: ' + myLibrary[i].name;
        container.appendChild(div);

        const div2 = document.createElement('div');
        div2.textContent = 'Author Name: ' + myLibrary[i].author;
        container.appendChild(div2);

        const div3 = document.createElement('div');
        div3.textContent = 'Number of pages: ' + myLibrary[i].numPages;
        container.appendChild(div3);

        //read or not read button
        const Radio = document.createElement('div');
        Radio.textContent = 'You have ' + myLibrary[i].read + ' this book.';
        container.appendChild(Radio); 

        //set removal button for every book
        const DeleteBtn = document.createElement('button');
        DeleteBtn.textContent = 'Remove book';
        DeleteBtn.addEventListener('click', () => {
            myLibrary.splice(i,1);
            container.remove();
        });
        container.appendChild(DeleteBtn);
    }
}

findBook();

//modal form
const formContainer = document.querySelector('#myModal');
const btn = document.querySelector('#myBtn');
btn.addEventListener('click', () => {
    formContainer.style.display = 'block';
});
const span = document.querySelector('.close');
span.addEventListener('click', () => {
    formContainer.style.display = 'none';
});

/*handling form content*/
function click() {

    //accesing html form and its values
    const bookName = document.querySelector('#book-name');
    const bookAuthor = document.querySelector('#book-author');
    const bookPages = document.querySelector('#book-pages');
    const bookStatus = document.querySelector('input[type=radio]:checked');
    
    if (bookAuthor.value != '' && bookName.value != '' && bookPages.value != 0) {
        document.querySelector('#box').remove(); //clears box so that display doesnt repeat
        addBookToLibrary(bookName.value, bookAuthor.value, bookPages.value, bookStatus.value);
        findBook();
    
        const inputs = document.querySelectorAll('#book-name, #book-author, #book-pages');
        inputs.forEach(input => {
            input.value = ''; //resets form inputs
        });
    
        document.querySelector('#myModal').style.display = 'none';//close modal after summiting
    }   
}

const form = document.querySelector('form'); //prevents page from reloading
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

const submit = document.querySelector('#submit');
submit.addEventListener('click', () => {click();});