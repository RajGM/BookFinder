console.log("addBook JS is loading correctly");

let title = document.getElementById('title');
let author = document.getElementById('author');
let publishedDate = document.getElementById('publishedDate');
let addBookButton = document.getElementById('addBookButton');
let messageDiv = document.getElementById('messageDiv');

addBookButton.onclick = function(){

  axios.post('/addBook', {
    title: title.value,
    author: author.value,
    publishedDate:publishedDate.value
  })
  .then(function (response) {
    messageDiv.innerHTML = response.data;
  })
  .catch(function (error) {
    messageDiv.innerHTML = error;
  });

}