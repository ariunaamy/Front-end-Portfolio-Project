
// setting up veriables for html elements 
const searchForm = document.querySelector(".searchForm");
const base_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const api_key = "&key=AIzaSyC-bwy6MNbTzusK3CjqU6Kk8dIpqVxG7Bk";

// book card variables 
const bookCard = document.querySelector(".bookCard");
const description = document.querySelector(".description");
const bookName = document.querySelector(".bookName");
const thumbnail = document.querySelector(".thumbnail");
const author = document.querySelector(".author");
const hidden = document.querySelector(".hidden")

// variables for selecting list form 
const addLists = document.getElementById("addLists")
const addButton = document.querySelector("button")

let listOfItems = [[], [], []];
let firstList = listOfItems[0];
let secondList = listOfItems[1];
let thirdList = listOfItems[2];



//Search Book event listner 
searchForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  const book = document.querySelector('input').value;
  getBookInfo(book); 
  searchForm.reset();
 }
)

// function accessing Google Books API
function getBookInfo(book) {
fetch(base_URL+ book + api_key)
.then(response => response.json())
.then(result => {
  createCard(result);
  }
 )
}

//creating of book description card
function createCard(result){
  hidden.style.visibility = "visible";

  bookName.innerHTML = result.items[0].volumeInfo.title
  author.innerHTML = "by " + result.items[0].volumeInfo.authors;

  description.innerHTML = result.items[0].volumeInfo.description;

  thumbnail.setAttribute("src", result.items[0].volumeInfo.imageLinks.thumbnail);
  thumbnail.setAttribute("alt", "thumbnail of the book");

  let title = result.items[0].volumeInfo.title;
  let id = result.items[0].id;

  let obj = {};
  obj[id] = title;

  //  when a list is selected
  addButton.addEventListener("click", () => {
  // options to add to lists 
  if (addLists.selectedIndex === 0){
    if (!firstList.some(obj => obj[id] === title) && !secondList.some(obj => obj[id] === title) && !thirdList.some(obj => obj[id] === title)) {
      firstList.push(obj);
      localStorage.setItem("added", JSON.stringify(listOfItems))
      let storage = JSON.parse(localStorage.getItem('added'))
      for (let i = 0; i < storage[0].length; i++) {
        let li = document.createElement("li")
        let ul = document.querySelector(".firstList")
        ul.append(li);
        li.innerHTML = Object.values(storage[0][i])[0]
      }
      //  console.log(obj)
    }
  }

  else if (addLists.selectedIndex === 1) {
    if (!firstList.some(obj => obj[id] === title) && !secondList.some(obj => obj[id] === title) && !thirdList.some(obj => obj[id] === title)) {
      secondList.push(obj);
      localStorage.setItem("added", JSON.stringify(listOfItems))
      let storage = JSON.parse(localStorage.getItem('added'))
      for (let i = 0; i < storage[1].length; i++) {
        let li = document.createElement("li")
        let ul = document.querySelector(".secondList")
        ul.append(li);
        li.innerHTML = Object.values(storage[1][i])[0]
      }
    }
  }
  else if (addLists.selectedIndex === 2) {
    if (!firstList.some(obj => obj[id] === title) && !secondList.some(obj => obj[id] === title) && !thirdList.some(obj => obj[id] === title)) {
      thirdList.push(obj);
      localStorage.setItem("added", JSON.stringify(listOfItems))
      let storage = JSON.parse(localStorage.getItem('added'))
      for (let i = 0; i < storage[2].length; i++) {
        let li = document.createElement("li")
        let ul = document.querySelector(".thirdList")
        ul.append(li);
        li.innerHTML = Object.values(storage[2][i])[0]
      } 
      }
    }
  }
  )
}

// adding books to lists 
if (localStorage.length > 0){
  document.querySelector(".one").remove()
  document.querySelector(".two").remove()
  document.querySelector(".three").remove()

  let storage = JSON.parse(localStorage.getItem('added'));
  for (let i = 0; i < storage[0].length; i++) {
    let li = document.createElement("li")
    let ul = document.querySelector(".firstList")
    ul.append(li);
    li.innerHTML = Object.values(storage[0][i])[0]
  }
  for (let i = 0; i < storage[1].length; i++) {
    let li = document.createElement("li")
    let ul = document.querySelector(".secondList")
    ul.append(li);
    li.innerHTML = Object.values(storage[1][i])[0]
  }
  for (let i = 0; i < storage[2].length; i++) {
    let li = document.createElement("li")
    let ul = document.querySelector(".thirdList")
    ul.append(li);
    li.innerHTML = Object.values(storage[2][i])[0]
  }
}
















