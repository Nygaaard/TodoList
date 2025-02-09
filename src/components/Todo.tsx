import { TodoSchema as TodoInterface } from "../interfaces/TodoInterface";

const Todo = ({
  todo,
  onTodoUpdate,
}: {
  todo: TodoInterface;
  onTodoUpdate: () => void;
}) => {
  // Definiera färger för respektive status
  const statusColor =
    todo.status === "Ej påbörjad"
      ? "red"
      : todo.status === "Pågående"
      ? "orange"
      : todo.status === "Avklarad"
      ? "green"
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
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p style={{ color: statusColor }}>
        <strong>{todo.status}</strong>
      </p>
      <form>
        <label htmlFor="status">Ändra status:</label>
        <select
          name="status"
          id="status"
          defaultValue={todo.status}
          onChange={updateTodo}
        >
          <option>Ej påbörjad</option>
          <option>Pågående</option>
          <option>Avklarad</option>
        </select>
      </form>
      <button
        onClick={deleteTodo}
        style={{ backgroundColor: "red", color: "white", marginTop: "10px" }}
      >
        Radera
      </button>
    </section>
  );
};

export default Todo;
