// Storage for books
const myLibrary = [];

// create new books
function Book(title, pages, author, isRead, id) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

// Add new Books to library
function addBookToLibrary(title, pages, author, isRead) {
  const newBook = new Book(title, pages, author, isRead);
  myLibrary.push(newBook);
}

// Display books on dom

function displayBooks() {
  const displayArea = document.getElementById("libraryDisplay");
  displayArea.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("book-card");

    itemDiv.innerHTML = `
    <h3>${book.title}</h3>
     <p><strong>Author:</strong> ${book.author}</p>
     <p><strong>Pages:</strong> ${book.pages}</p>
     <p><strong>Status:</strong> ${book.isRead ? "Read " : "Not Read"}</p>
     <button class="toggle-read" data-index="${index}">Toggle Read</button>
      <button class="delete" data-index="${index}">Delete</button>
     `;
    displayArea.appendChild(itemDiv);
  });

  document.querySelectorAll(".toggle-read").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      myLibrary[i].isRead = !myLibrary[i].isRead;
      displayBooks();
    });
  });
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      myLibrary.splice(i, 1);
      displayBooks(); // re-render
    });
  });
}

// Add button - display form
const addBtn = document.getElementById("addBtn");
const formContainer = document.getElementById("formContainer");
addBtn.addEventListener("click", function () {
  formContainer.classList.toggle("hidden");
});

// Handle form submission
const myForm = document.getElementById("bookForm");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //   get values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  //   Add books
  addBookToLibrary(title, pages, author, isRead);

  //   display
  displayBooks();

  // reset and hide form
  myForm.reset();
  document.getElementById("formContainer").classList.add("hidden");
});
