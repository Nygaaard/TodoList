import "./App.css";
import { useState, useEffect } from "react";
import { TodoSchema } from "./interfaces/TodoInterface";
import Todo from "./components/Todo";

const App = () => {
  //States
  const [todos, setTodos] = useState<TodoSchema[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/todos");

      if (!response.ok) {
        throw Error("Något gick fel..." + response.status);
      } else {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      setError("Något gick fel vid hämtning... " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {loading && <p>Laddar...</p>} {/*Laddning*/}
      {error && <p>{error}</p>} {/*Error-meddelanden*/}
      <div className="todos">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
