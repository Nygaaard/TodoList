import { TodoSchema } from "../interfaces/TodoInterface";

const Todo = ({ todo }: { todo: TodoSchema }) => {
  return (
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>
        <strong>{todo.status}</strong>
      </p>
    </section>
  );
};

export default Todo;
