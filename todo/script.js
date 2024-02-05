class NoteApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.noteContainer = document.getElementById('noteContainer');
        this.noteInput = document.getElementById('noteInput');
        this.addNoteBtn = document.getElementById('addNoteBtn');

        this.addNoteBtn.addEventListener('click', this.addNote.bind(this));
        this.renderNotes();
    }

    addNote() {
        const noteText = this.noteInput.value.trim();
        if (noteText === '') {
            return alert('Поле не может быть пустым')
        }
        this.addAnimation();
        this.notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.renderNotes();
        this.noteInput.value = '';
    }

    deleteNote(index) {
        this.addAnimation('animate_remove');
        this.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.renderNotes();
    }

    renderNotes() {
        this.noteContainer.innerHTML = '';
        this.notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
            <p>${index + 1}) ${note}</p>
            <div class="btn-wrapper">
            <button class="edit-btn btn z-depth-1" onclick="noteApp.editNote(${index})">Изменить</button>
            <button class="delete-btn btn z-depth-1" onclick="noteApp.deleteNote(${index})">Удалить</button>
            </div>`;
            this.noteContainer.appendChild(noteElement);
        });
    }

    editNote(index) {
        const newNoteText = prompt('Изменить заметку:', this.notes[index]);
        if (newNoteText !== null) {
            this.notes[index] = newNoteText;
            localStorage.setItem('notes', JSON.stringify(this.notes));
            this.renderNotes();
        }
    }


    addAnimation(className = 'animate', ms = 550) {
        this.noteContainer.classList.add(className);
        setTimeout(() => this.noteContainer.classList.remove(className), ms);
    }
}

const noteApp = new NoteApp();
