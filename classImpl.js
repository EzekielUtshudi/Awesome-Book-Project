class BookLibrary {
  constructor() {
    this.booksCollection = document.querySelector('.books');
    this.bookList = JSON.parse(localStorage.getItem('books')) || [];
    this.bookList.forEach((book) => {
      const div = document.createElement('tr');
      div.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
        `;

      const removeBtn = document.createElement('button');
      removeBtn.innerText = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(div, book.title, book.author);
      });

      div.appendChild(removeBtn);

      this.booksCollection.appendChild(div);
    });
  }

  addBook(title, author) {
    this.bookList.push({ title, author });
    localStorage.setItem('books', JSON.stringify(this.bookList));
    const div = document.createElement('tr');
    div.innerHTML = `
      <td>"${title}" by </td>
      <td>${author}</td>
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
    element.remove();
    this.bookList = this.bookList.filter(
      (book) => book.title !== title || book.author !== author,
    );
    localStorage.setItem('books', JSON.stringify(this.bookList));
  }
}

const bookLibrary = new BookLibrary();

const addBtn = document.querySelector('.add-book-btn');

addBtn.addEventListener('click', () => {
  // adding book-section

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  if (!title || !author) {
    return;
  }
  bookLibrary.addBook(title, author);
});
