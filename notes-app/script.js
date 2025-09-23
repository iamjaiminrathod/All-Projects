const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(){
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <strong>${note.title}</strong>
            <p>${note.content}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function addNote(){
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    if(title && content){
        notes.push({title, content});
        saveNotes();
        renderNotes();
        noteTitle.value = '';
        noteContent.value = '';
    } else {
        alert('Please enter title and content!');
    }
}

function deleteNote(index){
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

addNoteBtn.addEventListener('click', addNote);

// Initial render
renderNotes();
