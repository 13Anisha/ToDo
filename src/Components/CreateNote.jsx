import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function HandleChange(event) {
    const { name, value } = event.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function SubmitNote(event) {
    event.preventDefault();
    if (note.title.trim() === "" || note.content.trim() === "") {
      alert("Note title and content cannot be empty!");
      return;
    }
    props.onAdd(note);
    setNote({
      title:"",
      content:""
    })
  }
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={HandleChange}
        />
        <textarea
          name="content"
          placeholder="Note it before you forget ..."
          rows={4}
          value={note.content}
          onChange={HandleChange}
        ></textarea>
        <button onClick={SubmitNote}>
          <FiPlus size={24}/>
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
