import "./App.css";
import Header from "./Components/Header";
import Note from "./Components/Note";
import CreateNote from "./Components/CreateNote";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  const [noteList, setNoteList] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteList));
  }, [noteList]);

  function AddNote(newNote) {
    setNoteList((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  function deleteNote(noteId) {
    setNoteList((prevNotes) => {
      const updatedNotes = prevNotes.filter((_, index) => index !== noteId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <CreateNote onAdd={AddNote} />
              {noteList.map((noteItem, index) => (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  priority={noteItem.priority}
                  isOutdoor={noteItem.isOutdoor}
                  weather={noteItem.weather}
                  onDelete={deleteNote}
                />
              ))}
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}
