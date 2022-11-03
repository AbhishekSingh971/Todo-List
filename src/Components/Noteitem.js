import React from 'react'
import { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body bg-dark">
          <div className='d-flex align-items-center'>
            <h5 className="card-title text-warning">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2 p-2 ps-5" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success") }}></i>
            <i className="fa-regular fa-pen-to-square mx-2 p-2" onClick={() => { updateNote(note); }}></i>
          </div>
          <hr />
          <p className="card-text" style={{minHeight:"50px"}}>{note.description}</p>
          <hr/>
          <p className="card-text bg-dark text-muted">
            {note.tag}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem