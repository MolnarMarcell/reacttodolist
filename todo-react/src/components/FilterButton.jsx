function FilterButton(props) {
  const labels = { All: "Összes", Active: "Aktív", Completed: "Kész", Fontossag: "Fontosság" };
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <span>{labels[props.name] ?? props.name}</span>
      <span className="visually-hidden"> feladatok mutatása</span>
    </button>
  );
}

export default FilterButton;
