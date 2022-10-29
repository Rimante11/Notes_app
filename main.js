const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

//kollar notes i localStorage och ska ha de även när det refreshas sida
if(notes) {
  notes.forEach(note => addNewNote(note));
}


addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note'); /*ger class name note till diven */

  note.innerHTML = `
  <div class="tools">
          <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
  `

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text
  main.innerHTML = text
  //main är en div därför vi gör inte .value
  //markded bibliotek som importerat fron cndjs i html

  deleteBtn.addEventListener('click', () => {
    note.remove() //removes from DOM

    //delete från storage
    updateLocalStorage()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden'); //classList pga vi tar icke från html vi tar från js som vi ritat note.innerHTML
    textArea.classList.toggle('hidden');
  })

  textArea.addEventListener('input', (e) => {
    //const {value} = e.target //destructuring
    //main.innerHTML = marked(value)
    //marked course on youtube kika

    main.innerHTML =e.target.value

    updateLocalStorage();
  })

  document.body.appendChild(note);
} 

function updateLocalStorage() {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  //värje text note sätter in i array
  notesText.forEach(note => notes.push(note.value));
  //och den array sätter till LocalStorage string
  localStorage.setItem('notes', JSON.stringify(notes));

  console.log(notes); //notes array
}




//localStorage.setItem('name', 'Brad');
//localStorage.getItem('name');
//localStorage.removeItem('name');
//Only strings we can store i localStorage
//annars använder we JSON.stringify

/* const person = {
  name: "Rimante Awdish",
  location: "Lagos",
} */

//localStorage.setItem('myKey', JSON.stringify(person));
//JSON.parse(localStorage.getItem('myKey'));


//console.log("This is my storage ", localStorage);
//console.log(localStorage.getItem('myKey'));
//console.log(localStorage.getItem)

// ${text ? "" :"hidden"} expression syntax ${}
//dvs if (?) text when have no class "" else (:) have class of "hidden"