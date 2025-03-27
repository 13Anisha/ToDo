
import React from "react";
import { FiTrash } from "react-icons/fi";

export default function Note(props) {
  return (
    <div className={`Note note ${props.priority.toLowerCase()}`}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>
        <strong>Priority:</strong> {props.priority}
      </p>
      {props.isOutdoor && (
        <p>
          <strong>Weather:</strong> {props.weather || "Loading..."}
        </p>
      )}
      <button onClick={() => props.onDelete(props.id)}>
        <FiTrash size={24} />
      </button>
    </div>
  );
}
