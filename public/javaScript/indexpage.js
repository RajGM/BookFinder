console.log("Index JS is loading correctly");

axios.get('/getData')
    .then(function (response) {
        // handle success
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
