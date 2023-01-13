const searchForm = document.querySelector(".searchForm");

const base_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const api_key = "&key=AIzaSyC-bwy6MNbTzusK3CjqU6Kk8dIpqVxG7Bk";

const bookCard = document.querySelector(".bookCard");
const description = document.querySelector(".description");
const bookName = document.querySelector(".bookName");
const thumbnail = document.querySelector(".thumbnail");
const author = document.querySelector(".author");
const hidden = document.querySelector(".hidden")

// variables for selecting list form 
const addLists = document.getElementById("addLists")
const addButton = document.querySelector("button")




searchForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const book = document.querySelector('input').value;
    getBookInfo(book); 
  searchForm.reset();
})


function getBookInfo(book) {
fetch(base_URL+ book + api_key)
.then(response => response.json())
.then(result => {
createCard(result);
})
}



function createCard(result){
  hidden.style.visibility = "visible";

 bookName.innerHTML = result.items[0].volumeInfo.title
 author.innerHTML = "by " + result.items[0].volumeInfo.authors;
 

 description.innerHTML = result.items[0].volumeInfo.description;

 thumbnail.setAttribute("src", result.items[0].volumeInfo.imageLinks.thumbnail);
 thumbnail.setAttribute("alt", "thumbnail of the book");

 
//  when a list is selected
 addButton.addEventListener("click", () =>{
  let title = result.items[0].volumeInfo.title;
 let id = result.items[0].id;
  localStorage.setItem(id, title);
  // let author = " by " + result.items[0].volumeInfo.authors;

  if (addLists.selectedIndex === 0){
  let li = document.createElement("li");
  let ul = document.querySelector(".firstList");
  ul.append(li)
  li.innerHTML = localStorage.getItem(id);
   }
  if (addLists.selectedIndex === 1){
    
  }
  if (addLists.selectedIndex === 2){
    
    }
  
  })

}

// let arrStorage = Object.values(localStorage);


if (localStorage.length > 0){
for (let i=0; i=localStorage.length; i++){
let KeyName = window.localStorage.key(i);
let li = document.createElement("li")
document.querySelector(".firstList").append(li);
li.innerHTML = localStorage.getItem(KeyName)
}
}

//   document.querySelector(".one").innerHTML = "&#x2022 " + title;
  //   document.querySelector(".one").style.color = "black";
  //   let p =  document.createElement("p")
  //   document.querySelector(".one").append(p)
  //  p.innerHTML = author;
  //  p.style.fontSize = "small";
  //  p.style.fontStyle = "italic";
  //  p.style.padding = "none";





