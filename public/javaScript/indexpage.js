console.log("Index JS is loading correctly");

let titleForm = document.getElementById("titleForm");
let titleButton = document.getElementById("titleButton");
let authorForm = document.getElementById("authorForm");
let authorButton = document.getElementById("authorButton");
let publishedDateForm = document.getElementById("publishedDateForm");
let publishedDateButton = document.getElementById("publishedDateButton");

let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");

let dataArray = [];
let totalRowBuild = 0;
let maxRow;
let tempdata = {};
let selectedDatasetValue = 0;
let currentDataset;

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

function fillTable() {
    for (let i = 1; i <= maxRow; i++) {
        let currRow = myTable.insertRow(totalRowBuild + 1);
        for (let j = 0; j < 3; j++) {
            let currCell = currRow.insertCell(j);
            if (j == 0) {
                currCell.innerHTML = dataArray[i - 1]["title"];
            } else if (j == 1) {
                currCell.innerHTML = dataArray[i - 1]["author"];
            } else if (j == 2) {
                currCell.innerHTML = dataArray[i - 1]["publishedDate"];
            }
        }
        totalRowBuild++;

    }
}

titleButton.onclick = function () {

    if (titleForm.value == "" || titleForm.value.length <= 0) {
        //show red box
        return;
    }

    if (selectedDatasetValue == 0) {
        currentDataset = dataArray;
    } else {
        currentDataset = tempdata;
    }

    let tempEntries = 0;
    for (const [key, value] of Object.entries(currentDataset)) {

        if(  value.title.toLowerCase().includes(titleForm.value.toLowerCase()) ){
            tempdata[tempEntries] = value;
            tempEntries++;
        }
        
    }

    maxRow = Object.keys(tempdata).length;
    deleteTable(totalRowBuild);
    rebuildTable(tempdata);

}


function deleteTable(totalRowBuild) {
    for (let i = 0; i < totalRowBuild; i++) {
        myTable.deleteRow(1);
    }
}

function rebuildTable(tempdata) {
    totalRowBuild = 0;
    for (let i = 0; i < maxRow; i++) {
        let currRow = myTable.insertRow(totalRowBuild + 1);
        for (let j = 0; j < 3; j++) {
            let currCell = currRow.insertCell(j);
            if (j == 0) {
                currCell.innerHTML = tempdata[i]["title"];
            } else if (j == 1) {
                currCell.innerHTML = tempdata[i]["author"];
            } else if (j == 2) {
                currCell.innerHTML = tempdata[i]["publishedDate"];
            }
        }
        totalRowBuild++;
    }

}

/*
setTimeout(   function(){
    deleteTable(totalRowBuild);
}     , 5000);

*/