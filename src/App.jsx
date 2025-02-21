import "./App.css";
import Header from "./Components/Header";
import Note from "./Components/Note";
import CreateNote from "./Components/CreateNote";
import { useState } from "react";

export default function App() {
  const [noteList, setNoteList] = useState([]);

  function AddNote(newNote) {
    setNoteList((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(noteId)
  {
    console.log("delete triggered by",{noteId});
    setNoteList((prevNotes)=>{
      return prevNotes.filter((noteItem,index,)=>{
        return index!==noteId;

      });
    });

  }

  return (
    <div className="App">
      <Header />
      
      <CreateNote onAdd={AddNote} />
      {noteList.map((noteItem,index)=>{
        return <Note key ={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />

      })}
      
    </div>
  );
}
