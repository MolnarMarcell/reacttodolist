import { useEffect, useRef, useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const previousIsEditingRef = useRef(isEditing);

  function startEditing() {
    setNewName(props.name);
    setNewPriority(props.priority ?? "");
    setEditing(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName, newPriority);
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={`name-${props.id}`}>
          Feladat neve: {props.name}
        </label>
        <input
          id={`name-${props.id}`}
          className="todo-text"
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          ref={editFieldRef}
        />

        <label htmlFor={`priority-${props.id}`}>Fontosság:</label>
        <input
          id={`priority-${props.id}`}
          className="inputocska2"
          type="text"
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
          placeholder="Fontosság..."
        />
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Mégse
          <span className="visually-hidden"> – {props.name} szerkesztése</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Mentés
          <span className="visually-hidden"> – {props.name} új neve</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>

        <label htmlFor={`view-priority-${props.id}`}>Fontosság:</label>
        <input
          id={`view-priority-${props.id}`}
          type="text"
          className="inputocska"
          disabled
          value={props.priority ?? ""}
          placeholder="Fontosság..."
        />
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={startEditing}
          ref={editButtonRef}
        >
          Szerkesztés <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Törlés <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const wasEditing = previousIsEditingRef.current;

    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }

    previousIsEditingRef.current = isEditing;
  }, [isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
