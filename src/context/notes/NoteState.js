import { React, useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    ///////// get all notes
    const getNotes = async () => {
        //// backend side code
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json)
        // console.log(localStorage.getItem('token'));
    }
    ///////// ADD NOTE
    const addNote = async (title, description, tag) => {
        //// backend side code
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    //////////////// DELETE
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        ///////// client side frontend code
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    ///////EDIT
    const editNote = async (id, title, description, tag) => {

        //// backend side code
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        ////// frontendSide code
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 1; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    ///////
    return (
        < noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </noteContext.Provider >
    )
}
export default NoteState;