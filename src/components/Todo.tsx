//Importer
import { TodoSchema as TodoInterface } from "../interfaces/TodoInterface";

const Todo = ({
  todo,
  onTodoUpdate,
}: {
  todo: TodoInterface;
  onTodoUpdate: () => void;
}) => {
  //Definiera färger för respektive status
  const statusColor =
    todo.status === "Ej påbörjad"
      ? "red"
      : todo.status === "Pågående"
      ? "orange"
      : todo.status === "Avklarad"
      ? "green"
      : "";

  const updateTodo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    const newTodo = { ...todo, status: newStatus };

    try {
      const response = await fetch("http://localhost:3000/todos/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw Error;
      }

      onTodoUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p style={{ color: statusColor } /*Lägger till färg*/}>
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
    </section>
  );
};

export default Todo;
