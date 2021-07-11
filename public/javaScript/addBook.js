console.log("addBook JS is loading correctly");

let title = document.getElementById('title');
let author = document.getElementById('author');
let publishedDate = document.getElementById('publishedDate');
let addBookButton = document.getElementById('addBookButton');

addBookButton.onclick = function(){

  const dateArr = publishedDate.value.split("-");
 
  let publishedDateArray = {
      "year":dateArr[0],
      "month":dateArr[1],
      "day":dateArr[2]
  }

  axios.post('/addBook', {
    title: title.value,
    author: author.value,
    publishedDate:publishedDateArray
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log("publishedDateArray:",publishedDateArray);

}