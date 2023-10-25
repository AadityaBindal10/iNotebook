import { React, useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInital = [
        {
            "_id": "652bb7997d31145763172669d",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title",
            "description": " Please wake up1",
            "tag": "personal",
            "date": "2023-10-15T09:57:45.897Z",
            "__v": 0
        },
        {
            "_id": "652bb79e7d3323145763172669f",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title22",
            "description": " Please wake up2",
            "tag": "personal",
            "date": "2023-10-15T09:57:50.784Z",
            "__v": 0
        }, {
            "_id": "652bb79972d3145763172669d",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title",
            "description": " Please wake up1",
            "tag": "personal",
            "date": "2023-10-15T09:57:45.897Z",
            "__v": 0
        },
        {
            "_id": "652bb79e7d23145763172669f",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title22",
            "description": " Please wake up2",
            "tag": "personal",
            "date": "2023-10-15T09:57:50.784Z",
            "__v": 0
        }, {
            "_id": "652bb79497d3145763172669d",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title",
            "description": " Please wake up1",
            "tag": "personal",
            "date": "2023-10-15T09:57:45.897Z",
            "__v": 0
        },
        {
            "_id": "652bb579e7d3145763172669f",
            "user": "652ad2ea48c2fab6391cd69a",
            "title": "My Title22",
            "description": " Please wake up2",
            "tag": "personal",
            "date": "2023-10-15T09:57:50.784Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInital)
    return (
        < noteContext.Provider value={{ notes, setNotes }} >
            {props.children}
        </noteContext.Provider >
    )
}

export default NoteState;