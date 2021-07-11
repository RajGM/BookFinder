console.log("Index JS is loading correctly");

let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");

let dataArray = [];
let totalRowBuild = 0;
let maxRow; 

axios.get('/getData')
    .then(function (response) {
        // handle success
        dataArray = response.data;
        maxRow = Object.keys(dataArray).length;
        console.log(response.data);
        fillTable();
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

function fillTable(){
    for(let i=1;i<=maxRow;i++){
        let currRow = myTable.insertRow(totalRowBuild + 1);
        for(let j=0;j<3;j++){
            let currCell = currRow.insertCell(j);
            if(j==0){
                currCell.innerHTML = dataArray[i-1]["title"];
            }else if(j==1){
                currCell.innerHTML = dataArray[i-1]["author"];
            }else if(j==2){
                currCell.innerHTML = dataArray[i-1]["publishedDate"];
            } 
        }
        totalRowBuild++;

    }
}
    