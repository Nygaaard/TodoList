// Imports
import { TodoSchema as TodoInterface } from "../interfaces/TodoInterface";
import "../styles/Todo.css";

const Todo = ({
  todo,
  onTodoUpdate,
}: {
  todo: TodoInterface;
  onTodoUpdate: () => void;
}) => {
  // Mappa status till klassnamn
  const statusClass =
    todo.status === "Ej påbörjad"
      ? "status-not-started"
      : todo.status === "Pågående"
      ? "status-in-progress"
      : todo.status === "Avklarad"
      ? "status-completed"
      : "";

  // Funktion för att uppdatera status
  const updateTodo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    const updatedTodo = { ...todo, status: newStatus };

    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid uppdatering.");
      }

      onTodoUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  // Funktion för att radera en todo
  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid radering.");
      }

      onTodoUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="todo-card">
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p className={`todo-status ${statusClass}`}>
        <strong>{todo.status}</strong>
      </p>
      <form>
        <label htmlFor="status">Ändra status:</label>
        <select
          name="status"
          id="status"
          defaultValue={todo.status}
          onChange={updateTodo}
          className="select-options"
        >
          <option>Ej påbörjad</option>
          <option>Pågående</option>
          <option>Avklarad</option>
        </select>
      </form>
      <div className="todo-actions">
        <button className="delete-btn" onClick={deleteTodo}>
          Radera
        </button>
      </div>
    </section>
  );
};

export default Todo;
