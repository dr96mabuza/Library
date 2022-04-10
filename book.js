let myLibrary = [];

class Book {
  constractor(name, author, numPages, read) {
    this.name = name;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
}

function addBookToLibrary(name, author, numPages, read) {
  const book = new Book(name, author, numPages, read);

  book.name = name;
  book.author = author;
  book.numPages = Number(numPages);
  book.read = read;

  myLibrary.push(book);
}

function findBook() {
  const list = document.querySelector(".list");
  const box =
    document.createElement("div"); /*removable container to hold books*/
  box.setAttribute("id", "box");
  box.style.display = "grid";
  box.style.width = "660px";
  box.style.gap = "10px";
  box.style.gridTemplateColumns = "repeat(auto-fit, minmax(230px, 30%))";
  box.style.margin = "30px 20px";
  list.appendChild(box);

  for (let i = 0; i < myLibrary.length; i++) {
    //creates a container for each card

    const container = document.createElement("div");
    container.setAttribute("id", "list-container");
    container.setAttribute("class", "list-container");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "220px";
    container.style.padding = "15px 5px";
    container.style.border = "1px solid #ff3b3f";
    container.style.borderRadius = "1px 10px";
    container.style.gap = "5px";
    container.style.backgroundColor = "white";
    box.appendChild(container);

    //creates new divs for each line
    const div = document.createElement("div");
    div.textContent = "Book: " + myLibrary[i].name;
    container.appendChild(div);

    const div2 = document.createElement("div");
    div2.textContent = "Author: " + myLibrary[i].author;
    container.appendChild(div2);

    const div3 = document.createElement("div");
    div3.textContent = "pages # " + myLibrary[i].numPages;
    container.appendChild(div3);

    function buttonColor() {
      if (myLibrary[i].read === "read") {
        Radio.style.backgroundColor = "green";
      } else if (myLibrary[i].read === "not read") {
        Radio.style.backgroundColor = "red";
      }
    }

    //read or not read button
    const Radio = document.createElement("button");
    Radio.textContent = myLibrary[i].read;
    buttonColor();
    Radio.style.color = "white";
    Radio.style.width = "143px";
    Radio.addEventListener("click", () => {
      if (Radio.textContent === "read") {
        myLibrary[i].read = "not read";
        Radio.textContent = "not read";
        Radio.style.backgroundColor = "#ff3b3f";
      } else if (Radio.textContent === "not read") {
        myLibrary[i].read = "read";
        Radio.textContent = "read";
        Radio.style.backgroundColor = "green";
      }
    });
    container.appendChild(Radio);

    //set removal button for every book
    const DeleteBtn = document.createElement("button");
    DeleteBtn.textContent = "Remove book";
    DeleteBtn.style.backgroundColor = "#ff3b3f";
    DeleteBtn.style.color = "white";
    DeleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      container.remove();
    });
    container.appendChild(DeleteBtn);
  }
}

findBook();

//modal form
const formContainer = document.querySelector("#myModal");
const btn = document.querySelector("#myBtn");
btn.addEventListener("click", () => {
  formContainer.style.display = "block";
});
const span = document.querySelector(".close");
span.addEventListener("click", () => {
  formContainer.style.display = "none";
});

/*handling form content*/

//accesing html form and its values
const bookName = document.querySelector("#book-name");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatus = document.querySelector("input[type=radio]:checked");

function checkNameError() {
  if (bookName.value === "") {
    bookName.setCustomValidity("Please enter book name");
  }
}

function checkAuthorError() {
  if (bookAuthor.value === "") {
    bookAuthor.setCustomValidity("Please enter author name");
  }
}

function checkNumberOfPagesError() {
  if (bookPages.value < 1) {
    bookPages.setCustomValidity("book cannot have less than 1 page");
  }
}

bookName.addEventListener("input", () => {
  if (bookName.validity.valid) {
    bookName.setCustomValidity("");
  } else {
    checkNameError();
    bookName.checkValidity();
  }
});

bookAuthor.addEventListener("input", () => {
  if (bookAuthor.validity.valid) {
    bookAuthor.setCustomValidity("");
  } else {
    checkAuthorError();
  }
});

bookPages.addEventListener("input", () => {
  if (bookPages.validity.valid) {
    bookPages.setCustomValidity("");
  } else {
    checkNumberOfPagesError();
  }
});

function click() {
  if (!bookName.validity.valid) {
    checkNameError();
  } else if (!bookAuthor.validity.valid) {
    checkAuthorError();
  } else if (!bookPages.validity.valid) {
    checkNumberOfPagesError();
  } else {
    addBookToLibrary(
      bookName.value,
      bookAuthor.value,
      bookPages.value,
      bookStatus.value
    );
    document.querySelector("#box").remove();
    findBook();
    const inputs = document.querySelectorAll(
      "#book-name,#book-author,#book-pages"
    );
    inputs.forEach((input) => {
      input.value = "";
    });
    document.querySelector("#myModal").style.display = "none";
  }
}

const form = document.querySelector("form"); //prevents page from reloading
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => {
  click();
});
