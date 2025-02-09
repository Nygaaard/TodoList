// Importer
import "./App.css";
import { useState, useEffect } from "react";
import { TodoSchema } from "./interfaces/TodoInterface";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

const App = () => {
  // States
  const [todos, setTodos] = useState<TodoSchema[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Skriv ut todos direkt vid sidladdning
  useEffect(() => {
    getData();
  }, []);

  // Funktion för att hämta todos
  const getData = async () => {
    try {
      // Aktivera laddning
      setLoading(true);
      const response = await fetch("http://localhost:3000/todos");

      if (!response.ok) {
        throw Error("Något gick fel..." + response.status);
      } else {
        const data = await response.json();
        // Set todos med data
        setTodos(data);
      }
    } catch (error) {
      setError("Något gick fel vid hämtning... " + error);
    } finally {
      // Avbryt laddning
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error">{error}</p>}
      <div className="todos">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onTodoUpdate={getData} />
        ))}
      </div>
      <TodoForm onTodoAdded={getData} />
    </div>
  );
};

export default App;
