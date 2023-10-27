import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div class="card my-3" >
                <div class="card-body">
                    <div className="d-flex align-items-center ">
                        <h5 class="card-title">{note.title}</h5>
                        <i class="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                        <i class="fa-solid fa-file-pen mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p class="card-text">{note.description}</p>

                </div>
            </div>
        </div >
    )
}

export default NoteItem
