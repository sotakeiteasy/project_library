const myLibrary = [];

class movie {
    constructor(title, author, length, year, isWatch){
        this.title = title;
        this.author = author;
        this.length = length;
        this.year = year;
        this.isWatch = isWatch;
    }
    
}

function addMovieToLibrary(title, author, length, year, isWatch) {
    const newMovie = new movie(title, author, length, year, isWatch);
    myLibrary.push(newMovie);
    displayLibrary();
}

function displayLibrary() {
    const libraryContainer = document.querySelector('.cardsContainer');
    // libraryContainer.innerHTML = '';
    const cards = libraryContainer.querySelectorAll('.movieCard');
    cards.forEach(card => card.remove());

    myLibrary.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');

        movieCard.innerHTML = `
        <div class="cardHeader"> 
            <h3>${movie.title}</h3> 
            <div class="removeBtn" onclick="removeMovie(${index})"> 
                <img src="pictures/x.svg" alt="Remove">
            </div>
        </div>
        <p><strong>Author:</strong> ${movie.author}</p>
        <p><strong>Length:</strong> ${formatLength(movie.length)}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <div class="checkboxBlock"><strong>Watch:</strong> 
                <button class="toggleBtn ${movie.isWatch ? 'active' : ''}" onclick="toggleWatch(${index})">
                    ${movie.isWatch ? `<img class="checkBtn" src="pictures/checkbox-outline.svg" alt="Watched">` : `<img class="checkBtn" src="pictures/checkbox-blank-outline.svg" alt="Watched">`}
                </button>
            </div>        `;

        const frameButton = libraryContainer.querySelector('#frameButton');
        libraryContainer.insertBefore(movieCard, frameButton); // libraryContainer.appendChild(movieCard);
    });
}



function toggleWatch(index) {
    myLibrary[index].isWatch = !myLibrary[index].isWatch;  // Переключаем состояние в массиве фильмов
    displayLibrary(); 
}

function formatLength(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` 
        : `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
}

function removeMovie(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

addMovieToLibrary('Breathless', 'Jean-Luc Godard', 90, 1960, true);
addMovieToLibrary('The 400 Blows', 'François Truffaut', 99, 1959, true);
addMovieToLibrary('Cléo from 5 to 7', 'Agnès Varda', 90, 1962, false);
addMovieToLibrary('Hiroshima Mon Amour', 'Alain Resnais', 90, 1959, true);

const showButton = document.querySelector("#showDialog");
const addDialog = document.querySelector("#addDialog");
const confirmBtn = document.querySelector("#confirmBtn")
const outputBox = document.querySelector("#output")

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const lengthInput = document.getElementById("length");
const yearInput = document.getElementById("year");
const isWatchInput = document.getElementById("isWatch");

let isConfirmed = false; // Флаг для проверки подтверждения


showButton.addEventListener("click", () => {
    addDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of 
// [formmethod="dialog"], triggering a close event.
addDialog.addEventListener("close", (e) => {
   
    if (!isConfirmed) {
        console.log('User cancelled the dialog');
        return;
    }

    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const lengthValue = lengthInput.value;
    const yearValue = yearInput.value;
    const isWatchValue = document.querySelector('input[name="isWatch"]:checked')?.value === 'true';

    addMovieToLibrary(titleValue, authorValue, lengthValue, yearValue, isWatchValue)
    isConfirmed = false;
});


// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const lengthValue = lengthInput.value;
    const yearValue = yearInput.value;
    const isWatchValue = document.querySelector('input[name="isWatch"]:checked')?.value === 'true'  ;
    
    isConfirmed = true;

    addDialog.close(`Title: ${titleValue}, Author: ${authorValue}, Length: ${lengthValue}, Year: ${yearValue}, Watched: ${isWatchValue}`); // Have to send the select box value here.
});



// close by click out of dialog
addDialog.addEventListener('click', (event) => {
    if (event.target === addDialog) {
        closeDialog();
    }

function closeDialog() {
    addDialog.close();
    isConfirmed = false;
}
});
