import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import ServerAllapot from "./components/serverallapot";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
  Fontossag: (task) => !task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const initTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function App() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(initTasks);

  const listHeadingRef = useRef(null);
  const previousTaskLengthRef = useRef(tasks.length);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length < previousTaskLengthRef.current) {
      listHeadingRef.current?.focus();
    }

    previousTaskLengthRef.current = tasks.length;
  }, [tasks.length]);

  function addTask(name) {
    const tiltottLista = ["react"];
    const tisztitottNev = name.trim();

    if (tiltottLista.includes(tisztitottNev.toLowerCase())) {
      return false;
    }

    const newTask = {
      id: `todo-${nanoid()}`,
      name: tisztitottNev,
      priority: "0",
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    return true;
  }

  function editTask(id, newName, newPriority) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, name: newName, priority: newPriority }
          : task
      )
    );
  }

  function toggleTaskCompleted(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        priority={task.priority}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const headingText = `${taskList.length} feladat a listában`;




  return (
    <div className="todoapp stack-large">
      <header className="app-header">
        <p className="app-eyebrow">Egy kis rend, több nyugalom</p>
        <h1>TodoMatic<span aria-hidden="true">.</span></h1>
        <p className="app-subtitle">Apró lépésekből lesznek a nagy dolgok.</p>
      </header>
      <ServerAllapot/>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
      {taskList.length === 0 && (
        <p className="empty-state">Itt most nincs feladat. Adj hozzá egyet, vagy válassz másik szűrőt.</p>
      )}
    </div>
  );
}

export default App;
