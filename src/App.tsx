import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  //Interface Todo
  interface Todo {
    id: string;
    title: string;
    description: string;
    status: string;
  }

  //States
  const [todos, setTodos] = useState<Todo>([]);
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

      {loading && <p>Laddar...</p>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
