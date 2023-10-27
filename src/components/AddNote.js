import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Note Successfully", "success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title </label>
                        <input type="text" class="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">description</label>
                        <input type="text" class="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div class="mb-3">
                        <label for="tag" class="form-label">tag</label>
                        <input type="text" class="form-control" id="tag" name="tag " value={note.tag} onChange={onChange} />
                    </div>
                    <div class="mb-3 form-check">
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" class="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote













// import React, { useState, useContext } from 'react'
// import noteContext from "../context/notes/noteContext"

// const AddNote = () => {
//     const context = useContext(noteContext);
//     const { addNote } = context;
//     const [note, setNote] = useState({ title: "", description: "", tag: "default" })

//     const handleClick = (e) => {
//         e.preventDefault();
//         addNote(note.title, note.description, note.tag);
//     }

//     const onChange = (e) => {
//         setNote({ ...note, [e.target.name]: e.target.value })  //// ... means that keep the current properties nd add/overwrite the new properties that i am going to provide
//     }
//     return (
//         <div>
//             <h2>Add A Note</h2>
//             <form>
//                 <div class="mb-3">
//                     <label htmlFor="title" class="form-label"> Title </label>
//                     <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
//                 </div>
//                 <div class="mb-3">
//                     <label htmlFor="description" class="form-label">description</label>
//                     <input type="text" class="form-control" id="description" name="description" onChange={onChange} />
//                 </div>
//                 <div class="mb-3">
//                     <label htmlFor="tag" class="form-label">Tag</label>
//                     <input type="text" class="form-control" id="tag" name="tag" onChange={onChange} />
//                 </div>
//                 <button type="submit" class="btn btn-primary" onClick={handleClick}>Add Note</button>
//             </form>
//         </div>
//     )
// }

// export default AddNote
