import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 classname="card-title">{note.title} </h5>
                        <i className="fa-solid fa-trash mx-3"></i>
                        <i className="fa-solid fa-file-pen mx-2"></i>
                    </div>
                    <p classname="card-text">{note.description}</p>
                </div>
            </div>
        </div >
    )
}

export default NoteItem
