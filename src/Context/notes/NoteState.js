import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get all Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/Fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')   
         },
    });
    const json = await response.json();
    setNotes(json);
  };


  // Add a Note
  const addNote = async (title, description, tag) => {
    // This is for add note in backend
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));     //concat returns an array whereas push updates an array
  }



  // Delete a Note
  const deleteNote = async (id) => {
    // This is for delete note in backend
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           },
      });
      const json = response.json();
      console.log(json);


    // It is a Login to delete in client side
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // This is for edit note in backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));


    // It is a Login to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  
  return (
    <NoteContext.Provider
      value={{ notes,getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
