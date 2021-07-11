console.log("addBook JS is loading correctly");

let title = document.getElementById('title');
let author = document.getElementById('author');
let publishedDate = document.getElementById('publishedDate');
let addBookButton = document.getElementById('addBookButton');

addBookButton.onclick = function(){

  axios.post('/addBook', {
    title: title.value,
    author: author.value,
    publishedDate:publishedDate.value
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

}