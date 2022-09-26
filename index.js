import {updateLocalStorage} from './modules/update_local_storage.js';
import { getData } from './modules/get_local_storage.js';
import './modules/page_change.js';
import { StandardBook } from './modules/creat_book.js';
import { DateTime } from './modules/luxon.min.js';


const bookList = document.querySelector('.bookList');
const submit = document.querySelector('.submit');
const title = document.querySelector('.title');
const author = document.querySelector('.author');

const dateContainer = document.getElementById('date');
const curentDate = document.createElement('div');
curentDate.innerText = DateTime.now();
dateContainer.append(curentDate);

class StandardBooks {
  constructor() {
    this.books = [];
  }
  addBook(title, author) {
    const p = new StandardBook(title, author);
    this.books.push(p);
    return p;
  }
  get allBooks() {
    return this.books;
  }
  removeBook(index) {
    this.books.splice(index, 1);
  }
}

const initialBook = new StandardBooks();
initialBook.addBook('title1', 'author1');
initialBook.addBook('title2', 'author2');
initialBook.addBook('title3', 'author3');

let dataStored = getData();
if (dataStored) {
  initialBook.books = dataStored;
}

let displayBook = () => {
  bookList.innerText = '';
  initialBook.allBooks.forEach((standBook) => {
    const containerTAB = document.createElement('div');
    containerTAB.classList = 'flex space-btw align-center';

    const containerTitleAuthor = document.createElement('div');
    containerTitleAuthor.classList = 'flex align-center';

    const title = document.createElement('h3');
    title.innerText = standBook.title;

    const by = document.createElement('h3');
    by.innerText = 'by';

    const author = document.createElement('h3');
    author.innerText = standBook.author;

    containerTitleAuthor.append(title, by, author);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'removebtn';
    removeBtn.innerText = 'Remove';

    containerTAB.append(containerTitleAuthor, removeBtn);

    const horizontalLine = document.createElement('hr');

    bookList.append(containerTAB, horizontalLine);
  });
  const removebtn = Array.from(document.querySelectorAll('.removebtn'));
  removebtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnIndex = removebtn.indexOf(btn);
      initialBook.removeBook(btnIndex);
      displayBook();
    });
  });
  updateLocalStorage(initialBook.books);
}
displayBook();

submit.addEventListener('click', () => {
  const title1 = title.value;
  const author2 = author.value;
  initialBook.addBook(title1, author2);
  title.value = '';
  author.value = '';
  displayBook();
});