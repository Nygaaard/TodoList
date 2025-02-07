//Importer
import { TodoSchema as TodoInterface } from "../interfaces/TodoInterface";

const Todo = ({ todo }: { todo: TodoInterface }) => {
  //Definiera färger för respektive status
  const statusColor =
    todo.status === "Ej påbörjad"
      ? "red"
      : todo.status === "Pågående"
      ? "orange"
      : todo.status === "Avklarad"
      ? "green"
      : "";

  return (
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p style={{ color: statusColor } /*Lägger till färg*/}>
        <strong>{todo.status}</strong>
      </p>
    </section>
  );
};

export default Todo;
