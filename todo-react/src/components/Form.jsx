import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setName(event.target.value);
    setError("");
  }

function handleSubmit(event) {
  event.preventDefault();

  const wasAdded = props.addTask(name);

  if (wasAdded) {
    setName("");
    return;
  }

  setError("Ez a szó tiltott.");
}
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Mi a következő terved?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="Például: elolvasni egy fejezetet…"
        value={name}
        onChange={handleChange}
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="btn btn__primary btn__lg">
        + Új feladat hozzáadása
      </button>
    </form>
  );
}

export default Form;
