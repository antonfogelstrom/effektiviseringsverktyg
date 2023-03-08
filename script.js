const TITLE = 'Effektiviseringsverktyg ';
const VERSION = '1.0';
const DELIMITER = ';';

document.title = TITLE + VERSION;

let fileReader = new FileReader();
fileReader.onload = function (event) {
    convert(fileReader.result);
};

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    fileReader.readAsText(this.files[0]);
}

let searchTerms = '';
const searchElement = document.getElementById("search");
inputElement.addEventListener("change", handleSearchTerms, false);
function handleSearchTerms() {
    searchTerms = searchElement.value;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function convert(text) {
    let convertedTextArray = new Array();

    searchTerms = searchTerms.toUpperCase();
    let searchTermArray = new Array();
    if(searchTerms.length > 0){
        searchTermArray = searchTerms.split(';');
    }
    searchTermArray.push('Garanterad kolumn1'.toUpperCase());
    searchTermArray.push('Garanterad kolumn2'.toUpperCase());
    searchTermArray.push('Garanterad kolumn3'.toUpperCase());
    searchTermArray.push('Garanterad kolumn4'.toUpperCase());

    let rows = text.split(/\r?\n|\r|\n/g);

    let kolumner = rows[0].split(';');
    let kolumnerIndex = new Array();
    let count = 0;

    kolumner.forEach(element => {
        let upper = element.toUpperCase();
        for (i = 0; i < searchTermArray.length; i++) {
            if (upper.includes(searchTermArray[i])) {
                kolumnerIndex.push(count);
                convertedTextArray.push(element + DELIMITER);
            }
        }
        count++;
    });

    convertedTextArray.push('\n');

    for (i = 1; i < rows.length; i++) {
        let kolumner = rows[i].split(';');
        for (j = 0; j < kolumner.length; j++) {
            if (kolumnerIndex.indexOf(j) != -1) {
                convertedTextArray.push(kolumner[j] + DELIMITER);
            }
        }
        convertedTextArray.push('\n');
    }

    convertedTextArray = convertedTextArray.filter(n => n);

    let convertedText = '';
    for (i = 0; i < convertedTextArray.length; i++) {
        convertedText += convertedTextArray[i];
    }

    download('test.txt', convertedText);
}