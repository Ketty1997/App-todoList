//OPERZIONI DA FARE IN PAGINA
//recupero gli elementi di interesse della pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const buttonDeleteAll = document.querySelector('#bottone');

//creo una chiave per il local storage
const STORAGE_KEY = '_todo_';

//preparo lista di attivita
let activities = [];

//controllo se c'erano delle attivita nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
    activities = JSON.parse(storage);
}

//chiedo a js di decidere cosa mostrare
showContent();

//OPERZIONI DINAMICHE
button.addEventListener('click', function () {
    //recupero il testo nel campo
    const newActivity = inputField.value.trim();
    //se il campo non e' vuoto
    if (newActivity.length > 0) {
        //aggiungo attivita alla lista
        activities.push(newActivity);
        //aggiorna lo storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        //ora. ridecidi cosa mostrare
        showContent();
        //svuoto il campo
        inputField.value = '';
    }
});



//FUNZIONI
//funzione che decide cosa mostrare in pagina
function showContent() {
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    if (activities.length > 0) {
        //se c'e almeno un'attivita...
        //per ciascuna attivita
        activities.forEach(function (activity) {
            //inserisci un blocco HTML
            todoList.innerHTML += ` 
        <li class="todo-item">
          <div class="todo-check">
            <img src="images/check.svg" alt="check icon">
          </div>
          <p class="todo-text">${activity}</p>
        </li>`
        });

        //rendi cliccabili i check
        makeCheckClickable();

    } else {
        //ALTRIMENTI
        //mostra la lista vuota
        emptyListMessage.innerText = 'Sembra non ci siano attività';
    }
}

//funzione per rendere i check cliccabili
function makeCheckClickable() {
    //cerca tutti i check e rendili cliccabili
    const checks = document.querySelectorAll('.todo-check');
    //per ognuno dei check
    checks.forEach(function (check, index) {
        // Aggiungi una reazione al click
        check.addEventListener('click', function () {
            //rimuovi l'elemento dalla lista
            activities.splice(index, 1);
            //aggiorna anche il localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
            //aggiorna la lista in pagina
            showContent();

        });
    })
}


//elimino tutto quando premo il bottone 'elimina tutte le attivita'
function deleteAll() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
    //pulisco lo storage
    localStorage.clear();
    //ricarico la pagina
    setTimeout(function () {
        window.location.reload();
    }, 500); // 500 millisecondi
}
buttonDeleteAll.addEventListener('click', deleteAll);