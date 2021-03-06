console.log("Index JS is loading correctly");

let titleForm = document.getElementById("titleForm");
let titleButton = document.getElementById("titleButton");
let authorForm = document.getElementById("authorForm");
let authorButton = document.getElementById("authorButton");
let publishedDateForm = document.getElementById("publishedDateForm");
let publishedDateButton = document.getElementById("publishedDateButton");
let resetAllButton = document.getElementById("resetAllButton");
let selectDataset1 = document.getElementById("selectDataset1");
let selectDataset2 = document.getElementById("selectDataset2");

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
        dataArray = response.data;
        maxRow = Object.keys(dataArray).length;
        fillTable();
        selectDataset1.style.border = "3px solid black";
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });

function fillTable() {
    for (let i = 0; i < maxRow; i++) {
        let currRow = myTable.insertRow(totalRowBuild + 1);
        for (let j = 0; j < 3; j++) {
            let currCell = currRow.insertCell(j);
            if (j == 0) {
                currCell.innerHTML = dataArray[i]["title"];
            } else if (j == 1) {
                currCell.innerHTML = dataArray[i]["author"];
            } else if (j == 2) {
                currCell.innerHTML = dataArray[i]["publishedDate"];
            }
        }
        totalRowBuild++;

    }
}

function deleteTable() {
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

titleButton.onclick = function () {

    if (titleForm.value == "" || titleForm.value.length <= 0) {
        //show red box
        return;
    }

    if (selectedDatasetValue == 0) {
        currentDataset = dataArray;
        tempdata = {};
    } else {
        currentDataset = tempdata;
        tempdata = {};
    }

    let tempEntries = 0;
    
    for (const [key, value] of Object.entries(currentDataset)) {

        if (value.title.toLowerCase().includes(titleForm.value.toLowerCase())) {
            tempdata[tempEntries] = value;
            tempEntries++;
        }

    }

    maxRow = Object.keys(tempdata).length;

    if (maxRow == 0) {
        deleteTable();
        totalRowBuild = 0;
        //display message    
    } else {
        deleteTable();
        rebuildTable(tempdata);
        //display message
    }

    selectDataset2.disabled = false;

}

authorButton.onclick = function () {

    if (authorForm.value == "" || authorForm.value.length <= 0) {
        //show red box
        return;
    }

    if (selectedDatasetValue == 0) {
        currentDataset = dataArray;
        tempdata = {};
    } else {
        currentDataset = tempdata;
        tempdata = {};
    }

    let tempEntries = 0;
    for (const [key, value] of Object.entries(currentDataset)) {

        if (value.author.toLowerCase().includes(authorForm.value.toLowerCase())) {
            tempdata[tempEntries] = value;
            tempEntries++;
        }

    }

    maxRow = Object.keys(tempdata).length;

    if (maxRow == 0) {
        deleteTable();
        totalRowBuild = 0;
        //display message    
    } else {
        deleteTable();
        rebuildTable(tempdata);
        //display message
    }

    selectDataset2.disabled = false;

}

resetAllButton.onclick = function () {

    titleForm.value = "";
    authorForm.value = "";
    selectedDatasetValue = 0;
    selectDataset2.disabled = true;
    selectDataset2.style.border = "";
    selectDataset1.style.border = "3px solid black";

    deleteTable();
    totalRowBuild=0;
    maxRow = Object.keys(dataArray).length;
    fillTable();

}

publishedDateButton.onclick = function(){
   
    if (publishedDateForm.value == "" || publishedDateForm.value.length <= 0) {
        //show red box
        return;
    }

    if (selectedDatasetValue == 0) {
        currentDataset = dataArray;
        tempdata = {};
    } else {
        currentDataset = tempdata;
        tempdata = {};
    }
   
    let tempEntries = 0;
    for (const [key, value] of Object.entries(currentDataset)) {

        if ( value.publishedDate == publishedDateForm.value ) {
            tempdata[tempEntries] = value;
            tempEntries++;
        }

    }

    maxRow = Object.keys(tempdata).length;

    if (maxRow == 0) {
        deleteTable();
        totalRowBuild = 0;
        //display message    
    } else {
        deleteTable();
        rebuildTable(tempdata);
        //display message
    }

    selectDataset2.disabled = false;

}

selectDataset1.onclick = function(){
    selectDataset2.style.border = "";
    selectDataset1.style.border = "3px solid black";
    selectedDatasetValue = 0;
}

selectDataset2.onclick = function(){
    selectDataset1.style.border = "";
    selectDataset2.style.border = "3px solid black";
    selectedDatasetValue = 1;
}