class BookLibrary {
  constructor() {
    this.booksCollection = document.querySelector('.books');
    this.bookList = JSON.parse(localStorage.getItem('books')) || [];
    this.bookList.forEach((book) => {
      this.createBookElement(book.title, book.author);
    });
    this.noBooksSpan = document.querySelector('.books .no-books');
  }

  addBook(title, author) {
    this.noBooksSpan.style.display = 'none';
    this.bookList.push({ title, author });
    localStorage.setItem('books', JSON.stringify(this.bookList));
    this.createBookElement(title, author);
  }

  createBookElement(title, author) {
    const div = document.createElement('div');
    div.classList.add('book');
    div.innerHTML = `
    <p>"${title}" by ${author}</p>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', () => {
      this.removeBook(div, title, author);
    });

    div.appendChild(removeBtn);

    this.booksCollection.appendChild(div);
  }

  removeBook(element, title, author) {
    this.bookList = this.bookList.filter((book) => book.title !== title || book.author !== author);
    if (this.bookList.length === 0) { this.noBooksSpan.style.display = 'block'; }
    localStorage.setItem('books', JSON.stringify(this.bookList));
    element.remove();
  }
}

window.addEventListener('load', () => {
  /* eslint-disable-next-line no-undef */
  const { DateTime } = luxon;
  const now = DateTime.now();
  document.querySelector('.date').innerText = now.toLocaleString(DateTime.DATETIME_MED);
});

const bookLibrary = new BookLibrary();

const addBtn = document.querySelector('.add-book-btn');

addBtn.addEventListener('click', () => {
  // add book

  const titleElement = document.getElementById('title');
  const authorElement = document.getElementById('author');
  const title = titleElement.value;
  const author = authorElement.value;
  if (!title || !author) {
    return;
  }
  bookLibrary.addBook(title, author);
  titleElement.value = '';
  authorElement.value = '';
});

const bookListSection = document.getElementById('book-list');
const addBookSection = document.getElementById('add-books');
const contactSection = document.getElementById('contact-info');
const links = document.querySelectorAll('header .links .link');

const removeLinks = () => {
  links.forEach((link) => {
    link.classList.remove('selected');
  });
};

/* eslint-disable no-unused-vars */
const displayBookList = (elem) => {
  bookListSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
  removeLinks();
  elem.classList.add('selected');
};
const displayAddBooks = (elem) => {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'block';
  contactSection.style.display = 'none';
  removeLinks();
  elem.classList.add('selected');
};
const displayContact = (elem) => {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'block';
  removeLinks();
  elem.classList.add('selected');
};