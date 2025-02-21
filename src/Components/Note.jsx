import React from "react";
import { FiTrash } from "react-icons/fi";

export default function Note(props) {
  return (
    <div className="Note note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{
         props.onDelete(props.id);
      }}><FiTrash size={24} /></button>
    </div>
  );
}
